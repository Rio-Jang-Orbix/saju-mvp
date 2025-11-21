import Link from 'next/link'
import { Metadata } from 'next'
import { FileText, CheckCircle, AlertCircle, Scale, Shield } from 'lucide-react'
import { Breadcrumb, breadcrumbConfigs } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: '이용약관',
  description: '사주팔자 분석 서비스 이용약관입니다. 서비스 제공, 이용자 의무, 책임, 면책조항 등 서비스 이용에 관한 모든 약관을 안내합니다.',
  keywords: ['이용약관', '서비스 약관', '이용 조건', '서비스 정책', '약관'],
  openGraph: {
    title: '이용약관 | 사주팔자 분석',
    description: '사주팔자 분석 서비스 이용약관과 정책을 안내합니다.',
    url: '/terms',
  },
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen mz-bg py-12">
      <div className="mz-container max-w-4xl">
        <Breadcrumb items={breadcrumbConfigs['/terms']} />
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <FileText className="text-purple-600" size={40} />
          </div>
          <h1 className="mz-heading-1 mb-4">이용약관</h1>
          <p className="mz-body">
            사주팔자 분석 서비스를 이용하시기 전에 반드시 확인해주세요.
          </p>
          <p className="text-sm text-gray-500 mt-4">시행일자: 2025년 1월 21일</p>
        </div>

        {/* Content */}
        <div className="mz-card space-y-8">
          {/* 제1조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제1조 (목적)</h2>
                <div className="mz-body">
                  <p>
                    본 약관은 사주팔자 분석 서비스(이하 "서비스")가 제공하는 모든 서비스의 이용
                    조건 및 절차, 이용자와 서비스 간의 권리, 의무 및 책임사항을 규정함을 목적으로
                    합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제2조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제2조 (용어의 정의)</h2>
                <div className="mz-body space-y-3">
                  <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>"서비스"</strong>란 사주팔자 분석, AI 기반 운세 해석, 궁합 분석 등
                      본 플랫폼에서 제공하는 모든 서비스를 의미합니다.
                    </li>
                    <li>
                      <strong>"이용자"</strong>란 본 약관에 따라 서비스를 이용하는 자를 말합니다.
                    </li>
                    <li>
                      <strong>"사주팔자"</strong>란 생년월일시를 기반으로 계산된 천간지지
                      팔자를 의미합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제3조 (약관의 효력 및 변경)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.
                  </p>
                  <p>
                    2. 본 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
                    공지하고, 이에 동의한 이용자가 서비스에 가입함으로써 효력이 발생합니다.
                  </p>
                  <p>
                    3. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수
                    있으며, 약관이 변경되는 경우 지체 없이 공지합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제4조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제4조 (서비스의 제공 및 변경)</h2>
                <div className="mz-body space-y-3">
                  <p>서비스는 다음과 같은 업무를 수행합니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>생년월일시 기반 사주팔자 계산</li>
                    <li>천간지지 분석 및 오행 분석</li>
                    <li>AI 기반 운세 해석</li>
                    <li>대운, 세운 분석</li>
                    <li>궁합 분석 서비스</li>
                    <li>기타 사주 관련 부가 서비스</li>
                  </ul>
                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-gray-700">
                      ⚠️ 서비스는 상당한 이유가 있는 경우 운영상, 기술상의 필요에 따라 제공하고
                      있는 서비스의 전부 또는 일부를 변경할 수 있으며, 변경 전에 해당 내용을
                      공지합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 제5조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제5조 (서비스의 중단)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    서비스는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수
                    있습니다:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유</li>
                    <li>서비스를 위한 설비의 보수 등 공사로 인한 부득이한 경우</li>
                    <li>정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우</li>
                    <li>기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Scale className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제6조 (이용자의 의무)</h2>
                <div className="mz-body space-y-3">
                  <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>신청 또는 변경 시 허위내용의 등록</li>
                    <li>타인의 정보 도용</li>
                    <li>서비스에 게시된 정보의 무단 변경</li>
                    <li>서비스가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                    <li>서비스 및 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    <li>서비스 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                    <li>
                      외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를
                      서비스에 공개 또는 게시하는 행위
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제7조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제7조 (서비스의 책임)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    1. 서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수
                    없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                  </p>
                  <p>
                    2. 서비스는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지
                    않습니다.
                  </p>
                  <p>
                    3. 서비스는 이용자가 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의
                    내용에 관하여는 책임을 지지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제8조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제8조 (면책조항)</h2>
                <div className="mz-body space-y-3">
                  <div className="bg-red-50 p-4 rounded-lg space-y-2">
                    <p className="font-semibold text-red-900">중요 고지사항</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-red-800">
                      <li>
                        본 서비스에서 제공하는 사주팔자 분석 및 운세 해석은 참고 자료로만
                        활용되어야 하며, 어떠한 보증이나 확약을 의미하지 않습니다.
                      </li>
                      <li>
                        AI 기반 해석은 자동화된 알고리즘에 의해 생성되며, 전문 명리학자의 상담을
                        대체할 수 없습니다.
                      </li>
                      <li>
                        서비스 이용 결과로 인한 직·간접적인 손해에 대해서는 책임을 지지 않습니다.
                      </li>
                      <li>
                        중요한 인생 결정은 반드시 전문가와 상담 후 신중하게 결정하시기 바랍니다.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 제9조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Scale className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제9조 (저작권의 귀속 및 이용제한)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    1. 서비스가 작성한 저작물에 대한 저작권 기타 지적재산권은 서비스에 귀속합니다.
                  </p>
                  <p>
                    2. 이용자는 서비스를 이용함으로써 얻은 정보 중 서비스에게 지적재산권이 귀속된
                    정보를 서비스의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여
                    영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제10조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제10조 (분쟁해결)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    1. 서비스는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기
                    위하여 피해보상처리기구를 설치·운영합니다.
                  </p>
                  <p>
                    2. 서비스와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이
                    있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에
                    따를 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제11조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Scale className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제11조 (재판권 및 준거법)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    1. 서비스와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 민사소송법상의
                    관할법원에 제기합니다.
                  </p>
                  <p>2. 서비스와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 부칙 */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="mz-heading-4 mb-3">부칙</h2>
            <p className="mz-body">본 약관은 2025년 1월 21일부터 적용됩니다.</p>
          </section>
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
