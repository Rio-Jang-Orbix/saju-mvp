import Link from 'next/link'
import { Metadata } from 'next'
import { Cookie, Settings, Info, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '쿠키 정책',
  description: '사주팔자 분석 서비스의 쿠키 사용 정책입니다.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen mz-bg py-12">
      <div className="mz-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Cookie className="text-purple-600" size={40} />
          </div>
          <h1 className="mz-heading-1 mb-4">쿠키 정책</h1>
          <p className="mz-body">
            사주팔자 분석 서비스의 쿠키 사용에 대한 정보를 제공합니다.
          </p>
          <p className="text-sm text-gray-500 mt-4">최종 업데이트: 2025년 1월 21일</p>
        </div>

        {/* Content */}
        <div className="mz-card space-y-8">
          {/* 쿠키란? */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Info className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">쿠키란 무엇인가요?</h2>
                <div className="mz-body space-y-3">
                  <p>
                    쿠키(Cookie)는 웹사이트를 방문할 때 브라우저에 저장되는 작은 텍스트 파일입니다.
                    쿠키는 웹사이트가 사용자의 방문 정보를 기억하고, 더 나은 사용자 경험을 제공하는 데
                    사용됩니다.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      💡 쿠키는 사용자의 컴퓨터에 저장되며, 개인을 직접 식별하는 정보를 포함하지
                      않습니다. 쿠키를 통해 수집된 정보는 서비스 개선 및 사용자 경험 향상을 위해서만
                      사용됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 사용하는 쿠키 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">우리가 사용하는 쿠키</h2>
                <div className="mz-body space-y-4">
                  <p>본 서비스에서는 다음과 같은 쿠키를 사용합니다:</p>

                  {/* 필수 쿠키 */}
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 size={20} className="text-purple-600" />
                      필수 쿠키 (Strictly Necessary Cookies)
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      웹사이트의 기본 기능을 제공하는 데 필요한 쿠키입니다. 이 쿠키가 없으면
                      서비스를 제공할 수 없습니다.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                      <li>세션 관리 쿠키</li>
                      <li>보안 쿠키</li>
                      <li>사용자 입력 데이터 임시 저장</li>
                    </ul>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-xs text-gray-600">
                      <p>
                        <strong>보관 기간:</strong> 세션 종료 시 자동 삭제
                      </p>
                      <p>
                        <strong>거부 가능 여부:</strong> 필수 쿠키로 거부 불가
                      </p>
                    </div>
                  </div>

                  {/* 기능 쿠키 */}
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Settings size={20} className="text-blue-600" />
                      기능 쿠키 (Functionality Cookies)
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      사용자가 선택한 옵션과 설정을 기억하여 더 나은 사용자 경험을 제공합니다.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                      <li>언어 및 지역 설정</li>
                      <li>폰트 크기 설정</li>
                      <li>테마 설정 (라이트/다크 모드)</li>
                    </ul>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-xs text-gray-600">
                      <p>
                        <strong>보관 기간:</strong> 최대 1년
                      </p>
                      <p>
                        <strong>거부 가능 여부:</strong> 거부 가능 (브라우저 설정)
                      </p>
                    </div>
                  </div>

                  {/* 분석 쿠키 */}
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Info size={20} className="text-green-600" />
                      분석 쿠키 (Analytics Cookies)
                    </h3>
                    <p className="text-sm text-gray-700 mb-2">
                      사용자가 웹사이트를 어떻게 이용하는지에 대한 정보를 수집하여 서비스를 개선하는 데
                      사용됩니다.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                      <li>방문 페이지 및 이용 패턴</li>
                      <li>체류 시간</li>
                      <li>클릭 이벤트</li>
                      <li>오류 발생 정보</li>
                    </ul>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-xs text-gray-600">
                      <p>
                        <strong>보관 기간:</strong> 최대 2년
                      </p>
                      <p>
                        <strong>거부 가능 여부:</strong> 거부 가능 (브라우저 설정)
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-gray-700">
                      ℹ️ 본 서비스는 마케팅 쿠키나 타겟팅 쿠키를 사용하지 않습니다. 광고 추적이나
                      개인화 광고를 위한 쿠키는 수집되지 않습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 쿠키 관리 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Settings className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">쿠키 관리 및 거부</h2>
                <div className="mz-body space-y-3">
                  <p>
                    사용자는 쿠키 설정을 통해 쿠키 사용을 거부하거나 관리할 수 있습니다. 단, 필수
                    쿠키를 거부할 경우 서비스 이용이 제한될 수 있습니다.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">브라우저별 쿠키 설정 방법</p>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-gray-800">Chrome</p>
                          <p className="text-gray-600">
                            설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">Safari</p>
                          <p className="text-gray-600">환경설정 → 개인정보 → 쿠키 및 웹사이트 데이터</p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">Firefox</p>
                          <p className="text-gray-600">
                            옵션 → 개인정보 및 보안 → 쿠키 및 사이트 데이터
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">Edge</p>
                          <p className="text-gray-600">
                            설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리 및 삭제
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900 mb-2">모바일 브라우저</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="font-medium text-gray-800">iOS Safari</p>
                          <p className="text-gray-600">
                            설정 → Safari → 개인정보 보호 및 보안 → 모든 쿠키 차단
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">Android Chrome</p>
                          <p className="text-gray-600">
                            설정 → 사이트 설정 → 쿠키
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 쿠키 정책 변경 */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Info className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="mz-heading-3 mb-4">쿠키 정책 변경</h2>
                <div className="mz-body space-y-3">
                  <p>
                    본 쿠키 정책은 법령 및 서비스 정책 변경에 따라 수정될 수 있습니다. 쿠키 정책이
                    변경되는 경우, 변경 사항은 본 페이지를 통해 공지됩니다.
                  </p>
                  <p className="text-sm text-gray-600">
                    정기적으로 이 페이지를 확인하여 최신 쿠키 정책을 숙지하시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 문의 */}
          <section className="bg-purple-50 p-6 rounded-lg">
            <h2 className="mz-heading-4 mb-3">문의하기</h2>
            <p className="mz-body mb-3">
              쿠키 정책에 대해 궁금한 사항이나 문의사항이 있으시면 언제든지 연락해주세요.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">회사명:</strong> Orbix
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">이메일:</strong>{' '}
                <a
                  href="mailto:orbix.partners@gmail.com"
                  className="text-purple-600 hover:underline"
                >
                  orbix.partners@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">GitHub:</strong>{' '}
                <a
                  href="https://github.com/Rio-Jang-Orbix/saju-mvp/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  Issues로 문의하기 →
                </a>
              </p>
            </div>
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
