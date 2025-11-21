'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { calculateSaju, getElementName, getElementColor, type SajuResult, type Element } from '@/lib/saju/calculator'
import { sajuToText, copyToClipboard, shareViaNative } from '@/lib/saju/share'
import { calculateDaeun, calculateKoreanAge } from '@/lib/saju/daeun'
import type { DaeunResult } from '@/lib/saju/daeun'
import { Sparkles, ArrowLeft, Loader2, Star, Share2, Copy, TrendingUp } from 'lucide-react'

function AnalyzePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sajuResult, setSajuResult] = useState<SajuResult | null>(null)
  const [daeunResult, setDaeunResult] = useState<DaeunResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(true)
  const [aiInterpretation, setAiInterpretation] = useState<string>('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // URL 파라미터에서 데이터 가져오기
    const year = parseInt(searchParams.get('year') || '0')
    const month = parseInt(searchParams.get('month') || '0')
    const day = parseInt(searchParams.get('day') || '0')
    const hour = parseInt(searchParams.get('hour') || '12')
    const minute = parseInt(searchParams.get('minute') || '0')
    const calendarType = searchParams.get('calendarType') || 'solar'
    const gender = (searchParams.get('gender') || 'male') as 'male' | 'female'

    if (year && month && day) {
      // 약간의 딜레이로 로딩 효과
      setTimeout(() => {
        const result = calculateSaju(
          year,
          month,
          day,
          hour,
          minute,
          calendarType === 'lunar',
          gender
        )
        setSajuResult(result)

        // 대운 계산
        const currentAge = calculateKoreanAge(year)
        const daeun = calculateDaeun(result, currentAge)
        setDaeunResult(daeun)

        setIsCalculating(false)
      }, 1500)
    } else {
      router.push('/')
    }
  }, [searchParams, router])

  const handleAIInterpretation = async () => {
    if (!sajuResult) return

    setIsLoadingAI(true)
    try {
      const response = await fetch('/api/interpret-saju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sajuResult })
      })

      const data = await response.json()
      setAiInterpretation(data.interpretation)
    } catch (error) {
      console.error('AI 해석 요청 실패:', error)
      setAiInterpretation('AI 해석을 불러오는데 실패했습니다. 나중에 다시 시도해주세요.')
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleCopy = async () => {
    if (!sajuResult) return
    const text = sajuToText(sajuResult)
    const success = await copyToClipboard(text)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const handleShare = async () => {
    if (!sajuResult) return
    await shareViaNative(sajuResult)
  }

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8 animate-bounce">🔮</div>
          <h2 className="text-3xl font-bold text-white mb-4">사주팔자 계산 중...</h2>
          <div className="flex items-center justify-center gap-2 text-purple-200">
            <Loader2 className="animate-spin" size={24} />
            <p>천간지지를 분석하고 있습니다</p>
          </div>
        </div>
      </div>
    )
  }

  if (!sajuResult) {
    return null
  }

  const PillarCard = ({ title, pillar, emoji }: { title: string; pillar: any; emoji: string }) => (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="text-center">
        <div className="text-3xl mb-2">{emoji}</div>
        <h3 className="text-purple-200 text-sm mb-4">{title}</h3>
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="text-4xl font-bold text-white">{pillar.stem}</div>
          <div className="text-4xl font-bold text-pink-200">{pillar.branch}</div>
        </div>
        <div className="flex justify-center items-center gap-2 text-purple-100">
          <span>{pillar.stemKr}</span>
          <span>·</span>
          <span>{pillar.branchKr}</span>
        </div>
        <div
          className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: getElementColor(pillar.element) + '40',
            color: getElementColor(pillar.element),
            border: `2px solid ${getElementColor(pillar.element)}`
          }}
        >
          {getElementName(pillar.element)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.push('/')}
              className="text-purple-200 hover:text-white flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={20} />
              돌아가기
            </button>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2"
                size="sm"
              >
                <Copy size={16} className="mr-1" />
                {copySuccess ? '복사됨!' : '복사'}
              </Button>
              <Button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2"
                size="sm"
              >
                <Share2 size={16} className="mr-1" />
                공유
              </Button>
            </div>
          </div>
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 mb-4">
            사주팔자 분석 결과
          </h1>
          <p className="text-purple-200">
            {sajuResult.birthInfo.year}년 {sajuResult.birthInfo.month}월 {sajuResult.birthInfo.day}일 {' '}
            {sajuResult.birthInfo.hour}시 {sajuResult.birthInfo.minute}분{' '}
            ({sajuResult.birthInfo.isLunar ? '음력' : '양력'}) ·{' '}
            {sajuResult.birthInfo.gender === 'male' ? '남성' : '여성'}
          </p>
        </div>

        {/* 사주팔자 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="text-yellow-300" />
            사주팔자 (四柱八字)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PillarCard title="시주 時柱" pillar={sajuResult.hour} emoji="🕐" />
            <PillarCard title="일주 日柱" pillar={sajuResult.day} emoji="☀️" />
            <PillarCard title="월주 月柱" pillar={sajuResult.month} emoji="🌙" />
            <PillarCard title="년주 年柱" pillar={sajuResult.year} emoji="📅" />
          </div>
          <p className="text-purple-200 text-sm text-center mt-4">
            * 오른쪽부터 읽습니다: 년주 → 월주 → 일주 → 시주
          </p>
        </div>

        {/* 오행 분석 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="text-pink-300" />
            오행 분석 (五行)
          </h2>
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-5 gap-4 mb-6">
              {Object.entries(sajuResult.elements).map(([element, count]) => (
                <div key={element} className="text-center">
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-2 border-4"
                    style={{
                      backgroundColor: getElementColor(element as Element) + '20',
                      borderColor: getElementColor(element as Element),
                      color: getElementColor(element as Element)
                    }}
                  >
                    {count}
                  </div>
                  <div className="text-white text-lg font-semibold">{element}</div>
                  <div className="text-purple-200 text-sm">{getElementName(element as Element)}</div>
                </div>
              ))}
            </div>

            {/* 오행 막대 그래프 */}
            <div className="space-y-3">
              {Object.entries(sajuResult.elements).map(([element, count]) => (
                <div key={element} className="flex items-center gap-3">
                  <div className="w-16 text-white text-sm font-semibold">
                    {element} {getElementName(element as Element)}
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full flex items-center justify-end px-3 text-white text-sm font-bold transition-all duration-1000"
                      style={{
                        width: `${(count / 8) * 100}%`,
                        backgroundColor: getElementColor(element as Element),
                        minWidth: count > 0 ? '30px' : '0'
                      }}
                    >
                      {count > 0 && count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 대운 분석 */}
        {daeunResult && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-300" />
              대운 분석 (大運)
            </h2>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              {/* 현재 대운 */}
              {daeunResult.currentPeriod && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-green-300">현재 대운</h3>
                    <div className="text-green-200 text-lg">
                      {daeunResult.currentPeriod.startAge}세 ~ {daeunResult.currentPeriod.endAge}세
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl font-bold text-white">
                      {daeunResult.currentPeriod.heavenlyStem}{daeunResult.currentPeriod.earthlyBranch}
                    </div>
                    <div className="text-green-100 text-lg">
                      {daeunResult.currentPeriod.description}
                    </div>
                  </div>
                </div>
              )}

              {/* 다음 대운 */}
              {daeunResult.nextPeriod && (
                <div className="mb-6 p-6 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-300">다음 대운</h3>
                    <div className="text-purple-200">
                      {daeunResult.nextPeriod.startAge}세 ~ {daeunResult.nextPeriod.endAge}세
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-white">
                      {daeunResult.nextPeriod.heavenlyStem}{daeunResult.nextPeriod.earthlyBranch}
                    </div>
                    <div className="text-purple-100">
                      {daeunResult.nextPeriod.description}
                    </div>
                  </div>
                </div>
              )}

              {/* 전체 대운 타임라인 */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">대운 타임라인</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {daeunResult.periods.map((period, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl text-center transition-all ${
                        daeunResult.currentPeriod &&
                        period.startAge === daeunResult.currentPeriod.startAge
                          ? 'bg-green-500/30 border-2 border-green-500 scale-105'
                          : 'bg-white/5 border border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-purple-200 text-sm mb-1">
                        {period.startAge}-{period.endAge}세
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {period.heavenlyStem}{period.earthlyBranch}
                      </div>
                      <div className="text-xs text-purple-300 line-clamp-2">
                        {period.description.split(',')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI 해석 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="text-yellow-300" />
            AI 운세 해석
          </h2>

          {!aiInterpretation && !isLoadingAI && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
              <p className="text-purple-200 mb-6">
                AI가 당신의 사주를 분석하여 상세한 운세를 해석해드립니다.
              </p>
              <Button
                onClick={handleAIInterpretation}
                className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl text-lg font-semibold"
              >
                <Sparkles className="mr-2" size={20} />
                AI 해석 받기
              </Button>
              <p className="text-purple-300 text-sm mt-4">
                * 프리미엄 기능 (무료 체험 가능)
              </p>
            </div>
          )}

          {isLoadingAI && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
              <Loader2 className="animate-spin mx-auto mb-4 text-pink-300" size={48} />
              <p className="text-white text-lg">AI가 사주를 해석하고 있습니다...</p>
              <p className="text-purple-200 text-sm mt-2">잠시만 기다려주세요</p>
            </div>
          )}

          {aiInterpretation && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="prose prose-invert max-w-none">
                <div className="text-white whitespace-pre-wrap leading-relaxed">
                  {aiInterpretation}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="text-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 py-4 px-8 rounded-xl"
          >
            새로운 사주 분석하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8 animate-bounce">🔮</div>
          <h2 className="text-3xl font-bold text-white mb-4">로딩 중...</h2>
        </div>
      </div>
    }>
      <AnalyzePageContent />
    </Suspense>
  )
}
