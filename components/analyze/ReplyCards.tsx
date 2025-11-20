'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, HelpCircle, MessageCircle, Sparkles, CheckCircle, Star, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { Reply } from '@/types'

interface ReplyCardsProps {
  replies?: Reply[]
}

export default function ReplyCards({ replies = [] }: ReplyCardsProps) {
  const [showReasoning, setShowReasoning] = useState<string | null>(null)

  if (!replies || replies.length === 0) {
    return (
      <Card className="luxury-card border-luxury-gold/20 luxury-shadow mb-8">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-luxury-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-luxury-accent" size={32} />
          </div>
          <p className="text-luxury-bronze luxury-subtitle">답장 제안을 준비 중입니다...</p>
        </CardContent>
      </Card>
    )
  }

  const copyToClipboard = async (text: string, tone: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${getToneLabel(tone)} 답장이 복사됐어요! 📋`)
    } catch {
      toast.error('복사에 실패했어요. 다시 시도해주세요.')
    }
  }

  const getToneEmoji = (tone: string) => {
    switch (tone) {
      case 'gentle': return '🌸'
      case 'neutral': return '😊'
      case 'playful': return '😄'
      default: return '💬'
    }
  }

  const getToneLabel = (tone: string) => {
    switch (tone) {
      case 'gentle': return '부드러운 톤'
      case 'neutral': return '자연스러운 톤'
      case 'playful': return '유쾌한 톤'
      default: return ''
    }
  }

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'gentle': return 'from-pink-400 to-rose-400'
      case 'neutral': return 'from-blue-400 to-indigo-400'
      case 'playful': return 'from-orange-400 to-yellow-400'
      default: return 'from-luxury-accent to-luxury-gold'
    }
  }

  const getToneBgColor = (tone: string) => {
    switch (tone) {
      case 'gentle': return 'bg-pink-50'
      case 'neutral': return 'bg-blue-50'
      case 'playful': return 'bg-orange-50'
      default: return 'bg-luxury-cream'
    }
  }

  return (
    <Card className="luxury-card border-luxury-gold/20 luxury-shadow enhanced-hover overflow-hidden">
      {/* Header */}
      <CardHeader className="text-center pb-6 bg-gradient-to-br from-luxury-cream to-white">
        <div className="w-20 h-20 bg-gradient-to-br from-luxury-accent to-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 luxury-shadow morphing-glow">
          <MessageCircle className="text-white" size={36} />
        </div>
        <CardTitle className="text-2xl md:text-3xl luxury-title text-luxury-charcoal mb-4 leading-tight">
          💬 3가지 매력적인 답장
        </CardTitle>
        <p className="text-luxury-bronze luxury-subtitle text-base md:text-lg leading-relaxed max-w-lg mx-auto">
          대화 분위기에 <span className="text-gradient-luxury font-semibold">완벽하게 맞는</span> 답장을 준비했어요
        </p>

        {/* Success Rate Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} size={16} className="text-luxury-gold fill-luxury-gold" />
            ))}
          </div>
          <span className="text-sm text-luxury-bronze luxury-subtitle ml-2">전문가 인증</span>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        {/* Reply Cards Grid */}
        <div className="space-y-6">
          {replies?.map((reply, index) => (
            <div
              key={reply.tone}
              className="luxury-card border border-luxury-gold/20 rounded-2xl overflow-hidden enhanced-hover group"
            >
              {/* Reply Header */}
              <div className={`p-4 bg-gradient-to-r ${getToneColor(reply.tone)} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">{getToneEmoji(reply.tone)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold luxury-title">{getToneLabel(reply.tone)}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle size={14} />
                        <span className="text-xs opacity-90">추천도 {95 + index}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold opacity-60">#{index + 1}</div>
                </div>
              </div>

              {/* Reply Content */}
              <div className={`p-6 ${getToneBgColor(reply.tone)} border-b border-gray-100`}>
                <div className="bg-white rounded-xl p-5 luxury-shadow">
                  <p className="text-luxury-charcoal luxury-subtitle text-lg leading-relaxed font-medium">
                    &quot;{reply.message}&quot;
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(reply.message, reply.tone)}
                  className={`mt-4 w-full py-3 px-6 bg-gradient-to-r ${getToneColor(reply.tone)} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group overflow-hidden relative`}
                >
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <Copy size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>이 답장 복사하기</span>
                  </div>
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>

              {/* Expert Reasoning */}
              <div className="p-6">
                <button
                  onClick={() => setShowReasoning(showReasoning === reply.id ? null : reply.id)}
                  className="w-full flex items-center justify-between p-4 luxury-glass rounded-xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-luxury-accent/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="text-luxury-accent" size={16} />
                    </div>
                    <span className="luxury-subtitle text-luxury-charcoal font-semibold">전문가 분석</span>
                  </div>
                  <div className={`transform transition-transform ${showReasoning === reply.id ? 'rotate-180' : ''}`}>
                    <span className="text-luxury-bronze">▼</span>
                  </div>
                </button>

                {showReasoning === reply.id && (
                  <div className="mt-4 p-4 bg-luxury-cream rounded-xl border border-luxury-gold/10 fade-in-scale">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="text-luxury-gold" size={14} />
                      </div>
                      <p className="text-luxury-bronze luxury-subtitle text-sm leading-relaxed">
                        {reply.reasoning}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Tips */}
        <div className="mt-8 p-6 luxury-glass rounded-2xl border border-luxury-gold/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-luxury-bronze/20 rounded-full flex items-center justify-center">
              <Heart className="text-luxury-bronze" size={20} />
            </div>
            <h3 className="text-lg luxury-title text-luxury-charcoal font-semibold">활용 팁</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-luxury-bronze luxury-subtitle">
                상황에 맞는 톤을 선택해서 자연스러운 대화를 이어가세요
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-luxury-bronze rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-luxury-bronze luxury-subtitle">
                답장 후 상대방의 반응을 보고 다음 대화 스타일을 조정하세요
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}