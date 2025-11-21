import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '궁합 분석',
  description: '두 사람의 사주팔자로 궁합을 알아보세요. 천간지지 조화도와 오행 분석으로 관계를 진단합니다. AI가 두 사람의 상성을 상세하게 분석해드립니다.',
  keywords: ['궁합', '사주 궁합', '궁합 보기', '커플 궁합', '연애 궁합', '결혼 궁합', '사주팔자 궁합', '천간지지 궁합', '오행 궁합', 'AI 궁합 분석'],
  openGraph: {
    title: '궁합 분석 | 사주팔자 분석',
    description: '두 사람의 사주팔자로 궁합을 알아보세요. 천간지지 조화도와 오행 분석으로 관계를 진단합니다.',
    url: '/compatibility',
  },
  alternates: {
    canonical: '/compatibility',
  },
}

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
