'use client'

import { useState } from 'react'
import { calculateSaju } from '@/lib/saju/calculator'
import type { SajuResult } from '@/lib/saju/calculator'
import { generateFortuneCalendar } from '@/lib/saju/fortune'
import type { FortuneCalendar } from '@/lib/saju/fortune'
import { Calendar, Moon, Sun, TrendingUp, ArrowLeft, Star, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function FortunePage() {
  const [calendar, setCalendar] = useState<FortuneCalendar | null>(null)
  const [sajuResult, setSajuResult] = useState<SajuResult | null>(null)
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')
  const [showForm, setShowForm] = useState(true)
  const [aiInterpretation, setAiInterpretation] = useState<string>('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const year = parseInt(formData.get('year') as string)
    const month = parseInt(formData.get('month') as string)
    const day = parseInt(formData.get('day') as string)
    const hour = parseInt(formData.get('hour') as string)
    const minute = parseInt(formData.get('minute') as string)
    const gender = formData.get('gender') as 'male' | 'female'

    const saju = calculateSaju(year, month, day, hour, minute, calendarType === 'lunar', gender)
    const fortuneCalendar = generateFortuneCalendar(saju)
    setSajuResult(saju)
    setCalendar(fortuneCalendar)
    setShowForm(false)
  }

  const handleAIInterpretation = async () => {
    if (!calendar || !sajuResult) return

    setIsLoadingAI(true)
    try {
      const response = await fetch('/api/interpret-fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fortuneCalendar: calendar,
          sajuResult: sajuResult,
        }),
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

  const getCompatibilityColor = (compatibility: string) => {
    if (compatibility === 'excellent') return 'from-green-400 to-emerald-500'
    if (compatibility === 'good') return 'from-blue-400 to-cyan-500'
    if (compatibility === 'normal') return 'from-purple-400 to-indigo-500'
    if (compatibility === 'caution') return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-pink-500'
  }

  const getCompatibilityEmoji = (compatibility: string) => {
    if (compatibility === 'excellent') return '⭐'
    if (compatibility === 'good') return '✨'
    if (compatibility === 'normal') return '⚪'
    if (compatibility === 'caution') return '⚠️'
    return '❌'
  }

  if (showForm || !calendar) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        {/* 별 배경 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star
              className="text-yellow-200 opacity-60"
              size={4 + Math.random() * 8}
            />
          </div>
        ))}

        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
          {/* 뒤로가기 버튼 */}
          <Link
            href="/"
            className="absolute top-8 left-8 flex items-center gap-2 text-purple-200 hover:text-purple-100 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={20} />
            <span>홈으로</span>
          </Link>

          {/* 헤더 */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <div className="text-6xl sm:text-8xl mb-4 animate-float">
              <Calendar className="inline text-purple-300" size={80} />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent">
              월운 · 일운
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 mb-2">
              이번 달과 오늘의 운세를 확인하세요
            </p>
            <p className="text-sm sm:text-base text-purple-300">
              나의 사주와 오늘의 운을 분석합니다
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 animate-slide-up">
              <div className="space-y-4">
                {/* 양력/음력 선택 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarType('solar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType === 'solar'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    ☀️ 양력
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarType('lunar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType === 'lunar'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    🌙 음력
                  </button>
                </div>

                {/* 생년월일 */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      년
                    </label>
                    <input
                      type="number"
                      name="year"
                      required
                      min="1900"
                      max="2100"
                      placeholder="1990"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      월
                    </label>
                    <input
                      type="number"
                      name="month"
                      required
                      min="1"
                      max="12"
                      placeholder="3"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      일
                    </label>
                    <input
                      type="number"
                      name="day"
                      required
                      min="1"
                      max="31"
                      placeholder="15"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>

                {/* 시분 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      시
                    </label>
                    <input
                      type="number"
                      name="hour"
                      required
                      min="0"
                      max="23"
                      placeholder="14"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      분
                    </label>
                    <input
                      type="number"
                      name="minute"
                      required
                      min="0"
                      max="59"
                      placeholder="30"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>

                {/* 성별 */}
                <div className="flex gap-3">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      required
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-center font-semibold text-purple-200 cursor-pointer transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500 peer-checked:text-white peer-checked:border-blue-400 hover:bg-white/20">
                      👨 남성
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      required
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-center font-semibold text-purple-200 cursor-pointer transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-rose-500 peer-checked:text-white peer-checked:border-pink-400 hover:bg-white/20">
                      👩 여성
                    </div>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Calendar size={24} />
                    운세 확인하기
                    <Sparkles size={24} />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="relative min-h-screen p-4 sm:p-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 text-purple-200 hover:text-purple-100 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={20} />
            <span>다시 입력하기</span>
          </button>
        </div>

        {/* 월운 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-purple-200 mb-6 flex items-center gap-3">
              <Moon size={36} />
              이번 달 운세
            </h2>
            <div className="bg-white/5 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-white mb-2">
                  {calendar.currentMonth.year}년 {calendar.currentMonth.month}월
                </div>
                <div className="text-2xl text-purple-200 mb-4">
                  {calendar.currentMonth.heavenlyStem}{calendar.currentMonth.earthlyBranch}
                </div>
                <div className="text-3xl font-bold text-pink-300 mb-2">
                  {calendar.currentMonth.theme}
                </div>
              </div>
              <div className="space-y-3">
                {calendar.currentMonth.advice.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-purple-100 bg-white/5 p-4 rounded-xl">
                    <span className="text-yellow-400 text-xl flex-shrink-0">💡</span>
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 오늘과 내일 */}
        <div className="max-w-6xl mx-auto mb-12 grid md:grid-cols-2 gap-6">
          {/* 오늘 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <Sun size={28} />
              오늘의 운세
            </h3>
            <div className={`bg-gradient-to-r ${getCompatibilityColor(calendar.today.compatibility)} rounded-xl p-6 mb-4`}>
              <div className="text-center">
                <div className="text-4xl mb-2">{getCompatibilityEmoji(calendar.today.compatibility)}</div>
                <div className="text-2xl font-bold text-white mb-2">
                  {calendar.today.heavenlyStem}{calendar.today.earthlyBranch}
                </div>
                <div className="text-white/90">
                  {calendar.today.date.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-sm text-purple-300 mb-1">행운의 색</div>
                <div className="text-purple-100">{calendar.today.luckyColors.join(', ')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-sm text-purple-300 mb-1">행운의 방향</div>
                <div className="text-purple-100">{calendar.today.luckyDirections.join(', ')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-purple-100">{calendar.today.advice}</div>
              </div>
            </div>
          </div>

          {/* 내일 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
              <TrendingUp size={28} />
              내일의 운세
            </h3>
            <div className={`bg-gradient-to-r ${getCompatibilityColor(calendar.tomorrow.compatibility)} rounded-xl p-6 mb-4`}>
              <div className="text-center">
                <div className="text-4xl mb-2">{getCompatibilityEmoji(calendar.tomorrow.compatibility)}</div>
                <div className="text-2xl font-bold text-white mb-2">
                  {calendar.tomorrow.heavenlyStem}{calendar.tomorrow.earthlyBranch}
                </div>
                <div className="text-white/90">
                  {calendar.tomorrow.date.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-sm text-purple-300 mb-1">행운의 색</div>
                <div className="text-purple-100">{calendar.tomorrow.luckyColors.join(', ')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-sm text-purple-300 mb-1">행운의 방향</div>
                <div className="text-purple-100">{calendar.tomorrow.luckyDirections.join(', ')}</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-purple-100">{calendar.tomorrow.advice}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 이번 주 */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-indigo-200 mb-6 flex items-center gap-3">
              <Calendar size={36} />
              이번 주 운세
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {calendar.thisWeek.map((day, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${getCompatibilityColor(day.compatibility)} rounded-xl p-4 text-center`}
                >
                  <div className="text-3xl mb-2">{getCompatibilityEmoji(day.compatibility)}</div>
                  <div className="text-white text-sm mb-1">
                    {day.date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-white font-bold text-lg">
                    {day.heavenlyStem}{day.earthlyBranch}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI 해석 */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
            <Sparkles size={36} />
            AI 운세 해석
          </h2>

          {!aiInterpretation && !isLoadingAI && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
              <p className="text-purple-200 mb-6">
                AI가 당신의 이번 달과 오늘의 운세를 더욱 상세하게 분석하여 실용적인 조언을 제공합니다.
              </p>
              <button
                onClick={handleAIInterpretation}
                className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl text-lg font-semibold inline-flex items-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles size={20} />
                AI 운세 해석 받기
              </button>
              <p className="text-purple-300 text-sm mt-4">
                * 프리미엄 기능 (무료 체험 가능)
              </p>
            </div>
          )}

          {isLoadingAI && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 text-center">
              <Loader2 className="animate-spin mx-auto mb-4 text-pink-300" size={48} />
              <p className="text-white text-lg">AI가 운세를 분석하고 있습니다...</p>
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
      </div>
    </div>
  )
}
