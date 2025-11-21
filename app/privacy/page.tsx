import Link from 'next/link'
import { Metadata } from 'next'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '사주팔자 분석 서비스의 개인정보 처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen mz-bg py-12">
      <div className="mz-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="text-purple-600" size={40} />
          </div>
          <h1 className="mz-heading-1 mb-4">개인정보처리방침</h1>
          <p className="mz-body">
            사주팔자 분석 서비스는 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다.
          </p>
          <p className="text-sm text-gray-500 mt-4">시행일자: 2025년 1월 21일</p>
        </div>

        {/* Content */}
        <div className="mz-card space-y-8">
          {/* 제1조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Database className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제1조 (개인정보의 수집 및 이용 목적)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
                    다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
                    「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                    예정입니다.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>사주팔자 분석 서비스 제공</li>
                    <li>AI 기반 운세 해석 서비스 제공</li>
                    <li>궁합 분석 서비스 제공</li>
                    <li>서비스 개선 및 통계 분석</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 제2조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <UserCheck className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제2조 (수집하는 개인정보 항목)</h2>
                <div className="mz-body space-y-3">
                  <p>회사는 다음의 개인정보 항목을 수집하고 있습니다:</p>

                  <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">필수 수집 항목</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                        <li>생년월일 (양력/음력)</li>
                        <li>출생 시간</li>
                        <li>성별</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">선택 수집 항목</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                        <li>이름 (궁합 분석 시)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">자동 수집 항목</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                        <li>IP 주소</li>
                        <li>쿠키 및 세션 정보</li>
                        <li>서비스 이용 기록</li>
                        <li>접속 로그</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 제3조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Lock className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제3조 (개인정보의 보유 및 이용 기간)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
                    수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">보유 및 이용 기간</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>사주 분석 데이터: 세션 종료 시 즉시 삭제</li>
                      <li>서비스 이용 기록: 3개월</li>
                      <li>접속 로그 기록: 3개월</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    * 본 서비스는 회원제를 운영하지 않으며, 사주 분석에 사용된 생년월일시 정보는
                    세션 종료 시 즉시 삭제됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제4조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Eye className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제4조 (개인정보의 제3자 제공)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의
                    경우에는 예외로 합니다:
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">제3자 제공 현황</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-800">제공받는 자: OpenAI (ChatGPT API)</p>
                        <p className="text-sm text-gray-600">제공 목적: AI 기반 사주 해석</p>
                        <p className="text-sm text-gray-600">
                          제공 항목: 사주팔자 데이터 (생년월일시, 천간지지, 오행)
                        </p>
                        <p className="text-sm text-gray-600">보유 기간: 서비스 제공 완료 후 즉시 삭제</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    * AI 해석을 위해 OpenAI API를 사용하며, 개인 식별 정보(이름, 연락처 등)는
                    전송되지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제5조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제5조 (정보주체의 권리·의무 및 행사방법)</h2>
                <div className="mz-body space-y-3">
                  <p>이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>개인정보 열람 요구</li>
                    <li>개인정보 정정·삭제 요구</li>
                    <li>개인정보 처리정지 요구</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    * 본 서비스는 세션 기반으로 운영되며, 브라우저를 종료하면 모든 개인정보가
                    자동으로 삭제됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 제6조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Lock className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제6조 (개인정보의 파기)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
                    때에는 지체없이 해당 개인정보를 파기합니다.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div>
                      <p className="font-semibold text-gray-900">파기 절차</p>
                      <p className="text-sm text-gray-700">
                        이용자가 입력한 정보는 목적 달성 후 즉시 파기됩니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">파기 방법</p>
                      <p className="text-sm text-gray-700">
                        전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 제7조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Mail className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제7조 (개인정보 보호책임자)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                    정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                    지정하고 있습니다.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">개인정보 보호책임자</p>
                    <ul className="space-y-1 text-gray-700">
                      <li>이름: 사주팔자 분석팀</li>
                      <li>연락처: 문의는 GitHub Issues를 통해 접수해주세요</li>
                      <li>
                        GitHub:{' '}
                        <a
                          href="https://github.com/Rio-Jang-Orbix/saju-mvp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          https://github.com/Rio-Jang-Orbix/saju-mvp
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 제8조 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Shield className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">제8조 (개인정보 처리방침 변경)</h2>
                <div className="mz-body space-y-3">
                  <p>
                    이 개인정보 처리방침은 2025년 1월 21일부터 적용되며, 법령 및 방침에 따른 변경
                    내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을
                    통하여 고지할 것입니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mz-button mz-button-outline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
