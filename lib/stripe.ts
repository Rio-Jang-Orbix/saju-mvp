import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
})

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  dateplanPrice: 2900, // 2,900 KRW in cents
  currency: 'krw',
}

export async function createPaymentSession(datePlanId: string, successUrl: string, cancelUrl: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: '💕 Luvo 데이트 플랜',
            description: 'AI가 분석한 맞춤 데이트 코스 3개',
            images: [],
          },
          unit_amount: STRIPE_CONFIG.dateplanPrice,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      datePlanId,
      product: 'date_plan',
    },
    locale: 'ko',
  })

  return session
}