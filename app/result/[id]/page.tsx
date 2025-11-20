'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import AnalysisResult from '@/components/analyze/AnalysisResult'
import ReplyCards from '@/components/analyze/ReplyCards'
import { AnalysisResult as AnalysisResultType, Reply } from '@/types'
import { CheckCircle, AlertCircle, Target, ArrowRight, RefreshCw, Brain } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ResultPageProps {
  params: Promise<{ id: string }>
}

export default function ResultPage({ params }: ResultPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysisId, setAnalysisId] = useState<string>('')

  useEffect(() => {
    params.then(({ id }) => {
      setAnalysisId(id)

      const hasError = searchParams.get('error') === 'true'
      if (hasError) {
        setError('분석 중 오류가 발생했습니다. 테스트용 데이터를 표시합니다.')
        setAnalysisData(getMockData(id))
        setLoading(false)
        return
      }

      const storedData = localStorage.getItem('current_analysis')
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          if (parsed.analysisId === id) {
            setAnalysisData(parsed)
            setLoading(false)
            return
          }
        } catch {
          // Fall through to API call
        }
      }

      setError('실제 API 연동을 위해서는 환경 변수 설정이 필요합니다. 테스트용 데이터를 표시합니다.')
      setAnalysisData(getMockData(id))
      setLoading(false)
    })
  }, [params, searchParams])

  const handleDatePlanClick = async () => {
    try {
      console.log('Date plan button clicked, analysisId:', analysisId)

      if (!analysisId) {
        console.error('No analysis ID available')
        router.push('/date-plan/mock-id')
        return
      }

      const response = await fetch('/api/date-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisId,
          preferences: {}
        })
      })

      console.log('Date plan API response status:', response.status)

      const data = await response.json()
      console.log('Date plan API response data:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate date plan')
      }

      if (data.planId) {
        console.log('Navigating to date plan:', data.planId)
        router.push(`/date-plan/${data.planId}`)
      } else {
        console.error('No planId in response')
        router.push('/date-plan/mock-id')
      }

    } catch (error) {
      console.error('Date plan generation error:', error)
      // Fallback to mock date plan
      router.push('/date-plan/mock-id')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen luxury-bg relative overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl opacity-1000 elegant-float">🍃</div>
        <div className="absolute top-60 right-20 text-3xl opacity-1000 elegant-float" style={{animationDelay: '2s'}}>✨</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-100 elegant-float" style={{animationDelay: '4s'}}>🌸</div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-white border border-luxury-gold shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow">
              <Brain className="text-luxury-gold luxury-pulse" size={40} />
            </div>
            <h1 className="text-3xl luxury-title text-luxury-charcoal mb-4">
              세심한 분석 진행 중...
            </h1>
            <p className="text-lg text-luxury-bronze luxury-subtitle mb-8">
              대화 속 미묘한 감정과 의도를 분석하고 있습니다
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-luxury-gold rounded-full luxury-pulse" style={{animationDelay: '0ms'}}></div>
              <div className="w-3 h-3 bg-luxury-bronze rounded-full luxury-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-luxury-accent rounded-full luxury-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function getMockData(id: string) {
    return {
      analysisId: id,
      emotion: {
        type: 'positive',
        confidence: 0.85,
        description: '호감 + 약간의 기대감'
      },
      intention: {
        type: 'showing_interest',
        indicators: ['긍정적 반응', '이모티콘 사용', '자발적 정보 공유']
      },
      riskSignals: [],
      suggestions: [
        '후속 질문으로 관심사 탐색하기',
        '가벼운 농담으로 분위기 띄우기'
      ],
      replies: [
        {
          id: 'reply-1',
          analysisId: id,
          tone: 'gentle',
          message: '날씨 좋을 때 산책하면 기분도 좋아지죠 😊 혹시 자주 가는 산책로 있으세요?',
          reasoning: '상대방의 긍정적 반응을 이어가며 자연스럽게 관심사를 물어보는 방식'
        },
        {
          id: 'reply-2',
          analysisId: id,
          tone: 'neutral',
          message: '오 산책 좋아하시나봐요! 저도 요즘 운동 삼아 걷고 있어요.',
          reasoning: '공감하면서 자신의 상황도 공유해 대화 균형 유지'
        },
        {
          id: 'reply-3',
          analysisId: id,
          tone: 'playful',
          message: 'ㅋㅋㅋ 우리 운명인가봐요? 저도 지금 밖인데 😆 혹시 같은 동네 아닐까요?',
          reasoning: '유쾌한 톤으로 우연의 일치를 재미있게 표현, 약간의 플러팅'
        }
      ]
    }
  }

  return (
    <div className="min-h-screen luxury-bg relative overflow-hidden page-enter">
      {/* Elegant Background Elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-1000 elegant-float">🍃</div>
      <div className="absolute top-60 right-20 text-3xl opacity-1000 elegant-float" style={{animationDelay: '2s'}}>✨</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-100 elegant-float" style={{animationDelay: '4s'}}>🌸</div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white border border-luxury-gold shadow-lg rounded-full px-6 py-3 mb-6">
              <CheckCircle className="text-luxury-accent" size={20} />
              <span className="text-luxury-charcoal font-semibold luxury-subtitle">분석 완료</span>
            </div>
            <h1 className="text-4xl md:text-5xl luxury-title text-luxury-charcoal mb-6 leading-tight">
              <span className="luxury-pulse inline-block">✨</span>
              <span className="text-gradient-luxury"> 우아한 답장</span>
            </h1>
            <p className="text-lg text-luxury-bronze luxury-subtitle leading-relaxed max-w-2xl mx-auto">
              연애 전문가들이 대화를 <span className="text-gradient-luxury font-semibold">세심하게 분석</span>하여
              가장 매력적인 대화의 길을 제시해드립니다
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <Card className="mb-8 bg-white border border-luxury-gold shadow-lg border-orange-400/30">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center luxury-shadow">
                  <AlertCircle className="text-orange-600" size={20} />
                </div>
                <p className="text-luxury-charcoal luxury-subtitle text-sm flex-1">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Analysis Summary Card */}
          <div className="mb-8">
            <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-luxury-accent/20 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">😊</span>
                    </div>
                    <h3 className="luxury-title text-luxury-charcoal font-semibold">감정 분석</h3>
                    <p className="text-luxury-bronze luxury-subtitle text-sm">
                      {analysisData.emotion?.description || '긍정적 반응'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto">
                      <Target className="text-luxury-gold" size={28} />
                    </div>
                    <h3 className="luxury-title text-luxury-charcoal font-semibold">의도 파악</h3>
                    <p className="text-luxury-bronze luxury-subtitle text-sm">
                      {analysisData.intention?.type === 'showing_interest' ? '관심 표현' : '분석 완료'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-luxury-bronze/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="text-luxury-bronze" size={28} />
                    </div>
                    <h3 className="luxury-title text-luxury-charcoal font-semibold">성공률</h3>
                    <p className="text-luxury-bronze luxury-subtitle text-sm">98.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Analysis Section */}
            <div className="space-y-6">
              <AnalysisResult analysis={{
                id: analysisData.analysisId,
                userId: '',
                conversationText: '',
                emotion: analysisData.emotion,
                intention: analysisData.intention,
                riskSignals: analysisData.riskSignals,
                suggestions: analysisData.suggestions
              }} />

              {/* Expert Tips Section */}
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/20 luxury-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-luxury-accent rounded-full flex items-center justify-center">
                      <Brain className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg luxury-title text-luxury-charcoal">전문가 팁</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-luxury-bronze luxury-subtitle">
                        상대방의 긍정적인 반응을 이어가며 자연스럽게 대화를 발전시켜보세요
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-luxury-bronze rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-luxury-bronze luxury-subtitle">
                        이모티콘과 가벼운 유머로 편안한 분위기를 유지하는 것이 중요합니다
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reply Suggestions */}
            <div className="space-y-6">
              <ReplyCards replies={analysisData.replies} />

              {/* Conversation Flow Prediction */}
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/20 luxury-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-luxury-bronze rounded-full flex items-center justify-center">
                      <ArrowRight className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg luxury-title text-luxury-charcoal">대화 흐름 예측</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-luxury-cream rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-luxury-charcoal">높은 호감도 (85%)</span>
                      </div>
                      <p className="text-sm text-luxury-bronze luxury-subtitle">
                        현재 대화 분위기가 매우 좋습니다. 다음 답장에서 관심사를 물어보면 자연스러운 발전이 가능할 것 같습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Special Date Proposal Section - Enhanced Design */}
          <div className="relative py-16">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white border border-luxury-gold shadow-lg rounded-full px-8 py-4 mb-8">
                <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center luxury-shadow">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span className="text-luxury-charcoal font-semibold luxury-subtitle">개인 맞춤 만남 제안 준비 완료</span>
              </div>
              <h2 className="text-4xl md:text-5xl luxury-title text-luxury-charcoal mb-6 leading-tight">
                <span className="luxury-pulse inline-block">🎯</span>
                <span className="text-gradient-luxury"> 특별한 만남 제안</span>
              </h2>
              <p className="text-xl text-luxury-bronze luxury-subtitle leading-relaxed max-w-3xl mx-auto">
                대화 분석 결과를 바탕으로 <span className="text-gradient-luxury font-semibold">완벽하게 맞춤 제작된</span><br />
                품격있고 성공 확률 높은 세 가지 특별한 만남을 준비했습니다
              </p>
            </div>

            {/* Detailed Date Options */}
            <div className="date-scene-container grid lg:grid-cols-3 gap-8 mb-12">
              {/* Option 1: Cafe Date */}
              <Card className="date-plan-entrance date-card-hover bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow overflow-hidden group">
                <div className="floating-elements">
                  <div className="element-1 text-2xl opacity-1000">☕</div>
                  <div className="element-2 text-xl opacity-100">✨</div>
                  <div className="element-3 text-lg opacity-8">🌿</div>
                </div>
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white border border-luxury-gold shadow-lg rounded-full px-3 py-1 shimmer-effect">
                      <span className="text-xs text-luxury-charcoal luxury-subtitle font-semibold success-rate-counter">추천도 97%</span>
                    </div>
                  </div>
                  <div className="date-card-gradient bg-gradient-to-br from-orange-400 to-amber-500 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-4xl opacity-20 preview-zoom">☕</div>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-1000 preview-zoom">✨</div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 morphing-glow">
                      <span className="text-3xl luxury-pulse">☕</span>
                    </div>
                    <h3 className="text-2xl luxury-title font-bold text-center mb-2">한강뷰 프리미엄 카페</h3>
                    <p className="text-center opacity-90 luxury-subtitle">따뜻한 대화가 자연스럽게 이어지는 공간</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">성수동 온더코너 - 루프탑 한강뷰</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-bronze rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">편안한 분위기로 긴장 완화</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-accent rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">예상 소요시간: 2-3시간</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white border border-luxury-gold shadow-lg rounded-xl border border-luxury-gold/10">
                    <p className="text-luxury-charcoal luxury-subtitle text-sm italic leading-relaxed">
                      "한강 쪽 카페 어때요? 날씨도 좋을 것 같은데 ☕️✨"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Option 2: Cultural Date */}
              <Card className="date-plan-entrance date-card-hover bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow overflow-hidden group">
                <div className="floating-elements">
                  <div className="element-1 text-2xl opacity-1000">🎨</div>
                  <div className="element-2 text-xl opacity-100">🌸</div>
                  <div className="element-3 text-lg opacity-8">🎭</div>
                </div>
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white border border-luxury-gold shadow-lg rounded-full px-3 py-1 shimmer-effect">
                      <span className="text-xs text-luxury-charcoal luxury-subtitle font-semibold success-rate-counter">추천도 94%</span>
                    </div>
                  </div>
                  <div className="date-card-gradient bg-gradient-to-br from-purple-400 to-indigo-500 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-4xl opacity-20 preview-zoom">🎨</div>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-1000 preview-zoom">🌸</div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 morphing-glow">
                      <span className="text-3xl luxury-pulse">🎨</span>
                    </div>
                    <h3 className="text-2xl luxury-title font-bold text-center mb-2">홍대 문화 탐방</h3>
                    <p className="text-center opacity-90 luxury-subtitle">특별한 경험을 통한 깊이 있는 대화</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">상상마당 전시 + 홍대 거리</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-bronze rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">공통 관심사 발견 기회</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-accent rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">예상 소요시간: 3-4시간</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white border border-luxury-gold shadow-lg rounded-xl border border-luxury-gold/10">
                    <p className="text-luxury-charcoal luxury-subtitle text-sm italic leading-relaxed">
                      "홍대에 재미있는 전시 있던데, 같이 보러 갈래요? 🎨"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Option 3: Evening Date */}
              <Card className="date-plan-entrance date-card-hover bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow overflow-hidden group">
                <div className="floating-elements">
                  <div className="element-1 text-2xl opacity-1000">🌙</div>
                  <div className="element-2 text-xl opacity-100">⭐</div>
                  <div className="element-3 text-lg opacity-8">🌃</div>
                </div>
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white border border-luxury-gold shadow-lg rounded-full px-3 py-1 shimmer-effect">
                      <span className="text-xs text-luxury-charcoal luxury-subtitle font-semibold success-rate-counter">추천도 96%</span>
                    </div>
                  </div>
                  <div className="date-card-gradient bg-gradient-to-br from-slate-600 to-slate-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-4xl opacity-20 preview-zoom">🌙</div>
                    <div className="absolute bottom-4 right-4 text-3xl opacity-1000 preview-zoom">⭐</div>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 morphing-glow">
                      <span className="text-3xl luxury-pulse">🌙</span>
                    </div>
                    <h3 className="text-2xl luxury-title font-bold text-center mb-2">이태원 야경 데이트</h3>
                    <p className="text-center opacity-90 luxury-subtitle">로맨틱한 분위기의 특별한 저녁</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">이태원 루프탑 바 + 앤티크 거리</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-bronze rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">로맨틱한 분위기 연출</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-luxury-accent rounded-full"></div>
                      <span className="text-luxury-bronze luxury-subtitle text-sm">예상 소요시간: 3-4시간</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white border border-luxury-gold shadow-lg rounded-xl border border-luxury-gold/10">
                    <p className="text-luxury-charcoal luxury-subtitle text-sm italic leading-relaxed">
                      "이태원에 예쁜 곳 발견했는데, 같이 가볼까요? 🌃"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Rate Analysis */}
            <div className="mb-12">
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow morphing-glow">
                      <CheckCircle className="text-white luxury-pulse" size={32} />
                    </div>
                    <h3 className="text-2xl luxury-title text-luxury-charcoal mb-4">전문가 검증 완료</h3>
                    <p className="text-luxury-bronze luxury-subtitle text-lg">연애 심리학 기반으로 분석된 최적의 만남 제안</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <div className="text-2xl font-bold text-luxury-charcoal luxury-title mb-1">95.8%</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">전체 성공률</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-luxury-gold rounded-full mx-auto mb-2"></div>
                      <div className="text-2xl font-bold text-luxury-charcoal luxury-title mb-1">98.2%</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">대화 맥락 일치도</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-luxury-bronze rounded-full mx-auto mb-2"></div>
                      <div className="text-2xl font-bold text-luxury-charcoal luxury-title mb-1">92.4%</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">후속 만남 성사율</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main CTA Button */}
            <div className="text-center">
              <Card className="relative bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover overflow-hidden max-w-2xl mx-auto">
                <div className="absolute top-6 right-6 text-4xl opacity-8 elegant-float">✨</div>
                <div className="absolute bottom-6 left-6 text-3xl opacity-100 elegant-float" style={{animationDelay: '2s'}}>💝</div>

                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl luxury-title text-luxury-charcoal mb-6 leading-tight">
                    🎁 <span className="text-gradient-luxury">완성된 만남 제안</span>
                  </h3>
                  <p className="text-luxury-bronze luxury-subtitle text-lg mb-8 leading-relaxed">
                    위 세 가지 옵션 중 <span className="text-gradient-luxury font-semibold">가장 마음에 드는 방식</span>으로<br />
                    품격있는 만남을 시작해보세요
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Button clicked!')
                      handleDatePlanClick()
                    }}
                    onMouseDown={() => console.log('Button mouse down')}
                    className="smart-button ripple-effect w-full max-w-lg mx-auto py-5 px-10 text-xl rounded-full bg-gradient-to-r from-luxury-gold via-luxury-bronze to-luxury-accent text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
                    style={{
                      background: 'linear-gradient(45deg, #d4af37, #cd7f32, #8b6914)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite',
                      zIndex: 10000,
                      position: 'relative',
                      pointerEvents: 'auto'
                    }}
                  >
                    <div className="flex items-center justify-center gap-4 relative z-10">
                      <Target className="group-hover:rotate-180 transition-transform duration-500" size={26} />
                      <span className="luxury-pulse">특별한 만남 제안 받기</span>
                      <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={26} />
                    </div>
                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
                  </button>

                  <p className="text-luxury-bronze luxury-subtitle text-sm mt-4 opacity-75">
                    상세한 장소 정보와 대화 팁까지 모두 준비되어 있습니다
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Premium Matching Upsell Section */}
          <div className="relative py-16">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white border border-luxury-gold shadow-lg rounded-full px-8 py-4 mb-8">
                <div className="w-6 h-6 bg-luxury-accent rounded-full flex items-center justify-center luxury-shadow">
                  <span className="text-xs text-white font-bold">💝</span>
                </div>
                <span className="text-luxury-charcoal font-semibold luxury-subtitle">진정한 인연 찾기</span>
              </div>
              <h2 className="text-4xl md:text-5xl luxury-title text-luxury-charcoal mb-6 leading-tight">
                <span className="luxury-pulse inline-block">💕</span>
                <span className="text-gradient-luxury"> 프리미엄 매칭 서비스</span>
              </h2>
              <p className="text-xl text-luxury-bronze luxury-subtitle leading-relaxed max-w-3xl mx-auto">
                성향 분석 결과를 바탕으로 <span className="text-gradient-luxury font-semibold">진짜 당신과 어울리는 사람</span>을 직접 소개해드립니다
              </p>
            </div>

            {/* Premium Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Feature 1 */}
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-luxury-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 morphing-glow">
                    <span className="text-4xl luxury-pulse">🎯</span>
                  </div>
                  <h3 className="text-xl luxury-title text-luxury-charcoal mb-4">정밀한 매칭</h3>
                  <p className="text-luxury-bronze luxury-subtitle text-sm leading-relaxed">
                    AI 성향 분석 결과로 97% 정확도의 맞춤 매칭을 제공합니다. 단순한 외모나 조건이 아닌 진짜 성향 기반 매칭.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 morphing-glow">
                    <span className="text-4xl luxury-pulse">👥</span>
                  </div>
                  <h3 className="text-xl luxury-title text-luxury-charcoal mb-4">검증된 회원</h3>
                  <p className="text-luxury-bronze luxury-subtitle text-sm leading-relaxed">
                    신원이 확인된 진지한 만남을 원하는 분들만이 가입. 30-40대 전문직 중심의 프리미엄 회원들과 만나보세요.
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover group">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-luxury-bronze/20 rounded-full flex items-center justify-center mx-auto mb-6 morphing-glow">
                    <span className="text-4xl luxury-pulse">💎</span>
                  </div>
                  <h3 className="text-xl luxury-title text-luxury-charcoal mb-4">전문가 관리</h3>
                  <p className="text-luxury-bronze luxury-subtitle text-sm leading-relaxed">
                    연애 상담사가 직접 매칭부터 첫 만남까지 전 과정을 케어. 성공률 94%의 체계적인 관리 서비스.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Success Stories */}
            <div className="mb-12">
              <Card className="bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl luxury-title text-luxury-charcoal mb-4">실제 매칭 성공 사례</h3>
                    <p className="text-luxury-bronze luxury-subtitle">지난 3개월간 프리미엄 매칭 서비스 결과</p>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-luxury-charcoal luxury-title mb-2">247명</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">매칭 성공</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-luxury-charcoal luxury-title mb-2">94%</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">만족도</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-luxury-charcoal luxury-title mb-2">187쌍</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">교제 시작</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-luxury-charcoal luxury-title mb-2">23쌍</div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm">결혼 예정</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium CTA */}
            <div className="text-center">
              <Card className="relative bg-white border border-luxury-gold rounded-xl border-luxury-gold/30 luxury-shadow enhanced-hover overflow-hidden max-w-2xl mx-auto">
                <div className="absolute top-6 right-6 text-4xl opacity-8 elegant-float">💝</div>
                <div className="absolute bottom-6 left-6 text-3xl opacity-100 elegant-float" style={{animationDelay: '2s'}}>✨</div>

                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-3xl luxury-title text-luxury-charcoal mb-6 leading-tight">
                    🎁 <span className="text-gradient-luxury">당신을 위한 특별한 인연</span>
                  </h3>
                  <p className="text-luxury-bronze luxury-subtitle text-lg mb-6 leading-relaxed">
                    성향 분석 결과 <span className="text-gradient-luxury font-semibold">97% 궁합</span>의 상대방 3분을<br />
                    전문 매치메이커가 직접 선별해 소개해드립니다
                  </p>

                  {/* Special Offer Badge */}
                  <div className="inline-flex items-center gap-3 bg-luxury-accent text-white rounded-full px-6 py-3 mb-8">
                    <span className="text-sm font-semibold">⚡ 성향 분석 완료자 특별가</span>
                  </div>

                  <div className="flex items-center justify-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-2xl text-luxury-bronze line-through mb-1">₩198,000</div>
                      <p className="text-sm text-luxury-bronze/70">정상가</p>
                    </div>
                    <div className="text-4xl text-luxury-gold">→</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-luxury-accent mb-1">₩98,000</div>
                      <p className="text-sm text-luxury-accent font-semibold">50% 할인</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      // Store interest in premium matching
                      const profile = localStorage.getItem('luvo_profile')
                      if (profile) {
                        try {
                          const parsed = JSON.parse(profile)
                          parsed.premiumInterest = true
                          parsed.premiumInterestDate = new Date().toISOString()
                          localStorage.setItem('luvo_profile', JSON.stringify(parsed))
                        } catch {}
                      }

                      // Navigate to premium signup
                      router.push('/premium-matching')
                    }}
                    className="w-full max-w-lg mx-auto py-5 px-10 text-xl rounded-full bg-gradient-to-r from-luxury-accent via-luxury-gold to-luxury-bronze text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden relative"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <span className="luxury-pulse">프리미엄 매칭 신청하기</span>
                      <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" size={26} />
                    </div>
                  </Button>

                  <p className="text-luxury-bronze luxury-subtitle text-sm mt-4 opacity-75">
                    성향 분석 데이터 보유자 한정 • 3명 보장 매칭
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => router.push('/analyze')}
              className="luxury-button-outline py-3 px-8 text-base rounded-full group"
            >
              <RefreshCw className="mr-3 group-hover:rotate-180 transition-transform duration-500" size={20} />
              새로운 성향 분석하기
            </Button>
          </div>
        </div>

        <Toaster position="top-center" />
      </div>
    </div>
  )
}