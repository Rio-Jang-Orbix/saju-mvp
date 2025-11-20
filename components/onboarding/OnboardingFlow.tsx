'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { UserProfile } from '@/types'
import { Sparkles, ArrowRight, ChevronLeft, Phone, Mail } from 'lucide-react'

interface OnboardingStep {
  title: string
  subtitle: string
  options: Array<{
    value: string
    label: string
    emoji: string
    description: string
  }>
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "성별을 선택해주세요",
    subtitle: "정확한 성향 분석을 위해 필요합니다 💫",
    options: [
      {
        value: "male",
        label: "남성",
        emoji: "👨",
        description: "남성입니다"
      },
      {
        value: "female",
        label: "여성",
        emoji: "👩",
        description: "여성입니다"
      }
    ]
  },
  {
    title: "연령대를 알려주세요",
    subtitle: "또래와의 매칭 분석을 위해 필요해요 ✨",
    options: [
      {
        value: "early_20s",
        label: "20대 초반",
        emoji: "🌸",
        description: "20-24세"
      },
      {
        value: "late_20s",
        label: "20대 후반",
        emoji: "🌟",
        description: "25-29세"
      },
      {
        value: "early_30s",
        label: "30대 초반",
        emoji: "💫",
        description: "30-34세"
      },
      {
        value: "late_30s",
        label: "30대 후반",
        emoji: "✨",
        description: "35-39세"
      }
    ]
  },
  {
    title: "거주 지역을 선택해주세요",
    subtitle: "근처 지역 매칭을 위해 필요합니다 📍",
    options: [
      {
        value: "seoul",
        label: "서울",
        emoji: "🏙️",
        description: "서울 전체"
      },
      {
        value: "gyeonggi",
        label: "경기도",
        emoji: "🌆",
        description: "경기도 전체"
      },
      {
        value: "busan",
        label: "부산",
        emoji: "🌊",
        description: "부산 전체"
      },
      {
        value: "other",
        label: "기타 지역",
        emoji: "🗺️",
        description: "기타 지역"
      }
    ]
  },
  {
    title: "현재 직업 분야는 어떻게 되시나요?",
    subtitle: "비슷한 관심사를 가진 분들과 매칭해드려요 💼",
    options: [
      {
        value: "office",
        label: "사무직",
        emoji: "💻",
        description: "일반 사무직, 관리직"
      },
      {
        value: "tech",
        label: "IT/개발",
        emoji: "👨‍💻",
        description: "개발자, IT 관련직"
      },
      {
        value: "finance",
        label: "금융",
        emoji: "💰",
        description: "은행, 증권, 보험"
      },
      {
        value: "creative",
        label: "창작/예술",
        emoji: "🎨",
        description: "디자인, 예술, 방송"
      },
      {
        value: "professional",
        label: "전문직",
        emoji: "👩‍⚕️",
        description: "의료, 법무, 교육"
      },
      {
        value: "service",
        label: "서비스업",
        emoji: "🤝",
        description: "영업, 서비스, 유통"
      },
      {
        value: "student",
        label: "학생",
        emoji: "🎓",
        description: "대학생, 대학원생"
      },
      {
        value: "other",
        label: "기타",
        emoji: "💼",
        description: "기타 직업"
      }
    ]
  },
  {
    title: "당신의 연애 목표를 알려주세요",
    subtitle: "AI가 더 정확한 조언을 드릴 수 있어요 ✨",
    options: [
      {
        value: "serious_relationship",
        label: "진지한 만남",
        emoji: "💕",
        description: "결혼을 전제로 한 진지한 연애를 원해요"
      },
      {
        value: "casual_dating",
        label: "가벼운 만남",
        emoji: "😊",
        description: "부담없는 데이팅을 즐기고 싶어요"
      },
      {
        value: "new_experience",
        label: "새로운 경험",
        emoji: "🌟",
        description: "다양한 사람들과 만나보고 싶어요"
      },
      {
        value: "long_term",
        label: "장기 교제",
        emoji: "💝",
        description: "오래 함께할 사람을 찾고 있어요"
      }
    ]
  },
  {
    title: "평소 어떤 스타일로 소통하시나요?",
    subtitle: "당신만의 매력적인 대화 스타일을 찾아드릴게요 💫",
    options: [
      {
        value: "emotional",
        label: "감성적",
        emoji: "🥰",
        description: "마음을 따뜻하게 전하는 대화를 좋아해요"
      },
      {
        value: "logical",
        label: "논리적",
        emoji: "🤔",
        description: "차근차근 생각을 정리해서 말하는 편이에요"
      },
      {
        value: "humorous",
        label: "유머러스",
        emoji: "😄",
        description: "재미있고 유쾌한 대화로 분위기를 띄워요"
      },
      {
        value: "thoughtful",
        label: "신중함",
        emoji: "🧐",
        description: "신중하게 생각한 후 의미 있는 말을 해요"
      }
    ]
  },
  {
    title: "선호하는 이상형 연령대는?",
    subtitle: "최적의 매칭을 위해 필요해요 💕",
    options: [
      {
        value: "same_age",
        label: "비슷한 연령대",
        emoji: "👫",
        description: "나와 비슷한 또래가 좋아요"
      },
      {
        value: "younger",
        label: "연하",
        emoji: "🌸",
        description: "나보다 어린 분이 좋아요"
      },
      {
        value: "older",
        label: "연상",
        emoji: "🌟",
        description: "나보다 나이가 많은 분이 좋아요"
      },
      {
        value: "flexible",
        label: "상관없음",
        emoji: "💫",
        description: "나이는 크게 중요하지 않아요"
      }
    ]
  },
  {
    title: "마지막으로, 분석 결과를 받아보실 연락처를 알려주세요",
    subtitle: "성향 분석 완료 후 결과를 안전하게 보내드려요 📱",
    options: [
      {
        value: "phone_input",
        label: "휴대폰 번호 입력",
        emoji: "📱",
        description: "010-0000-0000"
      },
      {
        value: "email_input",
        label: "이메일 입력",
        emoji: "📧",
        description: "example@email.com"
      }
    ]
  }
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [contactInput, setContactInput] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setSelectedOption(answers[currentStep - 1] || '')
      setAnswers(answers.slice(0, currentStep - 1))
    }
  }

  const handleNext = () => {
    if (!selectedOption) return

    // 마지막 단계에서는 연락처 입력이 필요
    if (currentStep === onboardingSteps.length - 1 && !contactInput.trim()) {
      return
    }

    setIsAnimating(true)

    setTimeout(() => {
      const answerValue = currentStep === onboardingSteps.length - 1 ? contactInput : selectedOption
      const newAnswers = [...answers, answerValue]
      setAnswers(newAnswers)

      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1)
        setSelectedOption('')
        setContactInput('')
      } else {
        // Save comprehensive profile data to localStorage
        const profile = {
          id: `user_${Date.now()}`,
          gender: newAnswers[0],
          ageGroup: newAnswers[1],
          location: newAnswers[2],
          occupation: newAnswers[3],
          relationshipGoal: newAnswers[4],
          personalityType: newAnswers[5],
          idealAgePreference: newAnswers[6],
          contactMethod: selectedOption,
          contactInfo: contactInput,
          createdAt: new Date().toISOString()
        }

        // Store in localStorage for later use
        localStorage.setItem('luvo_profile', JSON.stringify(profile))

        // Store in mock database for marketing analysis
        const existingProfiles = JSON.parse(localStorage.getItem('luvo_user_database') || '[]')
        existingProfiles.push(profile)
        localStorage.setItem('luvo_user_database', JSON.stringify(existingProfiles))

        console.log('User profile collected:', profile)

        router.push('/analyze')
      }
      setIsAnimating(false)
    }, 300)
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-screen luxury-bg relative overflow-hidden">
      {/* Elegant Floating Elements */}
      <div className="absolute top-20 left-10 text-4xl opacity-15 elegant-float">🌸</div>
      <div className="absolute top-60 right-20 text-3xl opacity-12 elegant-float" style={{animationDelay: '2s'}}>✨</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-10 elegant-float" style={{animationDelay: '4s'}}>🍃</div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 luxury-glass rounded-full px-8 py-4 mb-8">
              <Sparkles className="text-luxury-gold" size={24} />
              <span className="text-luxury-charcoal font-semibold luxury-subtitle">당신만의 우아한 AI 연애 컨실러</span>
            </div>
            <h1 className="text-5xl luxury-title text-luxury-charcoal mb-6">
              {currentStepData.title}
            </h1>
            <p className="text-xl text-luxury-bronze luxury-subtitle">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm text-luxury-bronze luxury-subtitle mb-6">
              <span>단계 {currentStep + 1} / {onboardingSteps.length}</span>
              <span>{Math.round(progress)}% 완료</span>
            </div>
            <div className="bg-luxury-beige rounded-full h-4 overflow-hidden luxury-shadow">
              <div
                className="bg-luxury-gold h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Options Grid */}
          {currentStep !== onboardingSteps.length - 1 ? (
            <div className={`grid gap-6 mb-12 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              {currentStepData.options.map((option, index) => (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-300 luxury-card border-luxury-gold/20 group ${
                    selectedOption === option.value
                      ? 'border-luxury-gold bg-luxury-beige luxury-shadow'
                      : 'hover:border-luxury-gold/40'
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform">
                        {option.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl luxury-title text-luxury-charcoal mb-3 group-hover:text-gradient-luxury transition-all">
                          {option.label}
                        </h3>
                        <p className="text-luxury-bronze luxury-subtitle leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      {selectedOption === option.value && (
                        <div className="text-luxury-gold">
                          <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center luxury-shadow">
                            <span className="text-white font-bold">✓</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Contact Input Section */
            <div className="mb-12">
              <div className="grid gap-6">
                {currentStepData.options.map((option, index) => (
                  <Card
                    key={option.value}
                    className={`cursor-pointer transition-all duration-300 luxury-card border-luxury-gold/20 group ${
                      selectedOption === option.value
                        ? 'border-luxury-gold bg-luxury-beige luxury-shadow'
                        : 'hover:border-luxury-gold/40'
                    }`}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {option.value === 'phone_input' ? <Phone className="text-luxury-gold" size={24} /> : <Mail className="text-luxury-gold" size={24} />}
                        <h3 className="text-xl luxury-title text-luxury-charcoal">
                          {option.label}
                        </h3>
                      </div>
                      {selectedOption === option.value && (
                        <Input
                          type={option.value === 'phone_input' ? 'tel' : 'email'}
                          placeholder={option.description}
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          className="w-full p-4 text-lg border-luxury-gold focus:border-luxury-accent"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="ghost"
              className="text-luxury-bronze hover:text-luxury-charcoal luxury-button-outline disabled:opacity-30"
            >
              <ChevronLeft size={20} className="mr-2" />
              이전
            </Button>

            <div className="text-center">
              <Button
                onClick={handleNext}
                disabled={!selectedOption || isAnimating}
                className="luxury-button py-4 px-12 text-lg rounded-full luxury-shadow group disabled:opacity-50"
                size="lg"
              >
                {isAnimating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>처리 중...</span>
                  </div>
                ) : (
                  <>
                    {currentStep < onboardingSteps.length - 1 ? '다음 단계' : 'AI 분석 시작'}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </Button>
              {!selectedOption && (
                <p className="text-luxury-bronze/70 text-sm mt-4 luxury-subtitle">
                  옵션을 선택해주세요
                </p>
              )}
            </div>

            <div className="w-20"> {/* Spacer for alignment */}</div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-luxury-gold scale-110 luxury-shadow'
                    : 'bg-luxury-beige'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}