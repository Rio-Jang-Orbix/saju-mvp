'use client'

import { useI18n } from '@/lib/i18n/context'
import { Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function LanguageToggle() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 luxury-glass rounded-full hover:bg-luxury-gold/10 transition-all duration-300 group"
        aria-label="Language selector"
      >
        <Globe className="w-4 h-4 text-luxury-gold" />
        <span className="text-luxury-charcoal font-medium text-sm">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-luxury-bronze transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 luxury-glass border border-luxury-gold/20 rounded-xl shadow-xl z-50 fade-in-scale">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'ko' | 'en')
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-luxury-gold/10 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                language === lang.code
                  ? 'bg-luxury-gold/20 text-luxury-charcoal font-semibold'
                  : 'text-luxury-bronze'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
              {language === lang.code && (
                <div className="ml-auto w-2 h-2 bg-luxury-gold rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}