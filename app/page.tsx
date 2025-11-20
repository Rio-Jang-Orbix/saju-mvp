'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Sparkles, Star, Moon, Sun } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: ''
  })
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')
  const [gender, setGender] = useState<'male' | 'female'>('male')

  const handleAnalyze = () => {
    // 입력 검증
    if (!birthDate.year || !birthDate.month || !birthDate.day) {
      alert('생년월일을 입력해주세요.')
      return
    }

    // 분석 페이지로 이동 (쿼리 파라미터로 데이터 전달)
    const params = new URLSearchParams({
      year: birthDate.year,
      month: birthDate.month,
      day: birthDate.day,
      hour: birthDate.hour || '12',
      minute: birthDate.minute || '0',
      calendarType,
      gender
    })

    router.push(`/analyze?${params.toString()}`)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <Star className="text-yellow-200 opacity-60" size={4 + Math.random() * 8} />
          </div>
        ))}

        {/* Cosmic Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Header with Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-6">
              <div className="text-8xl mb-4 animate-float">🔮</div>
              <div className="absolute -top-4 -right-4 animate-spin-slow">
                <Sparkles className="text-yellow-300" size={32} />
              </div>
              <div className="absolute -bottom-2 -left-4 animate-pulse">
                <Moon className="text-purple-300" size={28} />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 mb-4 drop-shadow-2xl animate-slide-up">
              사주팔자 분석
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 font-light animate-slide-up animation-delay-200">
              ✨ AI가 해석하는 나의 운명 ✨
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-pink-200 animate-slide-up animation-delay-400">
              <Sun className="animate-spin-slow" size={20} />
              <span className="text-sm">천간지지로 풀어보는 당신의 이야기</span>
              <Moon className="animate-pulse" size={20} />
            </div>
          </div>

          {/* Input Form with Glass Effect */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 animate-slide-up animation-delay-600">
            {/* 양력/음력 선택 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3 flex items-center gap-2">
                <Calendar className="inline-block" size={18} />
                달력 종류
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setCalendarType('solar')}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    calendarType === 'solar'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-pink-500/50 scale-105'
                      : 'bg-white/10 text-purple-100 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <Sun className="inline-block mr-2" size={20} />
                  양력
                </button>
                <button
                  onClick={() => setCalendarType('lunar')}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    calendarType === 'lunar'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-105'
                      : 'bg-white/10 text-purple-100 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <Moon className="inline-block mr-2" size={20} />
                  음력
                </button>
              </div>
            </div>

            {/* 생년월일 입력 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                생년월일
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="년 (예: 1990)"
                  value={birthDate.year}
                  onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
                  className="px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-pink-400 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30"
                  min="1900"
                  max="2100"
                />
                <input
                  type="number"
                  placeholder="월 (1-12)"
                  value={birthDate.month}
                  onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
                  className="px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-pink-400 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  placeholder="일 (1-31)"
                  value={birthDate.day}
                  onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
                  className="px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-pink-400 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30"
                  min="1"
                  max="31"
                />
              </div>
            </div>

            {/* 시간 입력 (선택사항) */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3 flex items-center gap-2">
                <Clock className="inline-block" size={18} />
                태어난 시간 (선택사항)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="시 (0-23)"
                  value={birthDate.hour}
                  onChange={(e) => setBirthDate({ ...birthDate, hour: e.target.value })}
                  className="px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-pink-400 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30"
                  min="0"
                  max="23"
                />
                <input
                  type="number"
                  placeholder="분 (0-59)"
                  value={birthDate.minute}
                  onChange={(e) => setBirthDate({ ...birthDate, minute: e.target.value })}
                  className="px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 focus:border-pink-400 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30"
                  min="0"
                  max="59"
                />
              </div>
              <p className="text-xs text-purple-200 mt-2 opacity-80">
                * 정확한 시간을 모르시면 비워두셔도 됩니다 (정오 12시로 계산됩니다)
              </p>
            </div>

            {/* 성별 선택 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3">
                성별
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    gender === 'male'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'bg-white/10 text-purple-100 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  ♂ 남성
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    gender === 'female'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50 scale-105'
                      : 'bg-white/10 text-purple-100 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  ♀ 여성
                </button>
              </div>
            </div>

            {/* 분석 시작 버튼 */}
            <Button
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white py-7 px-8 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/30"
              size="lg"
            >
              <Sparkles className="mr-3 animate-pulse" size={28} />
              사주 분석 시작하기
              <Sparkles className="ml-3 animate-pulse" size={28} />
            </Button>

            <p className="text-center text-sm text-purple-200 mt-6 opacity-80">
              ⭐ 무료 기본 분석 제공 · 프리미엄 상세 해석 이용 가능 ⭐
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-purple-200 animate-fade-in animation-delay-800">
            <p className="text-sm flex items-center justify-center gap-2">
              <Star className="text-yellow-300 animate-pulse" size={16} />
              전통 사주팔자 이론과 AI 기술의 만남
              <Star className="text-yellow-300 animate-pulse" size={16} />
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
