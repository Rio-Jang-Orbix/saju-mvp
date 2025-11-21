'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { event } from '@/lib/analytics'

/**
 * Core Web Vitals 성능 지표 추적
 * - CLS (Cumulative Layout Shift): 레이아웃 변화 누적 점수
 * - FID (First Input Delay): 첫 입력 지연
 * - FCP (First Contentful Paint): 첫 콘텐츠 페인트
 * - LCP (Largest Contentful Paint): 최대 콘텐츠 페인트
 * - TTFB (Time to First Byte): 첫 바이트까지의 시간
 * - INP (Interaction to Next Paint): 다음 페인트까지의 상호작용 시간
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Google Analytics로 Web Vitals 전송
    event({
      action: metric.name,
      category: 'Web Vitals',
      label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    })

    // 콘솔에 성능 지표 출력 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
      })
    }
  })

  return null
}
