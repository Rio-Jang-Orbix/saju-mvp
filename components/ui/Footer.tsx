'use client'

import { useI18n } from '@/lib/i18n/context'
import { Heart, Mail, Shield, FileText } from 'lucide-react'

export function Footer() {
  const { language } = useI18n()

  return (
    <footer className="bg-white border-t border-luxury-gold/20 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <h3 className="text-xl font-semibold text-luxury-charcoal">Luvo</h3>
            </div>
            <p className="text-luxury-bronze text-sm mb-4">
              {language === 'en'
                ? 'AI-powered relationship analysis platform for meaningful connections.'
                : 'AI 기반 연애 분석으로 더 깊은 관계를 만들어갑니다.'}
            </p>
            <div className="flex items-center gap-2 text-luxury-accent">
              <Heart size={16} />
              <span className="text-sm font-semibold">
                {language === 'en' ? 'Made with love in Seoul' : '서울에서 사랑으로 만듭니다'}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-luxury-charcoal mb-4">
              {language === 'en' ? 'Services' : '서비스'}
            </h4>
            <ul className="space-y-2 text-sm text-luxury-bronze">
              <li>
                <a href="/analyze" className="hover:text-luxury-gold transition-colors">
                  {language === 'en' ? 'Conversation Analysis' : '대화 분석'}
                </a>
              </li>
              <li>
                <a href="/premium-matching" className="hover:text-luxury-gold transition-colors">
                  {language === 'en' ? 'Premium Matching' : '프리미엄 매칭'}
                </a>
              </li>
              <li>
                <span className="text-luxury-bronze/60">
                  {language === 'en' ? 'Dating Coaching (Coming Soon)' : '연애 코칭 (출시 예정)'}
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-luxury-charcoal mb-4">
              {language === 'en' ? 'Legal' : '법적 고지'}
            </h4>
            <ul className="space-y-2 text-sm text-luxury-bronze">
              <li>
                <a href="/privacy" className="hover:text-luxury-gold transition-colors flex items-center gap-2">
                  <Shield size={14} />
                  {language === 'en' ? 'Privacy Policy' : '개인정보처리방침'}
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-luxury-gold transition-colors flex items-center gap-2">
                  <FileText size={14} />
                  {language === 'en' ? 'Terms of Service' : '이용약관'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-luxury-charcoal mb-4">
              {language === 'en' ? 'Contact' : '고객센터'}
            </h4>
            <ul className="space-y-2 text-sm text-luxury-bronze">
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:support@luvo.ai" className="hover:text-luxury-gold transition-colors">
                  support@luvo.ai
                </a>
              </li>
              <li className="text-luxury-bronze/80">
                {language === 'en' ? 'Mon-Fri 9:00-18:00 (KST)' : '평일 9:00-18:00 (한국시간)'}
              </li>
            </ul>
          </div>
        </div>

        {/* Company Legal Information */}
        <div className="border-t border-luxury-gold/10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-luxury-bronze/80">
            <div>
              <p className="mb-2">
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'Company:' : '상호:'}
                </strong> (주)루보테크놀로지
              </p>
              <p className="mb-2">
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'CEO:' : '대표자:'}
                </strong> 김루보
              </p>
              <p>
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'Business Registration:' : '사업자등록번호:'}
                </strong> 123-45-67890
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'Telecommunication Sales Report:' : '통신판매신고번호:'}
                </strong> 제2024-서울강남-0123호
              </p>
              <p className="mb-2">
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'Address:' : '주소:'}
                </strong> 서울특별시 강남구 테헤란로 123, 456층
              </p>
              <p>
                <strong className="text-luxury-charcoal">
                  {language === 'en' ? 'Customer Service:' : '고객센터:'}
                </strong> 1588-1234
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-luxury-gold/10 pt-6 mt-6 text-center">
          <p className="text-xs text-luxury-bronze/60">
            © 2024 Luvo Technologies Inc. All rights reserved.
          </p>
          <p className="text-xs text-luxury-bronze/60 mt-1">
            {language === 'en'
              ? 'Unauthorized reproduction or distribution is prohibited.'
              : '무단 복제 및 배포를 금지합니다.'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer