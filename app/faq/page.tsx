import Link from 'next/link'
import { Metadata } from 'next'
import { HelpCircle, ChevronDown, Search, MessageCircle } from 'lucide-react'
import { Breadcrumb, breadcrumbConfigs } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ)',
  description: '사주팔자 분석 서비스에 대한 자주 묻는 질문과 답변입니다. 사주 계산, 음력 변환, AI 해석, 개인정보 보호 등에 대한 모든 궁금증을 해결하세요.',
  keywords: ['FAQ', '자주 묻는 질문', '사주 질문', '사용 가이드', '도움말', '사주 계산 방법', '음력 변환'],
  openGraph: {
    title: '자주 묻는 질문 (FAQ) | 사주팔자 분석',
    description: '사주팔자 분석 서비스에 대한 모든 궁금증을 해결하세요.',
    url: '/faq',
  },
  alternates: {
    canonical: '/faq',
  },
}

const faqCategories = [
  {
    category: '기본 사용법',
    icon: '📱',
    questions: [
      {
        question: '사주팔자 분석은 무료인가요?',
        answer: '네, 사주팔자 분석은 완전 무료입니다. 생년월일시만 입력하면 AI 기반의 상세한 사주 해석을 받으실 수 있습니다. 별도의 회원가입이나 결제 없이 바로 이용 가능합니다.',
      },
      {
        question: '음력 생일도 가능한가요?',
        answer: '네, 양력과 음력 모두 지원합니다. 입력 폼에서 음력을 선택하시면 자동으로 양력으로 변환하여 정확한 사주를 계산합니다. 1900년부터 2100년까지의 음력 날짜를 정확하게 변환할 수 있습니다.',
      },
      {
        question: '정확한 출생 시간을 모르면 어떻게 하나요?',
        answer: '출생 시간을 정확히 모르시는 경우, 대략적인 시간대(오전/오후)를 입력하시면 됩니다. 시간을 입력하지 않으면 자동으로 정오(12시)로 계산됩니다. 다만, 정확한 시주 분석을 위해서는 가능한 출생 시간을 확인하시는 것을 권장합니다.',
      },
      {
        question: '사주 결과를 공유할 수 있나요?',
        answer: '네, 분석 결과 페이지에서 클립보드 복사 또는 네이티브 공유 기능을 통해 손쉽게 결과를 공유하실 수 있습니다. 카카오톡, 문자, 이메일 등 다양한 방법으로 공유 가능합니다.',
      },
      {
        question: '결과를 저장할 수 있나요?',
        answer: '현재는 세션 기반으로 운영되어 브라우저를 닫으면 데이터가 삭제됩니다. 결과를 저장하시려면 화면 캡처나 텍스트 복사 기능을 이용해주세요. 추후 로그인 기능과 함께 결과 저장 기능을 추가할 예정입니다.',
      },
    ],
  },
  {
    category: 'AI 해석',
    icon: '🤖',
    questions: [
      {
        question: 'AI는 어떻게 사주를 해석하나요?',
        answer: 'OpenAI GPT-4를 활용하여 천간지지와 오행 분석을 바탕으로 성격, 적성, 대인관계, 재물운, 건강운 등을 종합적으로 해석합니다. 전통 명리학 이론을 기반으로 하되, 현대적인 관점에서 실용적인 조언을 제공합니다.',
      },
      {
        question: 'AI 해석은 정확한가요?',
        answer: 'AI 해석은 전통 명리학 이론을 기반으로 하지만, 참고 자료로만 활용하시기 바랍니다. 중요한 인생 결정은 반드시 전문가와 상담 후 신중하게 결정하시기 바랍니다. AI는 보조 도구이며, 최종 판단은 본인이 하셔야 합니다.',
      },
      {
        question: 'AI 해석에 시간이 얼마나 걸리나요?',
        answer: '일반적으로 10-30초 정도 소요됩니다. 서버 상황에 따라 다소 변동될 수 있으며, 최대 10초의 대기 시간 제한이 있습니다. 시간 초과 시 다시 시도해주세요.',
      },
      {
        question: 'AI 해석을 여러 번 받으면 결과가 다른가요?',
        answer: '같은 생년월일시로 분석하면 기본 사주 정보는 동일하지만, AI 해석은 매번 약간씩 다르게 표현될 수 있습니다. 핵심 내용은 일관되지만, 설명 방식이나 강조점이 달라질 수 있습니다.',
      },
    ],
  },
  {
    category: '사주 계산',
    icon: '🔮',
    questions: [
      {
        question: '사주팔자는 어떻게 계산되나요?',
        answer: '생년월일시를 천간(10가지)과 지지(12가지)로 변환하여 년주, 월주, 일주, 시주 총 8자를 계산합니다. 이를 기반으로 오행(목화토금수)의 균형, 십이운성, 신살 등을 분석합니다.',
      },
      {
        question: '대운(大運)은 무엇인가요?',
        answer: '대운은 10년 주기로 변화하는 큰 운의 흐름을 의미합니다. 출생 시의 사주를 기반으로 계산되며, 인생의 각 시기마다 어떤 운이 작용하는지 보여줍니다. 현재 나이를 기준으로 현재와 미래의 대운을 확인할 수 있습니다.',
      },
      {
        question: '십이운성은 무엇인가요?',
        answer: '십이운성은 일간(일주의 천간)을 기준으로 12가지 생명의 순환 단계를 나타냅니다. 장생, 목욕, 관대, 건록, 제왕, 쇠, 병, 사, 묘, 절, 태, 양의 12단계로 각 지지에서의 강약을 판단합니다.',
      },
      {
        question: '신살(神殺)은 무엇인가요?',
        answer: '신살은 사주에서 특정 조합이 만들어내는 길흉의 징조를 의미합니다. 도화살, 역마살, 천을귀인, 백호대살 등 다양한 신살이 있으며, 각각 특정한 성향이나 운명적 특징을 나타냅니다.',
      },
      {
        question: '통변성(通變星)은 무엇인가요?',
        answer: '통변성은 일간을 기준으로 다른 천간들과의 관계를 나타냅니다. 비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인의 10가지로 구분되며, 각각 성격, 재물, 명예, 학업 등을 상징합니다.',
      },
    ],
  },
  {
    category: '궁합 분석',
    icon: '💑',
    questions: [
      {
        question: '궁합 분석은 어떻게 하나요?',
        answer: '두 사람의 생년월일시를 모두 입력하시면 됩니다. 천간지지의 조화도, 오행의 상생상극 관계, 용신의 일치 여부 등을 종합적으로 분석하여 점수와 해석을 제공합니다.',
      },
      {
        question: '궁합 점수는 어떻게 매겨지나요?',
        answer: '천간 조화도(30%), 지지 조화도(30%), 오행 균형(20%), 용신 일치도(20%)를 기준으로 100점 만점으로 계산됩니다. 80점 이상은 매우 좋음, 60-80점은 좋음, 40-60점은 보통, 40점 미만은 주의가 필요한 것으로 분류됩니다.',
      },
      {
        question: '궁합이 좋지 않으면 어떻게 하나요?',
        answer: '궁합은 참고 자료일 뿐입니다. 실제 관계는 두 사람의 노력과 이해, 소통이 더 중요합니다. 궁합이 좋지 않더라도 서로를 존중하고 배려한다면 좋은 관계를 유지할 수 있습니다.',
      },
      {
        question: '연애 궁합과 결혼 궁합이 다른가요?',
        answer: '본 서비스는 종합적인 궁합을 분석하며, 연애와 결혼을 구분하지 않습니다. 다만, AI 해석에서 연애 시기의 주의사항과 결혼 후 조화 방법 등을 별도로 안내해드립니다.',
      },
    ],
  },
  {
    category: '개인정보 보호',
    icon: '🔒',
    questions: [
      {
        question: '입력한 정보는 어떻게 처리되나요?',
        answer: '생년월일시 정보는 세션 기반으로 처리되며, 브라우저를 닫으면 즉시 삭제됩니다. 서버에 영구 저장되지 않으며, 제3자에게 공유되지 않습니다. AI 해석을 위해 OpenAI API를 사용하지만, 개인 식별 정보는 전송되지 않습니다.',
      },
      {
        question: '회원가입이 필요한가요?',
        answer: '아니요, 회원가입 없이 바로 이용하실 수 있습니다. 이름, 이메일, 전화번호 등 어떠한 개인정보도 수집하지 않습니다.',
      },
      {
        question: '쿠키를 사용하나요?',
        answer: '네, 서비스 제공을 위해 필수 쿠키(세션 관리)와 분석 쿠키(Google Analytics)를 사용합니다. 마케팅 쿠키는 사용하지 않으며, 쿠키 정책 페이지에서 자세한 내용을 확인하실 수 있습니다.',
      },
    ],
  },
  {
    category: '기술 문제',
    icon: '🛠️',
    questions: [
      {
        question: '분석이 진행되지 않아요',
        answer: '다음을 확인해주세요: 1) 생년월일을 모두 입력했는지 확인, 2) 브라우저를 새로고침 후 재시도, 3) 음력/양력이 올바르게 선택되었는지 확인, 4) 인터넷 연결 상태 확인. 문제가 계속되면 GitHub Issues로 문의해주세요.',
      },
      {
        question: '어떤 브라우저를 지원하나요?',
        answer: 'Chrome, Safari, Firefox, Edge 등 최신 브라우저를 모두 지원합니다. Internet Explorer는 지원하지 않습니다. 최상의 경험을 위해 최신 버전의 브라우저를 사용해주세요.',
      },
      {
        question: '모바일에서도 사용할 수 있나요?',
        answer: '네, 모바일 브라우저에서도 완벽하게 작동합니다. 반응형 디자인으로 스마트폰, 태블릿 등 모든 화면 크기에 최적화되어 있습니다.',
      },
      {
        question: '오류가 발생하면 어떻게 하나요?',
        answer: 'GitHub Issues(https://github.com/Rio-Jang-Orbix/saju-mvp/issues)에 오류 내용을 상세히 기록하여 제보해주세요. 스크린샷과 함께 브라우저 종류, 발생 시간 등을 알려주시면 빠르게 해결하겠습니다.',
      },
    ],
  },
  {
    category: '서비스 정보',
    icon: 'ℹ️',
    questions: [
      {
        question: '이 서비스는 누가 만들었나요?',
        answer: 'Orbix 팀에서 개발한 오픈소스 프로젝트입니다. AI 기술과 전통 명리학을 결합하여 누구나 쉽게 사주를 확인할 수 있도록 만들었습니다. GitHub에서 소스 코드를 확인하실 수 있습니다.',
      },
      {
        question: '상업적으로 사용해도 되나요?',
        answer: 'MIT 라이선스를 따르는 오픈소스 프로젝트로, 상업적 이용이 가능합니다. 다만, 라이선스 고지를 유지해주시기 바랍니다.',
      },
      {
        question: '기능 추가 요청을 할 수 있나요?',
        answer: '네, GitHub Issues에 기능 요청을 남겨주세요. 커뮤니티의 피드백을 적극 반영하여 서비스를 개선하고 있습니다.',
      },
      {
        question: '프로젝트에 기여하고 싶어요',
        answer: 'GitHub 저장소를 Fork하여 Pull Request를 보내주세요. 버그 수정, 기능 추가, 문서 개선 등 모든 기여를 환영합니다. CONTRIBUTING.md 파일을 참고해주세요.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen mz-bg py-12">
      <div className="mz-container max-w-5xl">
        <Breadcrumb items={[{ name: '자주 묻는 질문', url: '/faq' }]} />

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <HelpCircle className="text-purple-600" size={40} />
          </div>
          <h1 className="mz-heading-1 mb-4">자주 묻는 질문</h1>
          <p className="mz-body max-w-2xl mx-auto">
            사주팔자 분석 서비스에 대한 모든 궁금증을 해결하세요.
            <br />
            찾으시는 답변이 없으면 GitHub Issues로 문의해주세요.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mz-card animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="mz-heading-2">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <details
                    key={faqIndex}
                    className="group bg-white/50 rounded-xl p-5 hover:bg-white/70 transition-all"
                  >
                    <summary className="flex items-start gap-3 cursor-pointer list-none">
                      <ChevronDown className="flex-shrink-0 mt-1 text-purple-600 group-open:rotate-180 transition-transform" size={20} />
                      <span className="font-semibold text-gray-900 flex-1">
                        {faq.question}
                      </span>
                    </summary>
                    <div className="mt-4 ml-8 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 mz-card-gradient text-center animate-fade-in">
          <MessageCircle className="mx-auto mb-4 text-purple-600" size={48} />
          <h2 className="mz-heading-3 mb-4">찾으시는 답변이 없나요?</h2>
          <p className="mz-body mb-6">
            추가 질문이나 기술적 문제는 GitHub Issues로 문의해주세요.
            <br />
            빠르게 답변드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Rio-Jang-Orbix/saju-mvp/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mz-button mz-button-primary"
            >
              GitHub Issues로 문의하기
            </a>
            <a
              href="mailto:orbix.partners@gmail.com"
              className="mz-button mz-button-outline"
            >
              이메일로 문의하기
            </a>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mz-button mz-button-outline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
