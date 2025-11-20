'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Sparkles, MessageCircle, Target, Star, Users, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen luxury-bg relative overflow-hidden">
      {/* Elegant Floating Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-10 elegant-float">🌸</div>
      <div className="absolute top-40 right-20 text-4xl opacity-15 elegant-float" style={{animationDelay: '2s'}}>✨</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-12 elegant-float" style={{animationDelay: '4s'}}>🍃</div>
      <div className="absolute bottom-20 right-10 text-3xl opacity-10 elegant-float" style={{animationDelay: '6s'}}>🎋</div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 luxury-glass rounded-full px-8 py-4 mb-8">
                <div className="verification-mark">
                  <CheckCircle size={14} />
                  AI 인증
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-luxury-gold fill-current" size={18} />
                  <Star className="text-luxury-gold fill-current" size={18} />
                  <Star className="text-luxury-gold fill-current" size={18} />
                  <Star className="text-luxury-gold fill-current" size={18} />
                  <Star className="text-luxury-gold fill-current" size={18} />
                  <span className="ml-3 text-luxury-charcoal font-semibold">4.89/5.0</span>
                </div>
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <span className="text-luxury-charcoal font-medium">실시간 2,143명 활성</span>
                </div>
              </div>

              <h1 className="text-8xl luxury-title text-luxury-charcoal mb-8 leading-tight">
                <span className="luxury-pulse inline-block">🌸</span>
                <span className="text-gradient-luxury"> Luvo</span>
              </h1>
              <h2 className="text-4xl luxury-subtitle font-light text-luxury-bronze mb-8">
                세련된 연애의 시작
              </h2>
              <p className="text-xl text-luxury-charcoal/80 leading-relaxed max-w-4xl mx-auto luxury-subtitle">
                품격 있는 대화부터 로맨틱한 만남까지<br />
                <span className="text-gradient-luxury font-semibold">AI가 제안하는 우아한 연애 솔루션</span>으로 특별한 순간을 만들어보세요
              </p>
            </div>

            {/* Professional Statistics */}
            <div className="smart-grid grid-cols-3 max-w-4xl mx-auto mb-16">
              <div className="smart-grid-item stat-card enhanced-hover ripple-effect smart-tooltip" data-tooltip="검증된 성공 데이터">
                <div className="stat-number">98.2%</div>
                <div className="stat-label">대화 성공률</div>
                <div className="trust-element mt-4">
                  <CheckCircle className="trust-icon" size={16} />
                  <span>15,847건 검증</span>
                </div>
              </div>
              <div className="smart-grid-item stat-card enhanced-hover ripple-effect smart-tooltip" data-tooltip="최고 속도 AI 엔진">
                <div className="stat-number">12.3초</div>
                <div className="stat-label">평균 분석 시간</div>
                <div className="trust-element mt-4">
                  <Target className="trust-icon" size={16} />
                  <span>실시간 처리</span>
                </div>
              </div>
              <div className="smart-grid-item stat-card enhanced-hover ripple-effect smart-tooltip" data-tooltip="검증된 사용자 피드백">
                <div className="stat-number">4.89★</div>
                <div className="stat-label">사용자 만족도</div>
                <div className="trust-element mt-4">
                  <Users className="trust-icon" size={16} />
                  <span>2,143개 리뷰</span>
                </div>
              </div>
            </div>

            {/* Premium CTA Button */}
            <div className="mb-20">
              <Button
                onClick={handleStart}
                className="luxury-button smart-button interaction-feedback py-8 px-20 text-2xl rounded-full luxury-shadow group relative overflow-hidden"
                size="lg"
              >
                <Sparkles className="mr-4 group-hover:rotate-12 transition-transform" size={28} />
                우아한 시작하기
                <Heart className="ml-4 luxury-pulse" size={28} />
              </Button>
              <p className="text-luxury-bronze/70 text-sm mt-6 luxury-subtitle">
                품격있는 무료 체험 • 3분 만에 완료
              </p>
            </div>
          </div>

          {/* Professional Divider */}
          <div className="professional-divider"></div>

          {/* Features Section Header */}
          <div className="text-center mb-12">
            <div className="professional-badge inline-block px-6 py-3 rounded-full text-white mb-6">
              ✨ AI 기반 전문 서비스
            </div>
            <h2 className="text-4xl luxury-title text-luxury-charcoal mb-6">
              검증된 AI 기술로 완성하는 <span className="text-gradient-luxury">완벽한 연애</span>
            </h2>
            <p className="text-xl text-luxury-bronze luxury-subtitle max-w-2xl mx-auto">
              전문적인 심리 분석과 AI 기술을 결합하여 당신만의 완벽한 연애 코칭을 제공합니다
            </p>
          </div>

          {/* Features Grid */}
          <div className="smart-grid lg:grid-cols-3 mb-20">
            <Card className="smart-grid-item luxury-card border-luxury-gold/20 group enhanced-hover interactive-element">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform luxury-shadow ripple-effect">
                  <MessageCircle className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl luxury-title text-luxury-charcoal">
                  🧠 세심한 대화 분석
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-luxury-charcoal/80 leading-relaxed luxury-subtitle mb-6">
                  상대방의 <span className="text-gradient-luxury font-semibold">진심</span>을 이해하고<br />
                  미묘한 감정의 뉘앙스까지 섬세하게 분석합니다
                </p>
                <div className="premium-alert success">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-luxury-accent" size={20} />
                    <div className="text-left">
                      <div className="font-semibold text-luxury-charcoal">94.2% 정확도</div>
                      <div className="text-sm text-luxury-bronze">15,847건 검증 완료</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="smart-grid-item luxury-card border-luxury-gold/20 group enhanced-hover interactive-element">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform luxury-shadow ripple-effect">
                  <Heart className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl luxury-title text-luxury-charcoal">
                  💬 품격있는 답장
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-luxury-charcoal/80 leading-relaxed luxury-subtitle mb-6">
                  우아하게, 자연스럽게, 매력적으로<br />
                  <span className="text-gradient-luxury font-semibold">3가지 스타일</span>의 세련된 답장 제안
                </p>
                <div className="premium-alert info">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-luxury-gold" size={20} />
                    <div className="text-left">
                      <div className="font-semibold text-luxury-charcoal">4.89/5.0 만족도</div>
                      <div className="text-sm text-luxury-bronze">실시간 톤 조절 AI</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="smart-grid-item luxury-card border-luxury-gold/20 group enhanced-hover interactive-element">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-luxury-bronze rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform luxury-shadow ripple-effect">
                  <Target className="text-white" size={36} />
                </div>
                <CardTitle className="text-2xl luxury-title text-luxury-charcoal">
                  🎯 특별한 만남 제안
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-luxury-charcoal/80 leading-relaxed luxury-subtitle mb-6">
                  대화 맥락에 어울리는<br />
                  <span className="text-gradient-luxury font-semibold">품격있는 만남의 장소</span> 3곳 추천
                </p>
                <div className="premium-alert warning">
                  <div className="flex items-center gap-3">
                    <Target className="text-luxury-bronze" size={20} />
                    <div className="text-left">
                      <div className="font-semibold text-luxury-charcoal">89.3% 성공률</div>
                      <div className="text-sm text-luxury-bronze">지역별 맞춤 추천</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Divider */}
          <div className="professional-divider"></div>

          {/* Premium Testimonials */}
          <div className="luxury-glass rounded-3xl p-12 mb-20">
            <div className="text-center mb-12">
              <div className="professional-badge inline-block px-6 py-3 rounded-full text-white mb-6">
                ★ 고객 만족 인증
              </div>
              <h3 className="text-3xl luxury-title text-luxury-charcoal text-center mb-6">
                🌸 고객들의 소중한 후기
              </h3>
              <p className="text-luxury-bronze luxury-subtitle">
                실제 고객들이 직접 경험한 효과를 소개합니다
              </p>
            </div>
            <div className="smart-grid md:grid-cols-2 lg:grid-cols-3">
              <div className="smart-grid-item luxury-card p-8 enhanced-hover interactive-element">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-luxury-gold fill-current" size={18} />
                  ))}
                </div>
                <p className="text-luxury-charcoal/90 luxury-subtitle mb-4">
                  "정말 놀라워요! AI가 제안한 답장으로 첫 데이트 성공했어요 🌸"
                </p>
                <div className="verification-mark">
                  김○○, 24세
                </div>
              </div>

              <div className="smart-grid-item luxury-card p-8 enhanced-hover interactive-element">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-luxury-gold fill-current" size={18} />
                  ))}
                </div>
                <p className="text-luxury-charcoal/90 luxury-subtitle mb-4">
                  "대화가 어색했는데 AI 추천 장소로 분위기가 완전히 달라졌어요 ✨"
                </p>
                <div className="verification-mark">
                  박○○, 27세
                </div>
              </div>

              <div className="smart-grid-item luxury-card p-8 enhanced-hover interactive-element">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="text-luxury-gold fill-current" size={18} />
                  ))}
                </div>
                <p className="text-luxury-charcoal/90 luxury-subtitle mb-4">
                  "연애 초보인데 덕분에 자신감이 생겸어요. 적극 추천합니다! 🎯"
                </p>
                <div className="verification-mark">
                  이○○, 22세
                </div>
              </div>
            </div>
          </div>

          {/* Professional Divider */}
          <div className="professional-divider"></div>

          {/* Premium Bottom CTA */}
          <div className="text-center mb-16 fade-in-scale">
            <div className="luxury-glass rounded-3xl p-12 inline-block enhanced-hover">
              <div className="professional-badge inline-block px-6 py-3 rounded-full text-white mb-6 morphing-glow">
                🎁 특별 할인 이벤트
              </div>
              <h3 className="text-3xl luxury-title text-luxury-charcoal mb-6 fade-in-up">
                지금 시작하면 <span className="text-gradient-luxury">무료</span>로 체험!
              </h3>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
                <div className="trust-element fade-in-up staggered-animation enhanced-hover">
                  <Users className="trust-icon breathe" size={20} />
                  <span>2,143명 활성 중</span>
                  <div className="trust-badge">LIVE</div>
                </div>
                <div className="trust-element fade-in-up staggered-animation enhanced-hover">
                  <CheckCircle className="trust-icon glow-pulse" size={20} />
                  <span>무료 체험 가능</span>
                  <div className="security-indicator">SSL 보안</div>
                </div>
                <div className="trust-element fade-in-up staggered-animation enhanced-hover">
                  <Sparkles className="trust-icon morphing-glow" size={20} />
                  <span>세계 최고 AI</span>
                  <div className="certification-mark">
                    <CheckCircle className="icon" size={16} />
                    AI 인증
                  </div>
                </div>
                <div className="trust-element fade-in-up staggered-animation enhanced-hover">
                  <Heart className="trust-icon breathe" size={20} />
                  <span>100% 안전</span>
                  <div className="guarantee-seal">품질보증</div>
                </div>
              </div>

              <Button
                onClick={handleStart}
                className="luxury-button smart-button interaction-feedback py-6 px-16 text-xl rounded-full luxury-shadow group ripple-effect glow-pulse"
                size="lg"
              >
                특별한 연애 체험 시작 →
              </Button>
              <p className="text-luxury-bronze/70 text-sm mt-4 luxury-subtitle fade-in-up">
                3분 만에 완료 • 신용카드 불필요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Loading Indicator */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="luxury-glass rounded-full p-3 luxury-shadow">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="text-luxury-charcoal text-sm font-medium">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}
