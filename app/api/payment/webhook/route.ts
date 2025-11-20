import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/db/supabase'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('No Stripe signature found')
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    let event: any

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_CONFIG.webhookSecret
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    console.log('Stripe webhook event:', event.type)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        await handleSuccessfulPayment(session)
        break

      case 'checkout.session.expired':
        const expiredSession = event.data.object
        await handleExpiredPayment(expiredSession)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: any) {
  try {
    const datePlanId = session.metadata?.datePlanId

    if (!datePlanId) {
      console.error('No datePlanId in session metadata')
      return
    }

    console.log('Processing successful payment for date plan:', datePlanId)

    // Update date plan as paid
    const { error: updateError } = await supabaseAdmin
      .from('date_plans')
      .update({
        is_paid: true,
        payment_id: session.id
      })
      .eq('id', datePlanId)

    if (updateError) {
      console.error('Failed to update date plan payment status:', updateError)
      return
    }

    // Get date plan for analytics
    const { data: datePlan } = await supabaseAdmin
      .from('date_plans')
      .select('user_id, analysis_id')
      .eq('id', datePlanId)
      .single()

    // Track successful payment
    await supabaseAdmin
      .from('events')
      .insert({
        user_id: datePlan?.user_id || null,
        event_name: 'payment_success',
        properties: {
          date_plan_id: datePlanId,
          payment_method: 'stripe',
          amount: session.amount_total,
          session_id: session.id,
          analysis_id: datePlan?.analysis_id
        }
      })

    console.log('Successfully processed payment for date plan:', datePlanId)

  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}

async function handleExpiredPayment(session: any) {
  try {
    const datePlanId = session.metadata?.datePlanId

    if (!datePlanId) {
      return
    }

    console.log('Processing expired payment for date plan:', datePlanId)

    // Get date plan for analytics
    const { data: datePlan } = await supabaseAdmin
      .from('date_plans')
      .select('user_id')
      .eq('id', datePlanId)
      .single()

    // Track expired payment
    await supabaseAdmin
      .from('events')
      .insert({
        user_id: datePlan?.user_id || null,
        event_name: 'payment_expired',
        properties: {
          date_plan_id: datePlanId,
          session_id: session.id
        }
      })

  } catch (error) {
    console.error('Error handling expired payment:', error)
  }
}