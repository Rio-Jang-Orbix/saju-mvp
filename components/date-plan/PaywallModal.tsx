'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { getABTestGroup, trackABTestAssignment } from '@/lib/utils/ab-test'

interface PaywallModalProps {
  datePlanId: string
  onSuccess: () => void
}

export default function PaywallModal({ datePlanId, onSuccess }: PaywallModalProps) {
  const [email, setEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [abGroup, setAbGroup] = useState<'A' | 'B'>('A')
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Get or generate user ID
    const profile = localStorage.getItem('luvo_profile')
    let id = ''

    if (profile) {
      try {
        const parsed = JSON.parse(profile)
        id = parsed.id || `user_${Date.now()}`
      } catch {
        id = `user_${Date.now()}`
      }
    } else {
      id = `anonymous_${Date.now()}`
    }

    setUserId(id)

    // Determine A/B test group
    const group = getABTestGroup(id)
    setAbGroup(group)

    // Track A/B test assignment
    trackABTestAssignment(id, group, 'paywall_modal')
  }, [])

  const handleEmailSubmit = async () => {
    if (!email || !email.includes('@')) {
      toast.error('올바른 이메일을 입력해주세요')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/email-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          datePlanId,
          userId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to collect email')
      }

      toast.success(data.message)
      onSuccess()

    } catch (error) {
      console.error('Email collection error:', error)
      toast.error('처리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datePlanId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment session')
      }

      // MVP Mode: Show success message and proceed
      if (data.mock) {
        toast.success(data.message || '테스트 결제가 완료되었습니다!')
        setTimeout(() => {
          onSuccess()
        }, 1000)
      } else {
        // Redirect to Stripe Checkout (production mode)
        if (data.url) {
          window.location.href = data.url
        } else {
          throw new Error('No payment URL received')
        }
      }

    } catch (error) {
      console.error('Payment error:', error)
      toast.error('결제 세션 생성에 실패했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-deep-navy">
            ✨ 당신 둘만의 데이트 플랜
          </CardTitle>
          <p className="text-deep-navy/70">
            AI가 분석한 대화를 바탕으로 완벽한 데이트 코스를 준비했어요
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Preview */}
          <div className="bg-mint/10 p-4 rounded-lg">
            <h3 className="font-semibold text-deep-navy mb-2">📋 포함 내용</h3>
            <ul className="text-sm text-deep-navy/80 space-y-1">
              <li>• 3가지 테마의 데이트 코스</li>
              <li>• 시간대별 상세 일정</li>
              <li>• 예산 및 장소 추천</li>
              <li>• 자연스러운 초대 문구</li>
            </ul>
          </div>

          {/* A/B Test Content */}
          {abGroup === 'A' ? (
            // Group A: Email Collection
            <div className="space-y-4">
              <div className="text-center text-sm text-deep-navy/70 mb-4">
                📧 이메일로 무료 제공
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-navy mb-2">
                  이메일 주소
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 focus:border-mint"
                />
              </div>

              <Button
                onClick={handleEmailSubmit}
                disabled={isProcessing}
                className="w-full bg-mint hover:bg-mint/90 text-deep-navy font-semibold py-3"
              >
                {isProcessing ? '처리 중...' : '무료로 받기'}
              </Button>
            </div>
          ) : (
            // Group B: Payment
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-deep-navy mb-2">₩2,900</div>
                <p className="text-sm text-deep-navy/70">
                  완벽한 데이트 플랜 + 초대 문구
                </p>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-mint hover:bg-mint/90 text-deep-navy font-semibold py-3"
              >
                {isProcessing ? '결제 처리 중...' : '₩2,900으로 확인하기'}
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-deep-navy/50">
              언제든 이메일로 삭제 요청 가능
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}