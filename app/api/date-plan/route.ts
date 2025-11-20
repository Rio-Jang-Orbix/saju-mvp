import { NextRequest, NextResponse } from 'next/server'

// Mock Database for date plans
class MockDatePlanDatabase {
  private static plans: Map<string, any> = new Map()

  static async createPlan(analysisId: string) {
    const planId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const mockPlans = [
      {
        id: 'plan-1',
        title: '한강 카페 데이트',
        time: '토요일 오후 3시',
        places: [
          {
            name: '성수동 카페 온더코너',
            address: '서울 성동구 성수동',
            why: '인스타 감성 + 루프탑 뷰가 예쁜 곳'
          },
          {
            name: '한강공원 뚝섬지구',
            address: '서울 성동구 성수동',
            why: '산책하며 대화하기 좋고 야경이 예쁨'
          }
        ],
        estimatedCost: '30,000원',
        inviteMessage: '이번 주 토요일 한강 쪽 카페 어때요? 날씨도 좋을 것 같은데 ☕️✨',
        tips: ['예약 권장', '선셋 타임 맞춰가면 더 좋아요']
      },
      {
        id: 'plan-2',
        title: '홍대 문화 데이트',
        time: '일요일 오후 2시',
        places: [
          {
            name: '홍익대학교 주변',
            address: '서울 마포구 홍대',
            why: '젊은 분위기와 다양한 볼거리'
          },
          {
            name: '상상마당',
            address: '서울 마포구 홍대',
            why: '전시 관람 후 대화할 거리가 많아짐'
          }
        ],
        estimatedCost: '25,000원',
        inviteMessage: '홍대에 재미있는 전시 있던데, 같이 보러 갈래요? 🎨',
        tips: ['전시 일정 미리 확인', '주말이라 사람이 많을 수 있어요']
      },
      {
        id: 'plan-3',
        title: '이태원 이색 데이트',
        time: '토요일 오후 6시',
        places: [
          {
            name: '이태원 앤티크 거리',
            address: '서울 용산구 이태원동',
            why: '특별한 분위기와 포토존이 많음'
          },
          {
            name: '이태원 루프탑 바',
            address: '서울 용산구 이태원동',
            why: '야경과 함께 로맨틱한 분위기'
          }
        ],
        estimatedCost: '50,000원',
        inviteMessage: '이태원에 예쁜 곳 발견했는데, 같이 가볼까요? 🌃',
        tips: ['저녁 시간대라 예약 필수', '드레스 코드 확인']
      }
    ]

    const datePlan = {
      id: planId,
      analysisId,
      plans: mockPlans,
      isPaid: false,
      created_at: new Date().toISOString()
    }

    this.plans.set(planId, datePlan)
    return { data: datePlan, error: null }
  }

  static async getPlan(planId: string) {
    const plan = this.plans.get(planId)
    if (plan) {
      return { data: plan, error: null }
    }
    return { data: null, error: 'Plan not found' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { analysisId } = body

    console.log('Date plan generation requested for analysis:', analysisId)

    // Validation
    if (!analysisId) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      )
    }

    // Create mock date plan
    console.log('Creating date plan using mock database')

    const { data: datePlan, error: createError } = await MockDatePlanDatabase.createPlan(analysisId)

    if (createError || !datePlan) {
      console.error('Failed to create date plan:', createError)
      return NextResponse.json(
        { error: 'Failed to create date plan' },
        { status: 500 }
      )
    }

    console.log('Date plan created successfully:', datePlan.id)

    // Return success response with planId
    return NextResponse.json({
      planId: datePlan.id,
      message: 'Date plan created successfully'
    })

  } catch (error) {
    console.error('Date plan generation error:', error)

    return NextResponse.json(
      { error: '데이트 플랜 생성 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const planId = searchParams.get('planId')

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // Get date plan from mock database
    const { data: datePlan, error: planError } = await MockDatePlanDatabase.getPlan(planId)

    if (planError || !datePlan) {
      return NextResponse.json(
        { error: 'Date plan not found' },
        { status: 404 }
      )
    }

    // Return the date plan
    return NextResponse.json({
      planId: datePlan.id,
      plans: datePlan.plans,
      requiresPayment: false
    })

  } catch (error) {
    console.error('Date plan fetch error:', error)
    return NextResponse.json(
      { error: '데이트 플랜을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}