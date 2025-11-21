import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '궁합 분석 결과',
  description: '두 사람의 사주팔자 궁합 분석 결과를 확인하세요. AI가 천간지지 조화도, 오행 상성, 관계 발전 가능성을 상세하게 분석합니다.',
  keywords: ['궁합 결과', '사주 궁합 결과', '궁합 점수', '천간지지 궁합', '오행 궁합', 'AI 궁합 해석'],
  openGraph: {
    title: '궁합 분석 결과 | 사주팔자 분석',
    description: '두 사람의 사주팔자 궁합 분석 결과를 확인하세요. AI가 관계를 상세하게 분석합니다.',
    url: '/compatibility/result',
  },
  alternates: {
    canonical: '/compatibility/result',
  },
}

export default function CompatibilityResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
