import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '월운 · 일운',
  description: '이번 달과 오늘의 운세를 확인하세요. 나의 사주와 오늘의 운을 분석하여 행운의 색, 방향, 조언을 제공합니다. AI 기반 상세 운세 해석으로 매일의 운을 확인하세요.',
  keywords: ['월운', '일운', '오늘의 운세', '이번 달 운세', '운세 보기', '사주 운세', '오늘 운세', '매일 운세', 'AI 운세', '행운의 색', '행운의 방향'],
  openGraph: {
    title: '월운 · 일운 | 사주팔자 분석',
    description: '이번 달과 오늘의 운세를 확인하세요. 나의 사주와 오늘의 운을 분석합니다.',
    url: '/fortune',
  },
  alternates: {
    canonical: '/fortune',
  },
}

export default function FortuneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
