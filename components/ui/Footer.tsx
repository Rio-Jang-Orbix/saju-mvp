'use client'

import Link from 'next/link'
import { Github, Heart, Sparkles, Shield, FileText, Cookie, Building2 } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-white to-purple-50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

      <div className="mz-container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-purple-600" size={24} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                사주팔자 분석
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              AI 기술과 전통 명리학이 만나 새로운 가치를 창출합니다.
              누구나 쉽게 자신의 사주를 확인하고 미래를 준비할 수 있도록 돕습니다.
            </p>
            <div className="flex items-center gap-2 text-pink-600">
              <Heart size={16} />
              <span className="text-sm font-semibold">
                Made with ❤️ in Korea
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              서비스
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-600 transition-colors" />
                  사주 분석
                </Link>
              </li>
              <li>
                <Link
                  href="/compatibility"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:bg-pink-600 transition-colors" />
                  궁합 분석
                </Link>
              </li>
              <li>
                <Link
                  href="/analyze"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-cyan-600 transition-colors" />
                  운세 보기
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-purple-600" />
              법적 고지
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <Shield size={14} />
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <FileText size={14} />
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <Cookie size={14} />
                  쿠키 정책
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <Building2 size={14} />
                  회사 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Github size={18} className="text-purple-600" />
              커뮤니티
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/Rio-Jang-Orbix/saju-mvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Rio-Jang-Orbix/saju-mvp/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  이슈 & 문의
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Rio-Jang-Orbix/saju-mvp/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  토론
                </a>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-700 mb-2 font-semibold">오픈소스 프로젝트</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                누구나 기여할 수 있는 오픈소스 프로젝트입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-gray-900">⚠️ 고지사항:</strong> 본 서비스는 AI 기반의 자동화된
            사주팔자 분석 서비스입니다. 제공되는 모든 정보는 참고 자료로만 활용되어야 하며,
            중요한 인생 결정은 전문가와 상담 후 신중하게 결정하시기 바랍니다.
            서비스 이용 결과에 대한 책임은 이용자 본인에게 있습니다.
          </p>
        </div>

        {/* Company Information */}
        <div className="border-t border-purple-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 mb-6">
            <div className="space-y-2">
              <p>
                <strong className="text-gray-900">프로젝트:</strong> 사주팔자 분석 (Saju MVP)
              </p>
              <p>
                <strong className="text-gray-900">개발:</strong> Saju MVP Team
              </p>
              <p>
                <strong className="text-gray-900">라이선스:</strong> MIT License (오픈소스)
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-900">기술 스택:</strong> Next.js 15 + React 19 + TypeScript
              </p>
              <p>
                <strong className="text-gray-900">AI 엔진:</strong> OpenAI GPT-4o
              </p>
              <p>
                <strong className="text-gray-900">GitHub:</strong>{' '}
                <a
                  href="https://github.com/Rio-Jang-Orbix/saju-mvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Rio-Jang-Orbix/saju-mvp
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-200 pt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            © {currentYear} 사주팔자 분석 (Saju MVP). All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            본 서비스는 오픈소스 프로젝트로 MIT 라이선스 하에 배포됩니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Made with</span>
            <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
            <span>by developers who care</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
