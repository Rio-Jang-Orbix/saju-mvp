import OnboardingFlow from '@/components/onboarding/OnboardingFlow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '온보딩',
  description: '사주팔자 분석 서비스 시작하기. 간단한 안내를 통해 서비스 사용 방법을 알아보세요.',
  openGraph: {
    title: '온보딩 | 사주팔자 분석',
    description: '사주팔자 분석 서비스 시작하기. 간단한 안내를 통해 서비스 사용 방법을 알아보세요.',
  },
}

export default function OnboardingPage() {
  return <OnboardingFlow />
}