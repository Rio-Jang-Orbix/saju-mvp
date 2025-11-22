'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Sparkles, Star, Moon, Sun, Heart, TrendingUp, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

// 필드별 오류 타입
interface FieldErrors {
  name?: string
  year?: string
  month?: string
  day?: string
  hour?: string
  minute?: string
}

export default function HomePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: ''
  })
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 개별 필드 검증 함수
  const validateField = useCallback((field: string, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (value && value.length > 0) {
          if (value.length < 2) return '최소 2글자 이상'
          if (value.length > 10) return '10글자 이내로 입력'
          if (!/^[가-힣]+$/.test(value)) return '한글만 입력 가능'
        }
        break
      case 'year':
        if (value) {
          const year = parseInt(value)
          if (isNaN(year)) return '숫자만 입력'
          if (year < 1900) return '1900년 이후'
          if (year > new Date().getFullYear()) return '미래 년도 불가'
        }
        break
      case 'month':
        if (value) {
          const month = parseInt(value)
          if (isNaN(month)) return '숫자만 입력'
          if (month < 1 || month > 12) return '1~12 입력'
        }
        break
      case 'day':
        if (value) {
          const day = parseInt(value)
          const year = parseInt(birthDate.year) || new Date().getFullYear()
          const month = parseInt(birthDate.month) || 1
          const maxDays = new Date(year, month, 0).getDate()
          if (isNaN(day)) return '숫자만 입력'
          if (day < 1 || day > maxDays) return `1~${maxDays} 입력`
        }
        break
      case 'hour':
        if (value) {
          const hour = parseInt(value)
          if (isNaN(hour)) return '숫자만 입력'
          if (hour < 0 || hour > 23) return '0~23 입력'
        }
        break
      case 'minute':
        if (value) {
          const minute = parseInt(value)
          if (isNaN(minute)) return '숫자만 입력'
          if (minute < 0 || minute > 59) return '0~59 입력'
        }
        break
    }
    return undefined
  }, [birthDate.year, birthDate.month])

  // 필드 변경 핸들러 (실시간 검증)
  const handleFieldChange = (field: string, value: string) => {
    // 값 업데이트
    if (field === 'name') {
      setName(value)
    } else {
      setBirthDate(prev => ({ ...prev, [field]: value }))
    }

    // 실시간 검증
    const error = validateField(field, value)
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  // 전체 폼 검증
  const validateForm = (): boolean => {
    const errors: FieldErrors = {}
    let hasError = false

    // 필수 필드 검증
    if (!birthDate.year) {
      errors.year = '년도 필수'
      hasError = true
    } else {
      const yearError = validateField('year', birthDate.year)
      if (yearError) {
        errors.year = yearError
        hasError = true
      }
    }

    if (!birthDate.month) {
      errors.month = '월 필수'
      hasError = true
    } else {
      const monthError = validateField('month', birthDate.month)
      if (monthError) {
        errors.month = monthError
        hasError = true
      }
    }

    if (!birthDate.day) {
      errors.day = '일 필수'
      hasError = true
    } else {
      const dayError = validateField('day', birthDate.day)
      if (dayError) {
        errors.day = dayError
        hasError = true
      }
    }

    // 선택 필드 검증
    if (name) {
      const nameError = validateField('name', name)
      if (nameError) {
        errors.name = nameError
        hasError = true
      }
    }

    if (birthDate.hour) {
      const hourError = validateField('hour', birthDate.hour)
      if (hourError) {
        errors.hour = hourError
        hasError = true
      }
    }

    if (birthDate.minute) {
      const minuteError = validateField('minute', birthDate.minute)
      if (minuteError) {
        errors.minute = minuteError
        hasError = true
      }
    }

    setFieldErrors(errors)
    return !hasError
  }

  const handleAnalyze = () => {
    // 전체 폼 검증
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // 분석 페이지로 이동 (쿼리 파라미터로 데이터 전달)
    const params = new URLSearchParams({
      year: birthDate.year,
      month: birthDate.month,
      day: birthDate.day,
      hour: birthDate.hour || '12',
      minute: birthDate.minute || '0',
      calendarType,
      gender,
      name: name.trim() || ''
    })

    router.push(`/analyze?${params.toString()}`)
  }

  // 입력 필드에 오류가 있는지 확인
  const hasErrors = Object.values(fieldErrors).some(error => error)
  const isFormValid = birthDate.year && birthDate.month && birthDate.day && !hasErrors

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
            {/* 이름 입력 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3 flex items-center gap-2">
                <span className="text-lg">✨</span>
                이름 (성명학 분석용)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 text-lg ${
                    fieldErrors.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/30 focus:border-pink-400'
                  }`}
                />
                {fieldErrors.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-400">
                    <AlertCircle size={16} />
                    <span className="text-xs">{fieldErrors.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-purple-200 mt-2 opacity-80">
                * 한글 이름을 입력하시면 성명학 분석도 함께 제공됩니다
              </p>
            </div>

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
                생년월일 <span className="text-pink-300">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="년 (예: 1990)"
                    value={birthDate.year}
                    onChange={(e) => handleFieldChange('year', e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 ${
                      fieldErrors.year
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-white/30 focus:border-pink-400'
                    }`}
                    min="1900"
                    max="2100"
                  />
                  {fieldErrors.year && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      {fieldErrors.year}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="월 (1-12)"
                    value={birthDate.month}
                    onChange={(e) => handleFieldChange('month', e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 ${
                      fieldErrors.month
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-white/30 focus:border-pink-400'
                    }`}
                    min="1"
                    max="12"
                  />
                  {fieldErrors.month && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      {fieldErrors.month}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="일 (1-31)"
                    value={birthDate.day}
                    onChange={(e) => handleFieldChange('day', e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 ${
                      fieldErrors.day
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-white/30 focus:border-pink-400'
                    }`}
                    min="1"
                    max="31"
                  />
                  {fieldErrors.day && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      {fieldErrors.day}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 시간 입력 (선택사항) */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-purple-100 mb-3 flex items-center gap-2">
                <Clock className="inline-block" size={18} />
                태어난 시간 (선택사항)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="시 (0-23)"
                    value={birthDate.hour}
                    onChange={(e) => handleFieldChange('hour', e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 ${
                      fieldErrors.hour
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-white/30 focus:border-pink-400'
                    }`}
                    min="0"
                    max="23"
                  />
                  {fieldErrors.hour && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      {fieldErrors.hour}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="분 (0-59)"
                    value={birthDate.minute}
                    onChange={(e) => handleFieldChange('minute', e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 focus:outline-none text-center text-white placeholder-purple-200 transition-all hover:bg-white/30 focus:bg-white/30 ${
                      fieldErrors.minute
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-white/30 focus:border-pink-400'
                    }`}
                    min="0"
                    max="59"
                  />
                  {fieldErrors.minute && (
                    <div className="absolute -bottom-5 left-0 right-0 text-center text-red-400 text-xs flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      {fieldErrors.minute}
                    </div>
                  )}
                </div>
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
              disabled={isSubmitting || hasErrors}
              className={`w-full py-7 px-8 rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 transform border-2 border-white/30 ${
                isSubmitting || hasErrors
                  ? 'bg-gray-500 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 hover:shadow-pink-500/50 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 active:shadow-inner'
              }`}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 animate-spin" size={28} />
                  분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 animate-pulse" size={28} />
                  사주 분석 시작하기
                  <Sparkles className="ml-3 animate-pulse" size={28} />
                </>
              )}
            </Button>

            {hasErrors && (
              <p className="text-center text-sm text-red-400 mt-4 flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                입력값을 확인해주세요
              </p>
            )}

            <p className="text-center text-sm text-purple-200 mt-6 opacity-80">
              ⭐ 무료 기본 분석 제공 · 프리미엄 상세 해석 이용 가능 ⭐
            </p>
          </div>

          {/* 추가 기능 */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 mb-6">
              다른 기능 둘러보기
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 궁합 분석 */}
              <Link href="/compatibility">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="inline text-pink-300" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-pink-200 mb-3">궁합 분석</h3>
                  <p className="text-purple-200 text-sm mb-4">
                    두 사람의 사주팔자로 궁합을 알아보세요. 천간지지 조화도와 오행 분석으로 관계를 진단합니다.
                  </p>
                  <div className="flex items-center gap-2 text-pink-300 text-sm font-semibold">
                    <span>분석하기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              {/* 월운/일운 */}
              <Link href="/fortune">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="inline text-purple-300" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-200 mb-3">월운 · 일운</h3>
                  <p className="text-purple-200 text-sm mb-4">
                    이번 달과 오늘의 운세를 확인하세요. 나의 사주와 오늘의 운을 분석합니다.
                  </p>
                  <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold">
                    <span>확인하기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </div>
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
