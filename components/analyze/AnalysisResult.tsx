'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { AnalysisResult as AnalysisResultType } from '@/types'

interface AnalysisResultProps {
  analysis: AnalysisResultType
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getEmotionEmoji = (type: string) => {
    switch (type) {
      case 'positive': return '💛'
      case 'neutral': return '😐'
      case 'negative': return '💙'
      case 'mixed': return '🎭'
      default: return '💛'
    }
  }

  const getEmotionColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600'
      case 'neutral': return 'text-gray-600'
      case 'negative': return 'text-blue-600'
      case 'mixed': return 'text-purple-600'
      default: return 'text-green-600'
    }
  }

  return (
    <Card className="shadow-lg mb-6">
      <CardHeader className="text-center pb-4">
        <div className="text-6xl mb-4">
          {getEmotionEmoji(analysis.emotion.type)}
        </div>
        <CardTitle className="text-2xl text-deep-navy">
          지금 이 대화 속 감정은
        </CardTitle>
        <div className={`text-xl font-semibold ${getEmotionColor(analysis.emotion.type)}`}>
          {analysis.emotion.description}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-deep-navy">
            <span>분석 신뢰도</span>
            <span>{Math.round(analysis.emotion.confidence * 100)}%</span>
          </div>
          <Progress
            value={analysis.emotion.confidence * 100}
            className="h-3"
          />
        </div>

        {/* Why Details Toggle */}
        <div className="border-t pt-4">
          <Button
            variant="ghost"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-deep-navy/70 hover:text-deep-navy"
          >
            <span>왜 그런지 궁금하다면?</span>
            {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>

          {showDetails && (
            <div className="mt-4 p-4 bg-mint/10 rounded-lg space-y-4">
              {/* Intention */}
              <div>
                <h4 className="font-semibold text-deep-navy mb-2">💭 의도 분석</h4>
                <p className="text-sm text-deep-navy/80 mb-2">
                  {analysis.intention.type === 'showing_interest' && '호감 표현'}
                  {analysis.intention.type === 'sharing_info' && '정보 공유'}
                  {analysis.intention.type === 'declining' && '거절 신호'}
                  {analysis.intention.type === 'testing_boundaries' && '경계 테스트'}
                </p>
                <ul className="text-xs text-deep-navy/70 space-y-1">
                  {analysis.intention?.indicators?.map((indicator, index) => (
                    <li key={index}>• {indicator}</li>
                  ))}
                </ul>
              </div>

              {/* Risk Signals */}
              {analysis.riskSignals && analysis.riskSignals.length > 0 && (
                <div>
                  <h4 className="font-semibold text-deep-navy mb-2">⚠️ 주의 신호</h4>
                  {analysis.riskSignals.map((risk, index) => (
                    <div key={index} className="text-sm bg-orange-50 p-2 rounded mb-2">
                      <span className="font-medium">{risk.type}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        risk.severity === 'high' ? 'bg-red-100 text-red-700' :
                        risk.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.severity}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">{risk.evidence}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              <div>
                <h4 className="font-semibold text-deep-navy mb-2">💡 제안</h4>
                <ul className="text-sm text-deep-navy/80 space-y-1">
                  {analysis.suggestions?.map((suggestion, index) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}