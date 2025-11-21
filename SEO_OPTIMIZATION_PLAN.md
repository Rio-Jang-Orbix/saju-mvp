# 사주팔자 분석 서비스 - SEO 고도화 전략서

## 현재 상태 분석

### ✅ 완료된 SEO 작업
- [x] 기본 메타데이터 (title, description, keywords)
- [x] Open Graph 메타태그
- [x] Twitter Card
- [x] Sitemap.xml (10개 페이지)
- [x] Robots.txt
- [x] Canonical URL
- [x] 구조화된 데이터 (WebApplication, FAQPage, HowTo)
- [x] 이미지 최적화 설정 (AVIF, WebP)
- [x] 보안 헤더 (X-Frame-Options, CSP)

### ⏳ 개선 필요 영역
- [ ] 구조화된 데이터 확장
- [ ] 네이버 검색 최적화
- [ ] Favicon 다양화
- [ ] 이미지 SEO
- [ ] Core Web Vitals 최적화
- [ ] 내부 링크 구조
- [ ] 콘텐츠 마케팅

---

## 🎯 1단계: 즉시 적용 가능한 개선사항

### 1.1 구조화된 데이터 확장

#### BreadcrumbList 추가
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "홈",
    "item": "https://your-domain.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "사주 분석",
    "item": "https://your-domain.com/analyze"
  }]
}
```

**적용 위치**: 모든 페이지 `layout.tsx` 또는 개별 페이지

**효과**:
- Google 검색 결과에 breadcrumb 표시
- 사이트 구조 명확화
- CTR 5-10% 증가 예상

---

#### LocalBusiness 스키마 추가
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "사주팔자 분석 by Orbix",
  "image": "https://your-domain.com/og-image.png",
  "@id": "https://your-domain.com",
  "url": "https://your-domain.com",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR",
    "addressRegion": "서울"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.5665,
    "longitude": 126.9780
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://github.com/Rio-Jang-Orbix/saju-mvp"
  ]
}
```

**효과**:
- Google Maps 노출 가능
- 로컬 검색 결과 개선
- "내 근처" 검색 최적화

---

### 1.2 네이버 검색 최적화

#### 네이버 웹마스터 도구 설정
```typescript
// app/layout.tsx 메타데이터 추가
export const metadata: Metadata = {
  // 기존 메타데이터...
  verification: {
    google: 'your-google-verification-code',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
  },
}
```

#### 네이버 블로그 체계 메타태그
```html
<!-- 네이버 특화 Open Graph -->
<meta property="og:article:author" content="Orbix" />
<meta property="article:published_time" content="2025-01-21T00:00:00+09:00" />
<meta property="article:section" content="운세" />
<meta property="article:tag" content="사주, 운세, 명리학" />
```

