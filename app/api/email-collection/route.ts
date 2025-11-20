import { NextRequest, NextResponse } from 'next/server'
import { handleEmailCollection } from '@/lib/utils/ab-test'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, datePlanId, userId } = body

    if (!email || !datePlanId) {
      return NextResponse.json(
        { error: 'Email and date plan ID are required' },
        { status: 400 }
      )
    }

    const result = await handleEmailCollection(email, datePlanId, userId)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      })
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Email collection API error:', error)
    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}