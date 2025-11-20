import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { datePlanId } = body

    if (!datePlanId) {
      return NextResponse.json(
        { error: 'Date plan ID is required' },
        { status: 400 }
      )
    }

    // MVP Phase: Mock payment session for testing
    console.log('Mock payment session created for:', {
      datePlanId,
      amount: 2900,
      currency: 'KRW',
      timestamp: new Date().toISOString()
    })

    // Create success URL (simulate successful payment)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/date-plan/${datePlanId}?payment=success`

    // Mock session data
    const mockSession = {
      id: `mock_session_${Date.now()}`,
      url: successUrl // Direct to success for MVP
    }

    // Store mock payment in localStorage (for development)
    if (typeof window !== 'undefined') {
      const paymentData = JSON.parse(localStorage.getItem('mock_payments') || '[]')
      paymentData.push({
        sessionId: mockSession.id,
        datePlanId,
        amount: 2900,
        status: 'completed',
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('mock_payments', JSON.stringify(paymentData))
    }

    return NextResponse.json({
      sessionId: mockSession.id,
      url: mockSession.url,
      mock: true,
      message: 'MVP 모드: 테스트용 결제 세션이 생성되었습니다'
    })

  } catch (error) {
    console.error('Mock payment session creation error:', error)
    return NextResponse.json(
      { error: '결제 세션 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}