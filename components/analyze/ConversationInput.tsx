'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, MessageCircle, Heart, ArrowRight, Brain, Target } from 'lucide-react'

interface ConversationInputProps {
  onAnalyze?: (conversation: string) => void
}

export default function ConversationInput({ onAnalyze }: ConversationInputProps) {
  const [conversation, setConversation] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const characterCount = conversation.length
  const minLength = 20
  const maxLength = 5000
  const isValid = characterCount >= minLength && characterCount <= maxLength

  const handleAnalyze = async () => {
    if (!isValid) return

    setIsAnalyzing(true)

    try {
      // Get user ID from localStorage or generate anonymous ID
      const profile = localStorage.getItem('luvo_profile')
      let userId = null

      if (profile) {
        try {
          const parsed = JSON.parse(profile)
          userId = parsed.id || `user_${Date.now()}`
        } catch {
          userId = `user_${Date.now()}`
        }
      } else {
        userId = `anonymous_${Date.now()}`
      }

      // Call real API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation,
          userId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      // Store analysis data for the result page
      localStorage.setItem('current_analysis', JSON.stringify(data))

      if (onAnalyze) {
        onAnalyze(conversation)
      } else {
        router.push(`/result/${data.analysisId}`)
      }

    } catch (error) {
      console.error('Analysis error:', error)
      // Show error but still redirect to demonstrate flow
      const fallbackId = `analysis_${Date.now()}`
      router.push(`/result/${fallbackId}?error=true`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen luxury-bg relative overflow-hidden" style={{ pointerEvents: 'auto' }}>
      {/* Elegant Floating Elements - Disabled for debugging */}
      <div className="absolute top-20 left-10 text-4xl opacity-12 elegant-float" style={{ pointerEvents: 'none' }}>🍃</div>
      <div className="absolute top-60 right-20 text-3xl opacity-15 elegant-float" style={{animationDelay: '2s', pointerEvents: 'none'}}>🌸</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-10 elegant-float" style={{animationDelay: '4s', pointerEvents: 'none'}}>✨</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-12 elegant-float" style={{animationDelay: '6s', pointerEvents: 'none'}}>🕰️</div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 luxury-glass rounded-full px-8 py-4 mb-8">
              <Brain className="text-luxury-gold" size={24} />
              <span className="text-luxury-charcoal font-semibold luxury-subtitle">연애 심리학 전문 분석 서비스</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl luxury-title text-luxury-charcoal mb-6 sm:mb-8 leading-tight">
              <span className="luxury-pulse inline-block">🍃</span>
              <span className="text-gradient-luxury"> 대화의 예술</span>
            </h1>
            <p className="text-lg sm:text-xl text-luxury-bronze luxury-subtitle leading-relaxed max-w-3xl mx-auto">
              연애 전문가들이 대화 속 <span className="text-gradient-luxury font-semibold">미묘한 감정과 의도</span>를 분석하여<br />
              품격있는 대화의 길을 제시해드립니다
            </p>
          </div>

          {/* Input Card */}
          <Card className="luxury-card border-luxury-gold/20 luxury-shadow">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform luxury-shadow">
                <MessageCircle className="text-white" size={36} />
              </div>
              <CardTitle className="text-2xl sm:text-3xl luxury-title text-luxury-charcoal mb-4">
                대화를 공유해 주세요
              </CardTitle>
              <p className="text-luxury-bronze luxury-subtitle">모든 메신저 대화를 우아하게 분석해드립니다</p>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="relative" style={{ zIndex: 9999, position: 'relative' }}>
                <textarea
                  id="conversation-textarea"
                  placeholder={`대화 내용을 자연스럽게 붙여넣어 주세요
(최소 ${minLength}자 이상)

예시:
A: 안녕하세요! 오늘 날씨 정말 좋네요.
B: 네~ 저도 산책 나왔어요 ㅎㅎ
A: 오 좋네요! 어디로 산책 가셨어요?`}
                  value={conversation}
                  onChange={(e) => {
                    console.log('Input changed:', e.target.value.length)
                    setConversation(e.target.value)
                  }}
                  onFocus={() => console.log('Textarea focused')}
                  onBlur={() => console.log('Textarea blurred')}
                  onClick={() => console.log('Textarea clicked')}
                  className="w-full min-h-[280px] sm:min-h-[320px] p-3 sm:p-4 border-2 border-gray-300 rounded-xl bg-white text-black text-base resize-none focus:border-blue-500 focus:outline-none transition-colors"
                  maxLength={maxLength}
                  autoComplete="off"
                  spellCheck={false}
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    zIndex: 10000,
                    position: 'relative',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation'
                  }}
                />
                {/* Test button for debugging */}
                <button
                  type="button"
                  onClick={() => {
                    console.log('Test button clicked')
                    const textarea = document.getElementById('conversation-textarea') as HTMLTextAreaElement
                    if (textarea) {
                      textarea.value = '테스트 입력입니다'
                      setConversation('테스트 입력입니다')
                      textarea.focus()
                      console.log('Test text set and focused')
                    }
                  }}
                  className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white text-sm rounded"
                  style={{ zIndex: 10001 }}
                >
                  테스트
                </button>
              </div>

              {/* Character Counter */}
              <div id="character-counter" className="flex justify-between items-center p-4 luxury-glass rounded-xl">
                <div className="flex items-center gap-2">
                  {characterCount < minLength ? (
                    <span className="text-red-600 flex items-center gap-2 luxury-subtitle">
                      <Target size={18} />
                      최소 {minLength - characterCount}자 더 입력해 주세요
                    </span>
                  ) : (
                    <span className="text-luxury-accent flex items-center gap-2 luxury-subtitle">
                      <Sparkles size={18} />
                      분석 준비 완료!
                    </span>
                  )}
                </div>
                <span className={`text-sm luxury-subtitle ${characterCount > maxLength * 0.9 ? 'text-orange-600' : 'text-luxury-bronze'}`}>
                  {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={(e) => {
                  console.log('Analyze button clicked!', { isValid, isAnalyzing })
                  e.preventDefault()
                  e.stopPropagation()
                  handleAnalyze()
                }}
                onMouseDown={() => console.log('Button mouse down')}
                onTouchStart={() => console.log('Button touch start')}
                disabled={!isValid || isAnalyzing}
                className="w-full py-4 sm:py-6 px-8 sm:px-12 text-lg sm:text-xl rounded-full bg-gradient-to-r from-luxury-gold to-luxury-bronze text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                style={{
                  zIndex: 10000,
                  position: 'relative',
                  pointerEvents: 'auto'
                }}
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>전문가가 분석하고 있어요...</span>
                  </div>
                ) : (
                  <>
                    <Brain className="mr-3 group-hover:animate-pulse" size={24} />
                    전문 분석 시작하기
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                  </>
                )}
              </button>
              {!isValid && (
                <p id="validation-error" className="text-luxury-bronze/70 text-sm mt-4 luxury-subtitle" role="alert">
                  최소 {minLength}자 이상 입력해 주세요
                </p>
              )}
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="luxury-glass rounded-2xl p-8 border border-luxury-gold/30 fade-in-scale">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-luxury-accent rounded-full flex items-center justify-center luxury-shadow breathe">
                    <Brain className="text-white luxury-pulse" size={24} />
                  </div>
                  <h3 className="luxury-title text-luxury-charcoal text-xl">세심한 분석 진행 중...</h3>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 text-luxury-charcoal fade-in-up staggered-animation">
                    <div className="w-3 h-3 bg-luxury-gold rounded-full luxury-pulse" />
                    <span className="luxury-subtitle">심리학 기반 감정과 의도 분석</span>
                  </div>
                  <div className="flex items-center gap-4 text-luxury-charcoal fade-in-up staggered-animation">
                    <div className="w-3 h-3 bg-luxury-bronze rounded-full luxury-pulse" style={{animationDelay: '0.5s'}} />
                    <span className="luxury-subtitle">전문가의 반응 패턴 해석</span>
                  </div>
                  <div className="flex items-center gap-4 text-luxury-charcoal fade-in-up staggered-animation">
                    <div className="w-3 h-3 bg-luxury-accent rounded-full luxury-pulse" style={{animationDelay: '1s'}} />
                    <span className="luxury-subtitle">연구 검증된 답장 스타일 제안</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-luxury-gold/20">
                  <div className="shimmer h-2 rounded-full"></div>
                </div>
              </div>
            )}
            </CardContent>
          </Card>

          {/* Tips Section */}
          {!isAnalyzing && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-card p-8 text-center border border-luxury-gold/20 fade-in-up staggered-animation enhanced-hover">
                <div className="w-16 h-16 bg-luxury-accent rounded-full flex items-center justify-center mx-auto mb-4 luxury-shadow morphing-glow">
                  <MessageCircle className="text-white" size={28} />
                </div>
                <h3 className="luxury-title text-luxury-charcoal font-semibold mb-3 text-base sm:text-lg">세심한 감정 분석</h3>
                <p className="text-luxury-bronze luxury-subtitle text-sm sm:text-base">심리학 전문가가 대화 속 미묘한 감정까지 섬세하게 파악합니다</p>
              </div>
              <div className="luxury-card p-8 text-center border border-luxury-gold/20 fade-in-up staggered-animation enhanced-hover">
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4 luxury-shadow glow-pulse">
                  <Heart className="text-white" size={28} />
                </div>
                <h3 className="luxury-title text-luxury-charcoal font-semibold mb-3">3가지 스타일</h3>
                <p className="text-luxury-bronze luxury-subtitle text-sm">우아하게, 자연스럽게, 매력적으로</p>
              </div>
              <div className="luxury-card p-8 text-center border border-luxury-gold/20 fade-in-up staggered-animation enhanced-hover">
                <div className="w-16 h-16 bg-luxury-bronze rounded-full flex items-center justify-center mx-auto mb-4 luxury-shadow breathe">
                  <Target className="text-white" size={28} />
                </div>
                <h3 className="luxury-title text-luxury-charcoal font-semibold mb-3">특별한 만남 제안</h3>
                <p className="text-luxury-bronze luxury-subtitle text-sm">분석 결과를 바탕으로 한 품격있는 데이트 코스</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}