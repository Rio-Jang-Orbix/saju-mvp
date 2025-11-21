'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Star, Moon, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CompatibilityPage() {
  const router = useRouter()
  const [calendarType1, setCalendarType1] = useState<'solar' | 'lunar'>('solar')
  const [calendarType2, setCalendarType2] = useState<'solar' | 'lunar'>('solar')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const params = new URLSearchParams({
      // 첫 번째 사람
      name1: formData.get('name1') as string,
      year1: formData.get('year1') as string,
      month1: formData.get('month1') as string,
      day1: formData.get('day1') as string,
      hour1: formData.get('hour1') as string,
      minute1: formData.get('minute1') as string,
      gender1: formData.get('gender1') as string,
      isLunar1: calendarType1 === 'lunar' ? 'true' : 'false',
      // 두 번째 사람
      name2: formData.get('name2') as string,
      year2: formData.get('year2') as string,
      month2: formData.get('month2') as string,
      day2: formData.get('day2') as string,
      hour2: formData.get('hour2') as string,
      minute2: formData.get('minute2') as string,
      gender2: formData.get('gender2') as string,
      isLunar2: calendarType2 === 'lunar' ? 'true' : 'false',
    })

    router.push(`/compatibility/result?${params.toString()}`)
  }

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

      {/* 움직이는 배경 효과 */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-pink-200 hover:text-pink-100 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />
          <span>홈으로</span>
        </Link>

        {/* 헤더 */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="text-6xl sm:text-8xl mb-4 animate-float">
            <Heart className="inline text-pink-300" size={80} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            궁합 분석
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 mb-2">
            두 사람의 사주팔자로 궁합을 알아보세요
          </p>
          <p className="text-sm sm:text-base text-purple-300">
            천간지지 조화도와 오행 분석으로 관계를 진단합니다
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 첫 번째 사람 */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <Moon className="text-pink-300" size={32} />
                <h2 className="text-2xl font-bold text-pink-200">첫 번째 사람</h2>
              </div>

              <div className="space-y-4">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    이름 (선택)
                  </label>
                  <input
                    type="text"
                    name="name1"
                    placeholder="이름을 입력하세요"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50 backdrop-blur-sm"
                  />
                </div>

                {/* 양력/음력 선택 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarType1('solar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType1 === 'solar'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    ☀️ 양력
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarType1('lunar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType1 === 'lunar'
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
                      name="year1"
                      required
                      min="1900"
                      max="2100"
                      placeholder="1990"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      월
                    </label>
                    <input
                      type="number"
                      name="month1"
                      required
                      min="1"
                      max="12"
                      placeholder="3"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      일
                    </label>
                    <input
                      type="number"
                      name="day1"
                      required
                      min="1"
                      max="31"
                      placeholder="15"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
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
                      name="hour1"
                      required
                      min="0"
                      max="23"
                      placeholder="14"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      분
                    </label>
                    <input
                      type="number"
                      name="minute1"
                      required
                      min="0"
                      max="59"
                      placeholder="30"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                    />
                  </div>
                </div>

                {/* 성별 */}
                <div className="flex gap-3">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="gender1"
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
                      name="gender1"
                      value="female"
                      required
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-center font-semibold text-purple-200 cursor-pointer transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-rose-500 peer-checked:text-white peer-checked:border-pink-400 hover:bg-white/20">
                      👩 여성
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* 두 번째 사람 */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 animate-slide-up animation-delay-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-purple-300" size={32} />
                <h2 className="text-2xl font-bold text-purple-200">두 번째 사람</h2>
              </div>

              <div className="space-y-4">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    이름 (선택)
                  </label>
                  <input
                    type="text"
                    name="name2"
                    placeholder="이름을 입력하세요"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm"
                  />
                </div>

                {/* 양력/음력 선택 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarType2('solar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType2 === 'solar'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-white/10 text-purple-200 hover:bg-white/20'
                    }`}
                  >
                    ☀️ 양력
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarType2('lunar')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      calendarType2 === 'lunar'
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
                      name="year2"
                      required
                      min="1900"
                      max="2100"
                      placeholder="1992"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      월
                    </label>
                    <input
                      type="number"
                      name="month2"
                      required
                      min="1"
                      max="12"
                      placeholder="7"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      일
                    </label>
                    <input
                      type="number"
                      name="day2"
                      required
                      min="1"
                      max="31"
                      placeholder="23"
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
                      name="hour2"
                      required
                      min="0"
                      max="23"
                      placeholder="9"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      분
                    </label>
                    <input
                      type="number"
                      name="minute2"
                      required
                      min="0"
                      max="59"
                      placeholder="45"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>

                {/* 성별 */}
                <div className="flex gap-3">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="gender2"
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
                      name="gender2"
                      value="female"
                      required
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-center font-semibold text-purple-200 cursor-pointer transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-rose-500 peer-checked:text-white peer-checked:border-pink-400 hover:bg-white/20">
                      👩 여성
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 animate-pulse-slow"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Heart size={28} />
                궁합 분석하기
                <Sparkles size={28} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </form>

        {/* 푸터 */}
        <div className="mt-12 text-center text-purple-300 text-sm animate-fade-in animation-delay-1000">
          <p>사주팔자 기반 궁합 분석으로 두 사람의 관계를 알아보세요</p>
        </div>
      </div>
    </div>
  )
}
