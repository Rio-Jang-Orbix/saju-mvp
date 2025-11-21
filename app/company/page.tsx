import Link from 'next/link'
import { Metadata } from 'next'
import { Building2, Mail, Github, Code, Sparkles, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: '회사 소개',
  description: '사주팔자 분석 서비스를 제공하는 팀을 소개합니다.',
}

export default function CompanyPage() {
  return (
    <div className="min-h-screen mz-bg py-12">
      <div className="mz-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Building2 className="text-purple-600" size={40} />
          </div>
          <h1 className="mz-heading-1 mb-4">회사 소개</h1>
          <p className="mz-body">
            AI 기술과 전통 명리학이 만나 새로운 가치를 창출합니다
          </p>
        </div>

        {/* About */}
        <div className="mz-card mb-8 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <Sparkles className="text-purple-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="mz-heading-2 mb-4">사주팔자 분석 서비스</h2>
              <div className="mz-body space-y-4">
                <p>
                  사주팔자 분석은 전통 명리학의 깊이와 현대 AI 기술의 정확성을 결합한 혁신적인
                  운세 분석 플랫폼입니다.
                </p>
                <p>
                  우리는 수천 년간 이어져 온 한국의 전통 명리학을 현대적으로 재해석하고, 최신 AI
                  기술을 접목하여 누구나 쉽고 정확하게 자신의 사주를 이해할 수 있도록 돕습니다.
                </p>
                <p className="text-sm text-gray-600 italic">
                  "전통의 가치를 지키면서도, 기술의 혁신을 통해 더 많은 사람들에게 쉽게 다가갑니다."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mz-card mb-8 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <Target className="text-pink-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="mz-heading-2 mb-4">우리의 미션</h2>
              <div className="mz-body space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">핵심 가치</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>접근성:</strong> 누구나 쉽게 사주를 확인하고 이해할 수 있도록
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span>
                        <strong>정확성:</strong> 전통 명리학 이론에 충실한 정확한 계산
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold">•</span>
                      <span>
                        <strong>혁신:</strong> AI 기술을 활용한 개인화된 해석 제공
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>투명성:</strong> 개인정보 보호와 오픈소스 정신
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mz-card mb-8 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <Code className="text-cyan-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="mz-heading-2 mb-4">주요 서비스</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🎯 정확한 사주 계산</h3>
                  <p className="text-sm text-gray-700">
                    생년월일시를 기반으로 천간지지를 정확하게 계산하여 사주팔자를 도출합니다.
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🤖 AI 기반 해석</h3>
                  <p className="text-sm text-gray-700">
                    OpenAI GPT-4를 활용하여 개인화된 상세한 운세 해석을 제공합니다.
                  </p>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">💑 궁합 분석</h3>
                  <p className="text-sm text-gray-700">
                    두 사람의 사주를 비교 분석하여 상성과 조화도를 파악합니다.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📊 대운 분석</h3>
                  <p className="text-sm text-gray-700">
                    10년 주기의 대운을 분석하여 인생의 큰 흐름을 예측합니다.
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">⭐ 고급 이론</h3>
                  <p className="text-sm text-gray-700">
                    십이운성, 신살, 통변성 등 고급 명리학 이론을 적용합니다.
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🌙 음력 변환</h3>
                  <p className="text-sm text-gray-700">
                    음력 생일도 자동으로 양력으로 변환하여 정확한 사주를 계산합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mz-card mb-8 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <Code className="text-purple-600 flex-shrink-0 mt-1" size={32} />
            <div className="w-full">
              <h2 className="mz-heading-2 mb-4">기술 스택</h2>
              <div className="mz-body space-y-3">
                <p>현대적이고 안정적인 기술 스택으로 서비스를 제공합니다:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Frontend</p>
                      <p className="text-gray-600">Next.js 15 + React 19</p>
                      <p className="text-gray-600">TypeScript</p>
                      <p className="text-gray-600">Tailwind CSS</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI/ML</p>
                      <p className="text-gray-600">OpenAI GPT-4o</p>
                      <p className="text-gray-600">자연어 처리</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Deployment</p>
                      <p className="text-gray-600">Vercel</p>
                      <p className="text-gray-600">Edge Functions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mz-card mb-8 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <Mail className="text-purple-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="mz-heading-2 mb-4">연락처</h2>
              <div className="mz-body space-y-4">
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Building2 className="text-purple-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">회사명</p>
                    <p className="text-sm text-gray-700">Orbix</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                  <Mail className="text-cyan-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">이메일</p>
                    <a
                      href="mailto:orbix.partners@gmail.com"
                      className="text-cyan-600 hover:underline text-sm"
                    >
                      orbix.partners@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <Github className="text-pink-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">GitHub Repository</p>
                    <a
                      href="https://github.com/Rio-Jang-Orbix/saju-mvp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline text-sm"
                    >
                      https://github.com/Rio-Jang-Orbix/saju-mvp
                    </a>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-700">
                    💡 본 프로젝트는 오픈소스 프로젝트로 진행되고 있으며, 누구나 기여하실 수
                    있습니다. 버그 리포트, 기능 제안, 코드 기여 모두 환영합니다!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source */}
        <div className="mz-card-gradient mb-8 animate-fade-in">
          <div className="text-center py-6">
            <h2 className="mz-heading-3 mb-4">오픈소스 프로젝트</h2>
            <p className="mz-body mb-6">
              사주팔자 분석은 오픈소스 정신을 바탕으로 만들어진 프로젝트입니다.
              <br />
              코드를 공개하고 커뮤니티와 함께 발전시켜 나갑니다.
            </p>
            <a
              href="https://github.com/Rio-Jang-Orbix/saju-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mz-button mz-button-primary"
            >
              <Github size={20} />
              GitHub에서 보기
            </a>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mz-button mz-button-outline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
