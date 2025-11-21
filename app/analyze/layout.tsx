import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '사주 분석 결과',
  description: '생년월일시를 기반으로 계산된 사주팔자 분석 결과입니다. 천간지지, 오행 분석, 대운, 십이운성, 신살 등 상세한 명리학 이론과 AI 해석을 확인하세요.',
  keywords: ['사주 분석', '사주 결과', '천간지지', '오행 분석', '대운', '십이운성', '신살', '통변성', 'AI 사주 해석', '사주팔자 보기'],
  openGraph: {
    title: '사주 분석 결과 | 사주팔자 분석',
    description: '생년월일시를 기반으로 계산된 상세한 사주팔자 분석 결과와 AI 해석을 확인하세요.',
    url: '/analyze',
  },
  alternates: {
    canonical: '/analyze',
  },
}

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
