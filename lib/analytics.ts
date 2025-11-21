/**
 * Google Analytics 이벤트 추적 유틸리티
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

/**
 * 페이지뷰 이벤트 전송
 */
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }
}

/**
 * 커스텀 이벤트 전송
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * 사주 분석 완료 이벤트
 */
export const trackSajuAnalysis = (analysisType: 'basic' | 'compatibility' | 'fortune') => {
  event({
    action: 'saju_analysis_complete',
    category: 'Analysis',
    label: analysisType,
  })
}

/**
 * 운세 조회 이벤트
 */
export const trackFortuneView = (fortuneType: 'daily' | 'monthly' | 'yearly') => {
  event({
    action: 'fortune_view',
    category: 'Fortune',
    label: fortuneType,
  })
}

/**
 * 궁합 분석 이벤트
 */
export const trackCompatibilityAnalysis = (score: number) => {
  event({
    action: 'compatibility_analysis',
    category: 'Analysis',
    label: 'compatibility_score',
    value: score,
  })
}

/**
 * 에러 추적
 */
export const trackError = (errorMessage: string, errorLocation: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${errorLocation}: ${errorMessage}`,
  })
}

/**
 * 공유 버튼 클릭 추적
 */
export const trackShare = (platform: 'kakao' | 'facebook' | 'twitter' | 'link') => {
  event({
    action: 'share',
    category: 'Social',
    label: platform,
  })
}
