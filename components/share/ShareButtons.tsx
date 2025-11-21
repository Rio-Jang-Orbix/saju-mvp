'use client'

import { useState } from 'react'
import {
  Share2,
  Copy,
  Check,
  Mail,
  MessageCircle,
  X,
  Facebook,
  Send,
  Link2
} from 'lucide-react'
import { trackShare } from '@/lib/analytics'

interface ShareButtonsProps {
  title: string
  description: string
  url?: string
  hashtags?: string[]
  className?: string
  variant?: 'horizontal' | 'vertical' | 'grid'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ShareButtons({
  title,
  description,
  url,
  hashtags = ['사주팔자', '운세', 'AI사주'],
  className = '',
  variant = 'horizontal',
  size = 'md',
  showLabel = true,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = `${title}\n\n${description}`
  const hashtagString = hashtags.map(tag => `#${tag}`).join(' ')

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  // 카카오톡 공유
  const shareKakao = () => {
    trackShare('kakao')

    // Kakao SDK가 로드되어 있는 경우
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      const Kakao = (window as any).Kakao
      if (!Kakao.isInitialized()) {
        // 카카오 앱 키가 없는 경우 URL scheme으로 대체
        const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`
        window.open(kakaoUrl, '_blank', 'width=600,height=400')
        return
      }

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: `${shareUrl.split('/').slice(0, 3).join('/')}/og-image.png`,
          link: {
            webUrl: shareUrl,
            mobileWebUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '결과 보기',
            link: {
              webUrl: shareUrl,
              mobileWebUrl: shareUrl,
            },
          },
        ],
      })
    } else {
      // 카카오 SDK가 없는 경우 카카오스토리로 대체
      const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`
      window.open(kakaoUrl, '_blank', 'width=600,height=400')
    }
  }

  // 페이스북 공유
  const shareFacebook = () => {
    trackShare('facebook')
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  // 트위터(X) 공유
  const shareTwitter = () => {
    trackShare('twitter')
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags.join(','))}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  // 이메일 공유
  const shareEmail = () => {
    trackShare('link')
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`${description}\n\n결과 보기: ${shareUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  // 텔레그램 공유
  const shareTelegram = () => {
    trackShare('link')
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(telegramUrl, '_blank', 'width=600,height=400')
  }

  // 링크 복사
  const copyLink = async () => {
    trackShare('link')
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 네이티브 공유 (모바일)
  const nativeShare = async () => {
    trackShare('link')
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        })
      } catch (err) {
        // 사용자가 공유를 취소한 경우
        console.log('Share cancelled')
      }
    } else {
      setShowModal(true)
    }
  }

  const buttons = [
    {
      id: 'kakao',
      label: '카카오톡',
      icon: <MessageCircle size={iconSizes[size]} />,
      onClick: shareKakao,
      bgColor: 'bg-[#FEE500] hover:bg-[#FDD800]',
      textColor: 'text-[#3C1E1E]',
    },
    {
      id: 'facebook',
      label: '페이스북',
      icon: <Facebook size={iconSizes[size]} />,
      onClick: shareFacebook,
      bgColor: 'bg-[#1877F2] hover:bg-[#166FE5]',
      textColor: 'text-white',
    },
    {
      id: 'twitter',
      label: 'X (트위터)',
      icon: <X size={iconSizes[size]} />,
      onClick: shareTwitter,
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white',
    },
    {
      id: 'telegram',
      label: '텔레그램',
      icon: <Send size={iconSizes[size]} />,
      onClick: shareTelegram,
      bgColor: 'bg-[#0088CC] hover:bg-[#0077B5]',
      textColor: 'text-white',
    },
    {
      id: 'email',
      label: '이메일',
      icon: <Mail size={iconSizes[size]} />,
      onClick: shareEmail,
      bgColor: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-white',
    },
    {
      id: 'copy',
      label: copied ? '복사됨!' : '링크 복사',
      icon: copied ? <Check size={iconSizes[size]} /> : <Copy size={iconSizes[size]} />,
      onClick: copyLink,
      bgColor: copied ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-white',
    },
  ]

  const layoutClasses = {
    horizontal: 'flex flex-wrap items-center gap-3',
    vertical: 'flex flex-col gap-3',
    grid: 'grid grid-cols-3 sm:grid-cols-6 gap-3',
  }

  return (
    <div className={className}>
      {/* 메인 공유 버튼 (네이티브 공유 또는 모달 열기) */}
      <button
        onClick={nativeShare}
        className="w-full mb-4 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg"
      >
        <Share2 size={20} />
        <span>결과 공유하기</span>
      </button>

      {/* 개별 공유 버튼들 */}
      <div className={layoutClasses[variant]}>
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={button.onClick}
            className={`
              ${sizeClasses[size]}
              ${button.bgColor}
              ${button.textColor}
              rounded-full flex items-center justify-center
              transition-all duration-200 hover:scale-110 shadow-md
              ${showLabel && variant !== 'grid' ? 'px-4 w-auto gap-2' : ''}
            `}
            title={button.label}
            aria-label={button.label}
          >
            {button.icon}
            {showLabel && variant !== 'grid' && (
              <span className="text-sm font-medium">{button.label}</span>
            )}
          </button>
        ))}
      </div>

      {/* 그리드 모드에서 라벨 표시 */}
      {variant === 'grid' && showLabel && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-2">
          {buttons.map((button) => (
            <span
              key={`label-${button.id}`}
              className="text-xs text-gray-500 text-center"
            >
              {button.label}
            </span>
          ))}
        </div>
      )}

      {/* 공유 모달 (네이티브 공유가 지원되지 않는 경우) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">공유하기</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 공유 텍스트 미리보기 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-700 font-medium mb-1">{title}</p>
              <p className="text-xs text-gray-500">{description}</p>
            </div>

            {/* 공유 버튼 그리드 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {buttons.slice(0, 4).map((button) => (
                <button
                  key={`modal-${button.id}`}
                  onClick={() => {
                    button.onClick()
                    setShowModal(false)
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-12 h-12 ${button.bgColor} ${button.textColor} rounded-full flex items-center justify-center transition-transform hover:scale-110`}>
                    {button.icon}
                  </div>
                  <span className="text-xs text-gray-600">{button.label}</span>
                </button>
              ))}
            </div>

            {/* 링크 복사 섹션 */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                <Link2 size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-700 outline-none truncate"
                />
              </div>
              <button
                onClick={() => {
                  copyLink()
                }}
                className={`px-4 py-3 ${copied ? 'bg-green-500' : 'bg-purple-600'} text-white rounded-xl font-medium transition-colors flex items-center gap-2`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-sm">{copied ? '복사됨' : '복사'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 간단한 공유 버튼 (아이콘만)
export function ShareButtonCompact({
  title,
  description,
  url,
  className = '',
}: Omit<ShareButtonsProps, 'variant' | 'size' | 'showLabel'>) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const handleShare = async () => {
    trackShare('link')
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        })
      } catch {
        // 취소됨
      }
    } else {
      // 클립보드에 복사
      await navigator.clipboard.writeText(`${title}\n${description}\n${shareUrl}`)
      alert('링크가 복사되었습니다!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:scale-105 transition-transform shadow-md ${className}`}
    >
      <Share2 size={18} />
      <span>공유</span>
    </button>
  )
}

export default ShareButtons
