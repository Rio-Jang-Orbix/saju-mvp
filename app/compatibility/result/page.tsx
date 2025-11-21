'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { calculateCompatibility } from '@/lib/saju/compatibility'
import { Heart, Users, TrendingUp, TrendingDown, Lightbulb, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

function CompatibilityResultContent() {
  const searchParams = useSearchParams()

  const compatibility = useMemo(() => {
    const person1 = {
      name: searchParams.get('name1') || '첫 번째 사람',
      year: parseInt(searchParams.get('year1') || '1990'),
      month: parseInt(searchParams.get('month1') || '1'),
      day: parseInt(searchParams.get('day1') || '1'),
      hour: parseInt(searchParams.get('hour1') || '0'),
      minute: parseInt(searchParams.get('minute1') || '0'),
      gender: (searchParams.get('gender1') || 'male') as 'male' | 'female',
      isLunar: searchParams.get('isLunar1') === 'true',
    }

    const person2 = {
      name: searchParams.get('name2') || '두 번째 사람',
      year: parseInt(searchParams.get('year2') || '1992'),
      month: parseInt(searchParams.get('month2') || '1'),
      day: parseInt(searchParams.get('day2') || '1'),
      hour: parseInt(searchParams.get('hour2') || '0'),
      minute: parseInt(searchParams.get('minute2') || '0'),
      gender: (searchParams.get('gender2') || 'female') as 'male' | 'female',
      isLunar: searchParams.get('isLunar2') === 'true',
    }

    return { result: calculateCompatibility({ person1, person2 }), person1, person2 }
  }, [searchParams])

  const { result, person1, person2 } = compatibility

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500'
    if (score >= 60) return 'from-blue-400 to-cyan-500'
    if (score >= 40) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-pink-500'
  }

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '💖'
    if (score >= 60) return '💕'
    if (score >= 40) return '💛'
    return '💙'
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <div className="relative min-h-screen p-4 sm:p-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/compatibility"
          className="inline-flex items-center gap-2 text-pink-200 hover:text-pink-100 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full mb-8"
        >
          <ArrowLeft size={20} />
          <span>다시 분석하기</span>
        </Link>

        {/* 헤더 */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4 animate-float">
            <Heart className="inline text-pink-300" size={80} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            {person1.name} ❤️ {person2.name}
          </h1>
          <p className="text-lg text-purple-200">궁합 분석 결과</p>
        </div>

        {/* 종합 점수 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            <div className="text-6xl mb-4">{getScoreEmoji(result.score)}</div>
            <div className="text-8xl font-bold mb-4 bg-gradient-to-r {getScoreColor(result.score)} bg-clip-text text-transparent">
              {result.score}점
            </div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-6">
              <div
                className={`h-full bg-gradient-to-r ${getScoreColor(result.score)} transition-all duration-1000`}
                style={{ width: `${result.score}%` }}
              />
            </div>
            <p className="text-xl text-purple-200">
              {result.score >= 80 && '매우 잘 맞는 궁합입니다!'}
              {result.score >= 60 && result.score < 80 && '좋은 궁합입니다'}
              {result.score >= 40 && result.score < 60 && '보통 궁합입니다'}
              {result.score < 40 && '노력이 필요한 관계입니다'}
            </p>
          </div>
        </div>

        {/* 상세 조화도 */}
        <div className="max-w-6xl mx-auto mb-12 grid md:grid-cols-3 gap-6">
          {/* 천간 조화도 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-pink-200 mb-4 flex items-center gap-2">
              <Users size={24} />
              천간 조화도
            </h3>
            <div className="text-5xl font-bold text-white mb-2">
              {result.harmony.heavenlyStem}점
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-1000"
                style={{ width: `${result.harmony.heavenlyStem}%` }}
              />
            </div>
            <p className="text-sm text-purple-200 mt-3">
              가치관과 성격의 조화
            </p>
          </div>

          {/* 지지 조화도 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
              <Heart size={24} />
              지지 조화도
            </h3>
            <div className="text-5xl font-bold text-white mb-2">
              {result.harmony.earthlyBranch}점
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-1000"
                style={{ width: `${result.harmony.earthlyBranch}%` }}
              />
            </div>
            <p className="text-sm text-purple-200 mt-3">
              생활 습관과 리듬의 조화
            </p>
          </div>

          {/* 오행 조화도 */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-indigo-200 mb-4 flex items-center gap-2">
              <TrendingUp size={24} />
              오행 조화도
            </h3>
            <div className="text-5xl font-bold text-white mb-2">
              {result.harmony.elements}점
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-cyan-500 transition-all duration-1000"
                style={{ width: `${result.harmony.elements}%` }}
              />
            </div>
            <p className="text-sm text-purple-200 mt-3">
              오행 균형과 보완성
            </p>
          </div>
        </div>

        {/* 강점 */}
        {result.strengths.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
                <TrendingUp size={32} />
                강점
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((strength, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-purple-100 bg-white/5 p-4 rounded-xl"
                  >
                    <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 약점 */}
        {result.weaknesses.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-orange-300 mb-6 flex items-center gap-3">
                <TrendingDown size={32} />
                약점 및 주의사항
              </h3>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-purple-100 bg-white/5 p-4 rounded-xl"
                  >
                    <span className="text-orange-400 text-xl flex-shrink-0">⚠</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 조언 */}
        {result.advice.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                <Lightbulb size={32} />
                조언
              </h3>
              <ul className="space-y-3">
                {result.advice.map((adv, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-purple-100 bg-white/5 p-4 rounded-xl"
                  >
                    <span className="text-yellow-400 text-xl flex-shrink-0">💡</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 관계 상세 */}
        {result.relationships.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-3">
                <Heart size={32} />
                관계 분석
              </h3>
              <div className="space-y-3">
                {result.relationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl ${
                      rel.type === 'harmony'
                        ? 'bg-green-500/10 border border-green-500/30'
                        : rel.type === 'generation'
                        ? 'bg-blue-500/10 border border-blue-500/30'
                        : rel.type === 'conflict'
                        ? 'bg-red-500/10 border border-red-500/30'
                        : rel.type === 'control'
                        ? 'bg-orange-500/10 border border-orange-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">
                        {rel.type === 'harmony' && '💚'}
                        {rel.type === 'generation' && '💙'}
                        {rel.type === 'conflict' && '💔'}
                        {rel.type === 'control' && '⚡'}
                        {rel.type === 'neutral' && '⚪'}
                      </span>
                      <div>
                        <div className="text-purple-100 font-medium">{rel.description}</div>
                        <div className="text-sm text-purple-300 mt-1">
                          위치: {rel.pillars.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 공유 버튼 */}
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => {
              const text = `${person1.name}님과 ${person2.name}님의 궁합 점수는 ${result.score}점입니다! 🔮`
              if (navigator.share) {
                navigator.share({ title: '궁합 분석 결과', text })
              } else {
                navigator.clipboard.writeText(text)
                alert('클립보드에 복사되었습니다!')
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
          >
            <Share2 size={20} />
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CompatibilityResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
        <div className="text-white text-2xl">분석 중...</div>
      </div>
    }>
      <CompatibilityResultContent />
    </Suspense>
  )
}
