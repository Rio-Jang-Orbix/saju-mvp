'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { calculateSaju, getElementName, getElementColor, type SajuResult, type Element } from '@/lib/saju/calculator'
import { sajuToText, copyToClipboard, shareViaNative } from '@/lib/saju/share'
import { calculateDaeun, calculateKoreanAge } from '@/lib/saju/daeun'
import type { DaeunResult } from '@/lib/saju/daeun'
import { analyzeAdvancedSaju, type AdvancedSajuAnalysis, getSibiUnseongStrength, getTongByeonDescription, getTongByeonFortune } from '@/lib/saju/advanced'
import { analyzeSeongmyeong, type SeongmyeongResult, getOggyeokDescription, getElementDescription } from '@/lib/saju/seongmyeong'
import { Sparkles, ArrowLeft, Loader2, Star, Share2, Copy, TrendingUp, BookOpen, Zap, Users, User } from 'lucide-react'

function AnalyzePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sajuResult, setSajuResult] = useState<SajuResult | null>(null)
  const [daeunResult, setDaeunResult] = useState<DaeunResult | null>(null)
  const [advancedAnalysis, setAdvancedAnalysis] = useState<AdvancedSajuAnalysis | null>(null)
  const [seongmyeongResult, setSeongmyeongResult] = useState<SeongmyeongResult | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [isCalculating, setIsCalculating] = useState(true)
  const [aiInterpretation, setAiInterpretation] = useState<string>('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // URL 파라미터에서 데이터 가져오기
    const year = parseInt(searchParams.get('year') || '0')
    const month = parseInt(searchParams.get('month') || '0')
    const day = parseInt(searchParams.get('day') || '0')
    const hour = parseInt(searchParams.get('hour') || '12')
    const minute = parseInt(searchParams.get('minute') || '0')
    const calendarType = searchParams.get('calendarType') || 'solar'
    const gender = (searchParams.get('gender') || 'male') as 'male' | 'female'
    const name = searchParams.get('name') || ''

    if (year && month && day) {
      // 클로저 문제 해결을 위한 플래그
      let calculationCompleted = false

      // 약간의 딜레이로 로딩 효과
      const timeoutId = setTimeout(() => {
        try {
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

          // 고급 이론 분석
          const advanced = analyzeAdvancedSaju(result)
          setAdvancedAnalysis(advanced)

          // 성명학 분석 (이름이 있는 경우)
          if (name && name.length >= 2) {
            setUserName(name)
            const seongmyeong = analyzeSeongmyeong(name, result)
            setSeongmyeongResult(seongmyeong)
          }

          calculationCompleted = true
          setIsCalculating(false)
        } catch (err) {
          console.error('사주 계산 오류:', err)
          setError('사주 계산 중 오류가 발생했습니다. 입력값을 확인해주세요.')
          calculationCompleted = true
          setIsCalculating(false)
        }
      }, 1500)

      // 타임아웃 설정 (15초) - 클로저 플래그로 체크
      const maxTimeoutId = setTimeout(() => {
        if (!calculationCompleted) {
          setError('사주 계산이 너무 오래 걸리고 있습니다. 다시 시도해주세요.')
          setIsCalculating(false)
        }
      }, 15000)

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(maxTimeoutId)
      }
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
          <div className="mt-6 text-sm text-purple-300">
            잠시만 기다려 주세요 (최대 10초)
          </div>
        </div>
      </div>
    )
  }

  // 에러 화면
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">오류가 발생했습니다</h2>
            <p className="text-purple-200 mb-6">{error}</p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl"
              >
                <ArrowLeft size={18} className="mr-2" />
                처음으로 돌아가기
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-medium py-3 rounded-xl"
              >
                다시 시도하기
              </Button>
            </div>
            <div className="mt-6 text-sm text-purple-300">
              <p>문제가 계속되면 다음을 확인해주세요:</p>
              <ul className="mt-2 text-left space-y-1 text-xs">
                <li>• 생년월일이 올바른지 확인</li>
                <li>• 음력/양력 선택이 정확한지 확인</li>
                <li>• 브라우저를 새로고침 후 재시도</li>
              </ul>
            </div>
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

        {/* 성명학 분석 */}
        {seongmyeongResult && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="text-pink-300" />
              성명학 분석 (姓名學)
            </h2>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-purple-200 mb-2">이름의 획수와 오행을 분석하여 운명을 풀이합니다.</p>
                  <div className="text-3xl font-bold text-white">
                    {seongmyeongResult.name}
                    <span className="text-lg text-purple-300 ml-3">
                      (총 {seongmyeongResult.strokes.total}획)
                    </span>
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: getElementColor(seongmyeongResult.element) + '30' }}>
                  <div className="text-3xl font-bold text-white">{seongmyeongResult.element}</div>
                  <div className="text-sm text-purple-200">주요 오행</div>
                </div>
              </div>

              {/* 사주-이름 궁합 */}
              {seongmyeongResult.compatibility && (
                <div className="mb-6 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-300/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-pink-200 mb-1">사주-이름 궁합</h3>
                      <p className="text-purple-200 text-sm">{seongmyeongResult.compatibility.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">{seongmyeongResult.compatibility.score}점</div>
                      <div className="text-xs text-pink-200">/ 100점</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 오격 분석 */}
              <h3 className="text-lg font-bold text-white mb-4">오격 분석 (五格)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                {[
                  { name: '천격', data: seongmyeongResult.oggyeok.cheongyeok, emoji: '🌌' },
                  { name: '인격', data: seongmyeongResult.oggyeok.ingyeok, emoji: '👤' },
                  { name: '지격', data: seongmyeongResult.oggyeok.jigyeok, emoji: '🌍' },
                  { name: '외격', data: seongmyeongResult.oggyeok.oegyeok, emoji: '🌐' },
                  { name: '총격', data: seongmyeongResult.oggyeok.chonggyeok, emoji: '⭐' },
                ].map(({ name, data, emoji }) => (
                  <div key={name} className="p-4 bg-white/5 rounded-xl text-center">
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-sm text-purple-200 mb-1">{name}</div>
                    <div className="text-2xl font-bold text-white mb-1">{data.strokes}획</div>
                    <div className="text-sm mb-1" style={{ color: getElementColor(data.element) }}>
                      {data.element} ({data.yinYang})
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                      data.fortune === '대길' ? 'bg-green-500/30 text-green-200' :
                      data.fortune === '길' ? 'bg-blue-500/30 text-blue-200' :
                      data.fortune === '반길' ? 'bg-yellow-500/30 text-yellow-200' :
                      data.fortune === '흉' ? 'bg-orange-500/30 text-orange-200' :
                      'bg-red-500/30 text-red-200'
                    }`}>
                      {data.fortune}
                    </div>
                  </div>
                ))}
              </div>

              {/* 해석 */}
              <div className="p-4 bg-purple-500/10 rounded-xl">
                <h4 className="text-sm font-bold text-purple-200 mb-2">종합 해석</h4>
                <p className="text-white">{seongmyeongResult.interpretation}</p>
              </div>
            </div>
          </div>
        )}

        {/* 십이운성 분석 */}
        {advancedAnalysis && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-blue-300" />
              십이운성 분석 (十二運星)
            </h2>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <p className="text-purple-200 mb-6">생명의 12가지 주기로 각 기둥의 에너지를 분석합니다.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: '년주', unseong: advancedAnalysis.sibiunseong.year, desc: advancedAnalysis.sibiunseong.descriptions.year, emoji: '📅' },
                  { title: '월주', unseong: advancedAnalysis.sibiunseong.month, desc: advancedAnalysis.sibiunseong.descriptions.month, emoji: '🌙' },
                  { title: '일주', unseong: advancedAnalysis.sibiunseong.day, desc: advancedAnalysis.sibiunseong.descriptions.day, emoji: '☀️' },
                  { title: '시주', unseong: advancedAnalysis.sibiunseong.hour, desc: advancedAnalysis.sibiunseong.descriptions.hour, emoji: '🕐' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/20">
                    <div className="text-2xl text-center mb-2">{item.emoji}</div>
                    <div className="text-purple-200 text-sm text-center mb-2">{item.title}</div>
                    <div className="text-2xl font-bold text-white text-center mb-2">{item.unseong}</div>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < getSibiUnseongStrength(item.unseong)
                              ? 'bg-blue-400'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-purple-100 text-center">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 신살 분석 */}
        {advancedAnalysis && advancedAnalysis.sinsal.sinsals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="text-purple-300" />
              신살 분석 (神殺)
            </h2>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <p className="text-purple-200">사주에 있는 길신과 흉살을 분석합니다.</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-300">길신: {advancedAnalysis.sinsal.summary.goodCount}개</span>
                  <span className="text-red-300">흉살: {advancedAnalysis.sinsal.summary.badCount}개</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedAnalysis.sinsal.sinsals.map((sinsal, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-2 ${
                      sinsal.isGood
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-red-500/10 border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-bold ${sinsal.isGood ? 'text-green-300' : 'text-red-300'}`}>
                        {sinsal.name}
                      </h3>
                      <div className="text-sm text-purple-200">
                        {sinsal.position.join(', ')}
                      </div>
                    </div>
                    <p className="text-sm text-purple-100">{sinsal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 통변성 분석 */}
        {advancedAnalysis && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="text-pink-300" />
              통변성 분석 (通變星 - 十神)
            </h2>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <p className="text-purple-200 mb-6">일간과 다른 간지의 오행 관계로 성격과 재능을 분석합니다.</p>

              {/* 통변성 분포 */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">통변성 분포</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(advancedAnalysis.tongbyeon.summary)
                    .filter(([_, count]) => count > 0)
                    .sort(([_, a], [__, b]) => b - a)
                    .map(([tb, count]) => (
                      <div
                        key={tb}
                        className={`p-4 rounded-xl text-center ${
                          advancedAnalysis.tongbyeon.dominant.includes(tb as any)
                            ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500'
                            : 'bg-white/5 border border-white/20'
                        }`}
                      >
                        <div className="text-2xl font-bold text-white mb-1">{tb}</div>
                        <div className="text-3xl font-bold text-pink-300 mb-1">{count}</div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          getTongByeonFortune(tb as any) === '길'
                            ? 'bg-green-500/30 text-green-300'
                            : getTongByeonFortune(tb as any) === '흉'
                            ? 'bg-red-500/30 text-red-300'
                            : 'bg-gray-500/30 text-gray-300'
                        }`}>
                          {getTongByeonFortune(tb as any)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 우세한 통변성 해석 */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-300 mb-3">주요 성향</h3>
                {advancedAnalysis.tongbyeon.dominant.map((tb, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="text-xl font-bold text-white mb-1">{tb}</div>
                    <div className="text-purple-100 text-sm">{getTongByeonDescription(tb)}</div>
                  </div>
                ))}
              </div>

              {/* 각 기둥별 통변성 */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-white mb-4">기둥별 통변성</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { title: '년주', stem: advancedAnalysis.tongbyeon.year.stem, branch: advancedAnalysis.tongbyeon.year.branch },
                    { title: '월주', stem: advancedAnalysis.tongbyeon.month.stem, branch: advancedAnalysis.tongbyeon.month.branch },
                    { title: '일주', stem: advancedAnalysis.tongbyeon.day.stem, branch: advancedAnalysis.tongbyeon.day.branch },
                    { title: '시주', stem: advancedAnalysis.tongbyeon.hour.stem, branch: advancedAnalysis.tongbyeon.hour.branch },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/20">
                      <div className="text-purple-200 text-sm text-center mb-2">{item.title}</div>
                      <div className="text-white text-center">
                        <div className="text-sm">천간: {item.stem}</div>
                        <div className="text-sm">지지: {item.branch}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

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

                  {/* 고급 이론 정보 */}
                  {daeunResult.currentPeriod.advanced && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-green-200 mb-1">십이운성</div>
                        <div className="text-lg font-bold text-white">{daeunResult.currentPeriod.advanced.sibiunseong.stem}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-green-200 mb-1">통변성</div>
                        <div className="text-lg font-bold text-white">{daeunResult.currentPeriod.advanced.tongbyeon.stem}</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-green-200 mb-1">에너지</div>
                        <div className={`text-lg font-bold ${
                          daeunResult.currentPeriod.advanced.energy === '강' ? 'text-green-300' :
                          daeunResult.currentPeriod.advanced.energy === '약' ? 'text-orange-300' :
                          'text-yellow-300'
                        }`}>
                          {daeunResult.currentPeriod.advanced.energy}
                        </div>
                      </div>
                    </div>
                  )}

                  {daeunResult.currentPeriod.advanced && (
                    <div className="mt-3 p-3 bg-green-500/10 rounded-lg">
                      <div className="text-sm text-green-100">{daeunResult.currentPeriod.advanced.interaction}</div>
                    </div>
                  )}
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
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl font-bold text-white">
                      {daeunResult.nextPeriod.heavenlyStem}{daeunResult.nextPeriod.earthlyBranch}
                    </div>
                    <div className="text-purple-100">
                      {daeunResult.nextPeriod.description}
                    </div>
                  </div>

                  {daeunResult.nextPeriod.advanced && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-purple-200">
                        {daeunResult.nextPeriod.advanced.sibiunseong.stem} · {daeunResult.nextPeriod.advanced.tongbyeon.stem} · 에너지 {daeunResult.nextPeriod.advanced.energy}
                      </span>
                    </div>
                  )}
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