**필요 작업**:
1. 네이버 웹마스터 도구 등록 (https://searchadvisor.naver.com)
2. 사이트 소유 확인
3. 사이트맵 제출
4. 검색 반영 신청

**예상 효과**:
- 네이버 통합검색 노출
- 한국 트래픽 30-40% 증가 예상
- 네이버 지식iN 연동 가능

---

### 1.3 Favicon 및 App Icon 개선

#### 현재 상태
- ❌ favicon.ico 없음
- ✅ favicon.svg 있음
- ❌ apple-touch-icon 없음
- ❌ manifest.json 없음

#### 개선 계획
```typescript
// app/layout.tsx에 추가할 메타데이터
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}
```

#### 필요한 이미지 파일
- `public/favicon.ico` - 32x32
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png` - 180x180
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

**효과**:
- 브라우저 탭에서 브랜드 인식 강화
- iOS/Android 홈 화면 추가 시 고품질 아이콘
- PWA 준비 완료

---

### 1.4 이미지 SEO 최적화

#### 이미지 sitemap 생성
```typescript
// app/image-sitemap.xml/route.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'

  return [
    {
      url: `${baseUrl}/og-image.png`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 다른 이미지들 추가
  ]
}
```

#### 이미지 최적화 체크리스트
- [ ] 모든 `<img>` 태그에 `alt` 속성 추가
- [ ] 파일명을 의미있는 이름으로 변경 (saju-analysis.png)
- [ ] 이미지 크기 최적화 (1200x630 for OG)
- [ ] WebP/AVIF 포맷 사용
- [ ] Lazy loading 적용

---

## 🎯 2단계: 성능 최적화

### 2.1 Core Web Vitals 개선

#### LCP (Largest Contentful Paint) 최적화
```typescript
// next.config.ts
{
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}
```

#### CLS (Cumulative Layout Shift) 최적화
- 모든 이미지에 `width`와 `height` 명시
- 폰트 로딩 최적화 (`font-display: swap`)

#### FID (First Input Delay) 최적화
- JavaScript 번들 크기 최적화
- Code splitting 강화

**목표**:
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

### 2.2 리소스 프리로드

```typescript
// app/layout.tsx의 <head>에 추가
<head>
  {/* 폰트 프리로드 */}
  <link
    rel="preload"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
    as="style"
  />

  {/* DNS 프리페치 */}
  <link rel="dns-prefetch" href="https://api.openai.com" />
  <link rel="dns-prefetch" href="https://vercel.com" />

  {/* 프리커넥트 */}
  <link rel="preconnect" href="https://api.openai.com" />
</head>
```

---

## 🎯 3단계: 콘텐츠 SEO

### 3.1 내부 링크 구조 개선

#### Breadcrumb 컴포넌트 추가
```typescript
// components/ui/Breadcrumb.tsx
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <a itemProp="item" href={item.url}>
              <span itemProp="name">{item.name}</span>
            </a>
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

#### 관련 페이지 링크
- 사주 분석 → 궁합 분석, 월운·일운
- 궁합 분석 → 사주 분석
- 결과 페이지 → 다시 분석하기, 다른 기능 시도

---

### 3.2 FAQ 페이지 확장

현재 `layout.tsx`에 4개 FAQ 있음 → 독립 페이지로 확장

```typescript
// app/faq/page.tsx
export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ)',
  description: '사주팔자 분석 서비스에 대한 자주 묻는 질문과 답변입니다.',
}

// 20-30개의 FAQ 항목 추가
```

**추가할 FAQ 주제**:
- 사주 계산 방법
- 음력/양력 차이
- AI 정확도
- 개인정보 보호
- 결제 관련
- 결과 저장/공유

---

### 3.3 블로그/콘텐츠 섹션 추가

```
/blog
├── /saju-basics          # 사주 기초 지식
├── /fortune-tips         # 운세 활용법
├── /compatibility-guide  # 궁합 가이드
└── /case-studies         # 사례 연구
```

**SEO 효과**:
- 롱테일 키워드 확보
- 자연스러운 백링크 유도
- 검색 노출 페이지 증가
- 전문성/권위성 향상

---

## 🎯 4단계: 기술적 SEO

### 4.1 Sitemap 확장

#### 동적 sitemap 생성
```typescript
// app/sitemap.xml/route.ts
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  // 정적 페이지
  const staticPages = [...]

  // 동적 페이지 (블로그 포스트 등)
  const blogPosts = await getBlogPosts()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(page => `
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
      ${blogPosts.map(post => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
```

---

### 4.2 다국어 지원 준비

```typescript
// app/[lang]/layout.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      'ko': '/ko',
      'en': '/en',
    },
  },
}
```

```html
<!-- 각 페이지 <head>에 추가 -->
<link rel="alternate" hreflang="ko" href="https://your-domain.com/ko" />
<link rel="alternate" hreflang="en" href="https://your-domain.com/en" />
<link rel="alternate" hreflang="x-default" href="https://your-domain.com" />
```

---

## 📊 SEO 측정 지표

### Google Search Console 모니터링
- 클릭 수
- 노출 수
- CTR (Click-Through Rate)
- 평균 게재 순위
- Core Web Vitals

### 목표 KPI
| 지표 | 현재 | 3개월 목표 |
|------|------|-----------|
| 유기적 방문자 | - | 1,000/월 |
| 평균 게재 순위 | - | Top 10 |
| 사이트 속도 (LCP) | - | < 2.5s |
| CTR | - | > 3% |

---

## 🛠️ 구현 우선순위

### Phase 1 (1-2주)
1. ✅ Favicon 다양화
2. ✅ BreadcrumbList 스키마 추가
3. ✅ 네이버 웹마스터 등록
4. ✅ 이미지 alt 속성 추가

### Phase 2 (3-4주)
1. ⏳ LocalBusiness 스키마 추가
2. ⏳ 이미지 sitemap 생성
3. ⏳ Breadcrumb 컴포넌트 구현
4. ⏳ FAQ 페이지 확장

### Phase 3 (5-8주)
1. ⏳ 블로그 섹션 구축
2. ⏳ Core Web Vitals 최적화
3. ⏳ 다국어 지원 (영어)
4. ⏳ 콘텐츠 마케팅 시작

---

## 💡 추가 권장사항

### A. 백링크 전략
- 명리학 커뮤니티 참여
- 사주 관련 포럼 활동
- 게스트 포스팅
- 인플루언서 협업

### B. 소셜 미디어 최적화
- 인스타그램 운세 계정
- 유튜브 사주 해설 영상
- 네이버 블로그 운영
- 카카오톡 채널 개설

### C. 사용자 경험 개선
- 로딩 스피너 개선
- 애니메이션 최적화
- 오류 메시지 명확화
- 결과 공유 기능 강화

### D. 분석 도구 설정
- Google Analytics 4
- Google Search Console
- Naver Analytics
- Hotjar (히트맵)

---

## 📚 참고 자료

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org)
- [Naver 검색등록 가이드](https://searchadvisor.naver.com/guide)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)

---

## 📝 체크리스트

### 즉시 적용 가능
- [ ] favicon.ico 생성
- [ ] apple-touch-icon.png 생성
- [ ] BreadcrumbList 스키마 추가
- [ ] 네이버 웹마스터 등록
- [ ] 이미지 alt 속성 전체 점검
- [ ] LocalBusiness 스키마 추가

### 단계적 구현
- [ ] Breadcrumb 컴포넌트 구현
- [ ] FAQ 페이지 독립
- [ ] 이미지 sitemap 생성
- [ ] 블로그 섹션 구축
- [ ] 다국어 지원 추가

### 지속적 관리
- [ ] 주간 검색 순위 모니터링
- [ ] 월간 콘텐츠 업데이트
- [ ] 분기별 SEO 감사
- [ ] 백링크 확보 활동

---

**작성일**: 2025-01-22
**작성자**: Claude Code
**버전**: 1.0
