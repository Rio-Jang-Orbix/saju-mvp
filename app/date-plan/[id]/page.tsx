'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import PaywallModal from '@/components/date-plan/PaywallModal'
import DatePlanCard from '@/components/date-plan/DatePlanCard'
import { DatePlan } from '@/types'
import { Target, Sparkles, Coffee, Palette, Camera, RefreshCw, CheckCircle } from 'lucide-react'

// Mock data for Phase 1
const mockDatePlans: DatePlan[] = [
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

interface DatePlanPageProps {
  params: Promise<{ id: string }>
}

export default function DatePlanPage({ params }: DatePlanPageProps) {
  const [showPaywall, setShowPaywall] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [planId, setPlanId] = useState('')
  const router = useRouter()

  useEffect(() => {
    params.then(({ id }) => {
      setPlanId(id)
    })
  }, [params])

  const handlePaywallSuccess = () => {
    setShowPaywall(false)
    setHasAccess(true)
  }

  if (showPaywall && !hasAccess) {
    return (
      <div className="min-h-screen luxury-bg relative overflow-hidden">
        {/* Elegant Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-1000 elegant-float">🍃</div>
        <div className="absolute top-60 right-20 text-3xl opacity-1000 elegant-float" style={{animationDelay: '2s'}}>🌸</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-100 elegant-float" style={{animationDelay: '4s'}}>✨</div>

        <div className="relative z-10 min-h-screen p-6">
          <div className="max-w-5xl mx-auto">
            {/* Blurred Preview */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 mb-8 shadow-lg border border-luxury-gold">
                <Target className="text-luxury-gold" size={24} />
                <span className="text-luxury-charcoal font-semibold luxury-subtitle">특별한 만남 제안 준비 완료</span>
              </div>
              <h1 className="text-6xl luxury-title text-luxury-charcoal mb-8 leading-tight">
                <span className="luxury-pulse inline-block">🎯</span>
                <span className="text-gradient-luxury"> 특별한 만남 제안</span>
              </h1>
              <p className="text-xl text-luxury-bronze luxury-subtitle leading-relaxed max-w-3xl mx-auto">
                대화의 맥락과 <span className="text-gradient-luxury font-semibold">완벽하게 어울리는</span><br />
                3가지 품격있는 만남의 장소를 준비해 드렸습니다
              </p>
            </div>

            {/* Blurred Cards */}
            <div className="grid gap-8 lg:grid-cols-3 mb-12">
              {[
                { icon: Coffee, title: "카페 데이트", gradient: "bg-mint-gradient" },
                { icon: Palette, title: "문화 데이트", gradient: "bg-sunset-gradient" },
                { icon: Camera, title: "야경 데이트", gradient: "bg-ocean-gradient" }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="bg-white  p-10 rounded-2xl luxury-shadow border border-luxury-gold   relative"
                  >
                    <div className={`w-20 h-20 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-8 luxury-shadow`}>
                      <IconComponent className="text-white" size={36} />
                    </div>
                    <div className="space-y-6">
                      <div className="h-10 bg-gray-300 rounded-xl"></div>
                      <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded-lg"></div>
                        <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
                        <div className="h-5 bg-gray-200 rounded-lg w-1/2"></div>
                      </div>
                      <div className="h-14 bg-gray-300 rounded-xl"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white  rounded-full p-6 luxury-shadow">
                        <Sparkles className="text-luxury-gold" size={36} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Preview Info */}
            <div className="bg-white rounded-3xl p-12 mb-16 border border-luxury-gold">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow">
                  <CheckCircle className="text-white" size={36} />
                </div>
                <h2 className="text-3xl luxury-title text-luxury-charcoal mb-4">
                  🎁 준비된 특별한 제안
                </h2>
                <p className="text-luxury-bronze luxury-subtitle text-lg">대화 분석 결과를 바탕으로 맞춤 제작된 특별한 만남 제안</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 text-center border border-luxury-gold">
                  <div className="text-4xl mb-4">☕</div>
                  <div className="text-luxury-charcoal luxury-title font-semibold mb-3">카페 데이트</div>
                  <div className="text-luxury-bronze luxury-subtitle">따뜻한 분위기에서의 우아한 대화</div>
                </div>
                <div className="bg-white p-8 text-center border border-luxury-gold">
                  <div className="text-4xl mb-4">🌆</div>
                  <div className="text-luxury-charcoal luxury-title font-semibold mb-3">야경 데이트</div>
                  <div className="text-luxury-bronze luxury-subtitle">로맨틱한 야경과 함께하는 특별한 순간</div>
                </div>
                <div className="bg-white p-8 text-center border border-luxury-gold">
                  <div className="text-4xl mb-4">🎨</div>
                  <div className="text-luxury-charcoal luxury-title font-semibold mb-3">문화 데이트</div>
                  <div className="text-luxury-bronze luxury-subtitle">특별한 경험을 통한 소중한 추억 만들기</div>
                </div>
              </div>
            </div>
          </div>

        <PaywallModal datePlanId={planId} onSuccess={handlePaywallSuccess} />
        <Toaster position="top-center" />
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen luxury-bg relative overflow-hidden page-enter">
      {/* Elegant Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-1000 elegant-float">🍃</div>
      <div className="absolute top-60 right-20 text-3xl opacity-1000 elegant-float" style={{animationDelay: '2s'}}>🌸</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-100 elegant-float" style={{animationDelay: '4s'}}>✨</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-1000 elegant-float" style={{animationDelay: '6s'}}>🌿</div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 mb-8 shadow-lg border border-luxury-gold">
              <CheckCircle className="text-luxury-accent" size={24} />
              <span className="text-luxury-charcoal font-semibold luxury-subtitle">만남 제안 완성</span>
            </div>
            <h1 className="text-6xl luxury-title text-luxury-charcoal mb-8 leading-tight">
              <span className="luxury-pulse inline-block">🎯</span>
              <span className="text-gradient-luxury"> 당신만의 특별한 만남</span>
            </h1>
            <p className="text-xl text-luxury-bronze luxury-subtitle leading-relaxed max-w-3xl mx-auto">
              연애 전문가들이 대화를 <span className="text-gradient-luxury font-semibold">세심하게 분석</span>하여<br />
              품격있는 만남의 장소를 완성해 드렸습니다
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-12 text-center border border-luxury-gold enhanced-hover shadow-xl">
            <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow morphing-glow">
              <Sparkles className="text-white luxury-pulse" size={36} />
            </div>
            <h2 className="text-3xl md:text-4xl luxury-title text-luxury-charcoal mb-6 leading-tight">
              🎉 특별한 만남 제안 완성!
            </h2>
            <p className="text-luxury-bronze luxury-subtitle text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              아래 3가지 장소 중 <span className="text-gradient-luxury font-semibold">마음에 드는 곳</span>을 선택해서<br />
              품격있는 만남을 시작해보세요
            </p>
          </div>

          {/* Plan Analysis Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 text-center enhanced-hover border border-luxury-gold rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-luxury-accent" size={28} />
              </div>
              <h3 className="luxury-title text-luxury-charcoal font-semibold mb-2">맞춤 분석</h3>
              <p className="text-luxury-bronze luxury-subtitle text-sm">대화 맥락 완벽 반영</p>
            </div>
            <div className="bg-white p-6 text-center enhanced-hover border border-luxury-gold rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-luxury-gold" size={28} />
              </div>
              <h3 className="luxury-title text-luxury-charcoal font-semibold mb-2">전문가 검증</h3>
              <p className="text-luxury-bronze luxury-subtitle text-sm">연애 심리학 기반 추천</p>
            </div>
            <div className="bg-white p-6 text-center enhanced-hover border border-luxury-gold rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-luxury-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-luxury-bronze" size={28} />
              </div>
              <h3 className="luxury-title text-luxury-charcoal font-semibold mb-2">성공 확률</h3>
              <p className="text-luxury-bronze luxury-subtitle text-sm">95.8% 만족도</p>
            </div>
          </div>

        {/* Date Plan Cards */}
        <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-3 mb-8">
          {mockDatePlans.map((plan, index) => (
            <div key={plan.id} className="fade-in-up staggered-animation">
              <DatePlanCard plan={plan} />
            </div>
          ))}
        </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              onClick={() => router.push('/analyze')}
              className="luxury-button-outline py-4 px-10 text-lg rounded-full group"
            >
              <RefreshCw className="mr-3 group-hover:rotate-180 transition-transform duration-500" size={24} />
              새로운 대화 분석하기
            </Button>
          </div>
        </div>

        <Toaster position="top-center" />
      </div>
    </div>
  )
}