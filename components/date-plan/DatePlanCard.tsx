'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, MapPin, Clock, DollarSign, Sparkles, Star } from 'lucide-react'
import { toast } from 'sonner'
import { DatePlan } from '@/types'

interface DatePlanCardProps {
  plan: DatePlan
}

export default function DatePlanCard({ plan }: DatePlanCardProps) {
  const copyInviteMessage = async () => {
    try {
      await navigator.clipboard.writeText(plan.inviteMessage)
      toast.success('초대 문구가 복사됐어요! 💌')
    } catch {
      toast.error('복사에 실패했어요. 다시 시도해주세요.')
    }
  }

  const getCardIcon = (title: string) => {
    if (title.includes('카페')) return '☕'
    if (title.includes('문화')) return '🎨'
    if (title.includes('야경') || title.includes('이색')) return '🌙'
    return '🎯'
  }

  const getGradientColor = (title: string) => {
    if (title.includes('카페')) return 'bg-luxury-accent'
    if (title.includes('문화')) return 'bg-luxury-gold'
    if (title.includes('야경') || title.includes('이색')) return 'bg-luxury-bronze'
    return 'bg-luxury-accent'
  }

  return (
    <Card className="bg-white border-luxury-gold/30 shadow-xl hover:shadow-2xl enhanced-hover overflow-hidden group">
      {/* Header with gradient */}
      <CardHeader className="relative pb-6 bg-white">
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} size={14} className="text-luxury-gold fill-luxury-gold" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 ${getGradientColor(plan.title)} rounded-full flex items-center justify-center luxury-shadow morphing-glow`}>
            <span className="text-white text-2xl">{getCardIcon(plan.title)}</span>
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl luxury-title text-luxury-charcoal leading-tight">
              {plan.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-luxury-charcoal luxury-subtitle mt-2">
              <Sparkles size={16} className="text-luxury-gold" />
              <span className="text-sm">전문가 추천</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0 bg-white">
        {/* Time and Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-luxury-cream p-4 rounded-xl border border-luxury-gold/30 shadow-sm">
            <div className="flex items-center gap-2 text-luxury-charcoal mb-1">
              <Clock size={18} className="text-luxury-accent" />
              <span className="text-sm font-semibold luxury-subtitle">시간</span>
            </div>
            <span className="text-luxury-charcoal luxury-subtitle text-sm font-medium">{plan.time}</span>
          </div>
          <div className="bg-luxury-cream p-4 rounded-xl border border-luxury-gold/30 shadow-sm">
            <div className="flex items-center gap-2 text-luxury-charcoal mb-1">
              <DollarSign size={18} className="text-luxury-gold" />
              <span className="text-sm font-semibold luxury-subtitle">예산</span>
            </div>
            <span className="text-luxury-charcoal luxury-subtitle text-sm font-medium">{plan.estimatedCost}</span>
          </div>
        </div>

        {/* Places */}
        <div>
          <h4 className="luxury-title text-luxury-charcoal font-semibold mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-luxury-accent" />
            추천 장소
          </h4>
          <div className="space-y-3">
            {plan.places.map((place, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-luxury-gold/20 shadow-sm enhanced-hover">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-luxury-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="luxury-title text-luxury-charcoal font-semibold mb-1">{place.name}</h5>
                    <p className="text-xs text-luxury-charcoal luxury-subtitle mb-2 font-medium">{place.address}</p>
                    <p className="text-sm text-luxury-charcoal luxury-subtitle leading-relaxed">{place.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Message */}
        <div>
          <h4 className="luxury-title text-luxury-charcoal font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">💌</span>
            초대 문구
          </h4>
          <div className="bg-luxury-cream rounded-xl p-5 mb-4 border border-luxury-gold/20 shadow-sm">
            <p className="text-luxury-charcoal luxury-subtitle leading-relaxed italic text-center font-medium">
              &quot;{plan.inviteMessage}&quot;
            </p>
          </div>
          <Button
            onClick={copyInviteMessage}
            className="w-full py-3 px-6 text-white font-semibold rounded-full bg-gradient-to-r from-luxury-gold to-luxury-bronze hover:shadow-lg transform hover:scale-105 transition-all duration-300 group overflow-hidden relative"
          >
            <div className="flex items-center justify-center gap-2 relative z-10">
              <Copy size={18} className="group-hover:rotate-12 transition-transform" />
              <span>초대 문구 복사하기</span>
            </div>
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </Button>
        </div>

        {/* Tips */}
        {plan.tips && plan.tips.length > 0 && (
          <div>
            <h4 className="luxury-title text-luxury-charcoal font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span>
              전문가 팁
            </h4>
            <div className="space-y-2">
              {plan.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-luxury-beige rounded-lg border border-luxury-gold/20 shadow-sm">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-luxury-charcoal luxury-subtitle leading-relaxed font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Rate */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            <span className="text-sm font-semibold text-green-700 luxury-subtitle">성공 확률 98.2%</span>
          </div>
          <p className="text-xs text-green-600 luxury-subtitle font-medium">
            이런 스타일의 만남 제안이 매우 효과적입니다
          </p>
        </div>
      </CardContent>
    </Card>
  )
}