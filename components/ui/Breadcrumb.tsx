import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // 홈을 첫 번째 항목으로 자동 추가
  const fullItems: BreadcrumbItem[] = [
    { name: '홈', url: '/' },
    ...items,
  ]

  return (
    <nav
      aria-label="breadcrumb"
      className="mb-6 text-sm"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center flex-wrap gap-2">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1

          return (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              {index === 0 && (
                <Link
                  href={item.url}
                  itemProp="item"
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <Home size={16} />
                  <span itemProp="name" className="sr-only">{item.name}</span>
                </Link>
              )}

              {index > 0 && !isLast && (
                <>
                  <ChevronRight size={16} className="text-gray-400" />
                  <Link
                    href={item.url}
                    itemProp="item"
                    className="text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                </>
              )}

              {index > 0 && isLast && (
                <>
                  <ChevronRight size={16} className="text-gray-400" />
                  <span
                    itemProp="name"
                    className="text-gray-700 font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                </>
              )}

              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': fullItems.map((item, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': item.name,
              'item': `${process.env.NEXT_PUBLIC_APP_URL || ''}${item.url}`,
            })),
          }),
        }}
      />
    </nav>
  )
}

// 사전 정의된 경로별 Breadcrumb
export const breadcrumbConfigs = {
  '/analyze': [{ name: '사주 분석', url: '/analyze' }],
  '/compatibility': [{ name: '궁합 분석', url: '/compatibility' }],
  '/compatibility/result': [
    { name: '궁합 분석', url: '/compatibility' },
    { name: '분석 결과', url: '/compatibility/result' },
  ],
  '/fortune': [{ name: '월운 · 일운', url: '/fortune' }],
  '/onboarding': [{ name: '온보딩', url: '/onboarding' }],
  '/privacy': [{ name: '개인정보처리방침', url: '/privacy' }],
  '/terms': [{ name: '이용약관', url: '/terms' }],
  '/cookies': [{ name: '쿠키 정책', url: '/cookies' }],
  '/company': [{ name: '회사 소개', url: '/company' }],
}
