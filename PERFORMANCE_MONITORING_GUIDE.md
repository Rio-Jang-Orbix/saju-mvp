# 성능 모니터링 가이드

이 가이드는 사주팔자 분석 서비스의 성능 모니터링 시스템 설정 및 사용 방법을 설명합니다.

## 목차
1. [Google Analytics 4 설정](#1-google-analytics-4-설정)
2. [Google Search Console 설정](#2-google-search-console-설정)
3. [Core Web Vitals 모니터링](#3-core-web-vitals-모니터링)
4. [이벤트 추적](#4-이벤트-추적)
5. [성능 지표 분석](#5-성능-지표-분석)
6. [문제 해결](#6-문제-해결)

---

## 1. Google Analytics 4 설정

### 1.1 Google Analytics 계정 생성

1. [Google Analytics](https://analytics.google.com/) 접속
2. "관리" → "계정 만들기" 클릭
3. 계정 이름 입력 (예: "사주팔자 분석")
4. "속성 만들기" 클릭
5. 속성 이름 입력 (예: "Saju MVP")
6. 보고 시간대: "대한민국 시간" 선택
7. 통화: "대한민국 원" 선택
8. "다음" 클릭

### 1.2 데이터 스트림 생성

1. 플랫폼 선택: "웹" 선택
2. 웹사이트 URL 입력: `https://yourdomain.com`
3. 스트림 이름 입력: "사주팔자 분석 웹"
4. "스트림 만들기" 클릭
5. **측정 ID 복사** (예: `G-XXXXXXXXXX`)

### 1.3 환경 변수 설정

`.env.local` 파일 생성 및 측정 ID 추가:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # 여기에 실제 측정 ID 입력
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**주의**: `.env.local`은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.

### 1.4 Vercel 환경 변수 설정 (프로덕션)

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. "Settings" → "Environment Variables" 클릭
4. 새 환경 변수 추가:
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXXXXXXXXX` (실제 측정 ID)
   - **Environment**: Production 선택
5. "Save" 클릭
6. 프로젝트 재배포

### 1.5 동작 확인

1. 프로덕션 사이트 접속
2. 브라우저 개발자 도구 → Network 탭
3. `gtag/js` 요청 확인
4. Google Analytics 실시간 보고서에서 접속 확인

---

## 2. Google Search Console 설정

자세한 설정 방법은 [`GOOGLE_SEARCH_CONSOLE_SETUP.md`](./GOOGLE_SEARCH_CONSOLE_SETUP.md) 참조

### 2.1 빠른 설정

1. [Google Search Console](https://search.google.com/search-console) 접속
2. "속성 추가" → "URL 접두어" 선택
3. 사이트 URL 입력: `https://yourdomain.com`
4. 소유권 확인 방법 선택:
   - **HTML 태그** (권장): `app/layout.tsx`의 metadata에 추가
   - **HTML 파일**: `public/` 폴더에 확인 파일 추가
   - **Google Analytics**: GA4 계정 연결

### 2.2 사이트맵 제출

1. Search Console → "Sitemaps" 메뉴
2. 다음 사이트맵 제출:
   ```
   https://yourdomain.com/sitemap.xml
   https://yourdomain.com/image-sitemap.xml
   ```

---

## 3. Core Web Vitals 모니터링

### 3.1 Core Web Vitals 지표

이미 구현된 `WebVitals` 컴포넌트가 자동으로 다음 지표를 추적합니다:

#### LCP (Largest Contentful Paint)
- **설명**: 페이지의 주요 콘텐츠가 화면에 렌더링되는 시간
- **목표**: 2.5초 이하
- **개선 방법**:
  - 이미지 최적화 (WebP, 압축)
  - Lazy loading 적용
  - CDN 사용
  - 서버 응답 시간 개선

#### FID (First Input Delay)
- **설명**: 사용자가 페이지와 처음 상호작용할 때까지의 지연 시간
- **목표**: 100ms 이하
- **개선 방법**:
  - JavaScript 실행 시간 줄이기
  - 코드 분할 (Code Splitting)
  - 메인 스레드 작업 최소화

#### CLS (Cumulative Layout Shift)
- **설명**: 페이지 로드 중 예상치 못한 레이아웃 변화
- **목표**: 0.1 이하
- **개선 방법**:
  - 이미지/비디오에 width, height 명시
  - 폰트 로딩 최적화
  - 동적 콘텐츠 삽입 최소화

#### FCP (First Contentful Paint)
- **설명**: 첫 번째 콘텐츠가 화면에 렌더링되는 시간
- **목표**: 1.8초 이하

#### TTFB (Time to First Byte)
- **설명**: 브라우저가 서버로부터 첫 바이트를 받는 시간
- **목표**: 600ms 이하

#### INP (Interaction to Next Paint)
- **설명**: 사용자 상호작용 후 다음 화면 업데이트까지의 시간
- **목표**: 200ms 이하

### 3.2 실시간 모니터링

#### 개발 환경
개발 서버 실행 시 콘솔에서 Web Vitals 확인:
```bash
npm run dev
```
브라우저 콘솔에 다음과 같이 표시됩니다:
```
Web Vitals: {
  name: 'LCP',
  value: 1234.5,
  id: 'v3-1234567890',
  rating: 'good'
}
```

#### 프로덕션 환경
Google Analytics에서 확인:
1. GA4 → "보고서" → "참여" → "이벤트"
2. Web Vitals 이벤트 필터링:
   - `CLS`
   - `FID`
   - `FCP`
   - `LCP`
   - `TTFB`
   - `INP`

### 3.3 외부 도구 활용

#### PageSpeed Insights
1. [PageSpeed Insights](https://pagespeed.web.dev/) 접속
2. 사이트 URL 입력
3. "분석" 클릭
4. 모바일/데스크톱 성능 점수 확인
5. 개선 제안 사항 검토

#### Lighthouse
Chrome DevTools에서 실행:
1. F12 → "Lighthouse" 탭
2. Categories 선택 (Performance, SEO 등)
3. "Analyze page load" 클릭
4. 점수 및 개선 사항 확인

---

## 4. 이벤트 추적

### 4.1 구현된 이벤트

`lib/analytics.ts`에 다음 이벤트 추적 함수가 구현되어 있습니다:

#### 사주 분석 완료
```typescript
import { trackSajuAnalysis } from '@/lib/analytics'

// 사용 예시
trackSajuAnalysis('basic')  // 기본 사주 분석
trackSajuAnalysis('compatibility')  // 궁합 분석
trackSajuAnalysis('fortune')  // 운세 분석
```

#### 운세 조회
```typescript
import { trackFortuneView } from '@/lib/analytics'

// 사용 예시
trackFortuneView('daily')  // 일운
trackFortuneView('monthly')  // 월운
trackFortuneView('yearly')  // 연운
```

#### 궁합 분석
```typescript
import { trackCompatibilityAnalysis } from '@/lib/analytics'

// 사용 예시
trackCompatibilityAnalysis(85)  // 궁합 점수 85점
```

#### 에러 추적
```typescript
import { trackError } from '@/lib/analytics'

// 사용 예시
try {
  // 코드 실행
} catch (error) {
  trackError(error.message, 'SajuCalculation')
}
```

#### 공유 버튼 클릭
```typescript
import { trackShare } from '@/lib/analytics'

// 사용 예시
trackShare('kakao')  // 카카오톡 공유
trackShare('facebook')  // 페이스북 공유
trackShare('twitter')  // 트위터 공유
trackShare('link')  // 링크 복사
```

### 4.2 커스텀 이벤트 추가

새로운 이벤트를 추가하려면 `lib/analytics.ts`에 함수 추가:

```typescript
export const trackCustomEvent = (eventName: string, eventParams?: Record<string, any>) => {
  event({
    action: eventName,
    category: 'Custom',
    label: eventParams?.label,
    value: eventParams?.value,
  })
}
```

---

## 5. 성능 지표 분석

### 5.1 Google Analytics 보고서

#### 실시간 보고서
- 경로: GA4 → "보고서" → "실시간"
- 확인 항목:
  - 현재 활성 사용자 수
  - 사용자 위치
  - 활발한 페이지
  - 이벤트 수

#### 사용자 행동 분석
- 경로: GA4 → "보고서" → "참여"
- 확인 항목:
  - 페이지별 조회수
  - 평균 참여 시간
  - 이탈률
  - 전환율

#### 이벤트 분석
- 경로: GA4 → "보고서" → "참여" → "이벤트"
- 확인 항목:
  - 사주 분석 완료 횟수
  - 궁합 분석 이용률
  - 공유 버튼 클릭률
  - 에러 발생 빈도

#### 트래픽 소스
- 경로: GA4 → "보고서" → "획득"
- 확인 항목:
  - 유입 경로 (검색, 직접, 소셜, 추천)
  - 검색 키워드
  - 참조 사이트

### 5.2 주요 KPI (핵심 성과 지표)

#### 사용자 지표
- **일일 활성 사용자(DAU)**: 하루 동안 방문한 고유 사용자 수
- **월간 활성 사용자(MAU)**: 한 달 동안 방문한 고유 사용자 수
- **신규 vs 재방문 사용자 비율**: 서비스 성장성 파악

#### 참여 지표
- **평균 세션 시간**: 사용자가 사이트에 머문 평균 시간
- **페이지뷰/세션**: 한 번 방문 시 본 평균 페이지 수
- **이탈률**: 한 페이지만 보고 떠난 비율

#### 전환 지표
- **사주 분석 완료율**: 입력 폼 제출 성공률
- **공유 버튼 클릭률**: 결과 공유 비율
- **궁합 분석 이용률**: 기본 분석 후 궁합 분석 전환율

### 5.3 목표 설정

Google Analytics에서 주요 전환 목표 설정:

1. GA4 → "관리" → "이벤트"
2. "전환으로 표시" 토글 활성화
3. 전환 이벤트:
   - `saju_analysis_complete`
   - `compatibility_analysis`
   - `fortune_view`
   - `share`

---

## 6. 문제 해결

### 6.1 Google Analytics가 작동하지 않는 경우

#### 체크리스트
- [ ] `NEXT_PUBLIC_GA_ID` 환경 변수가 설정되어 있는가?
- [ ] 환경 변수에 `NEXT_PUBLIC_` 접두사가 있는가?
- [ ] 프로덕션 환경에서 테스트하고 있는가? (개발 환경에서는 비활성화)
- [ ] 브라우저의 광고 차단기가 비활성화되어 있는가?
- [ ] 브라우저가 최신 버전인가?

#### 디버깅
1. 브라우저 콘솔 열기 (F12)
2. Network 탭에서 `gtag/js` 요청 확인
3. 콘솔에서 다음 명령 실행:
   ```javascript
   console.log(window.gtag)  // function이 출력되어야 함
   ```

### 6.2 Web Vitals가 기록되지 않는 경우

#### 체크리스트
- [ ] `WebVitals` 컴포넌트가 `app/layout.tsx`에 추가되어 있는가?
- [ ] Google Analytics가 정상 작동하는가?
- [ ] 페이지 로드가 완료되었는가? (일부 지표는 시간이 걸림)

#### 디버깅
개발 환경에서 콘솔 확인:
```bash
npm run dev
```
페이지 로드 후 콘솔에 "Web Vitals: ..." 메시지가 출력되어야 합니다.

### 6.3 이벤트가 추적되지 않는 경우

#### 체크리스트
- [ ] 이벤트 추적 함수를 올바르게 import 했는가?
- [ ] 프로덕션 환경에서 테스트하고 있는가?
- [ ] Google Analytics가 정상 작동하는가?

#### 디버깅
브라우저 콘솔에서 수동으로 이벤트 발생:
```javascript
window.gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Manual Test',
})
```
GA4 실시간 보고서에서 이벤트 확인

### 6.4 성능이 낮은 경우

#### 이미지 최적화
```bash
# WebP 변환 (ImageMagick 사용)
convert image.png -quality 80 image.webp
```

#### JavaScript 번들 분석
```bash
# 번들 크기 분석
npm run build
```

#### 캐싱 확인
- Vercel의 Edge Network 캐싱 활용
- 정적 자산에 `Cache-Control` 헤더 설정

---

## 7. 참고 자료

### Google Analytics
- [Google Analytics 4 공식 문서](https://support.google.com/analytics/answer/9304153)
- [GA4 이벤트 가이드](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 측정 프로토콜](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

### Core Web Vitals
- [Web Vitals 공식 사이트](https://web.dev/vitals/)
- [Chrome UX Report](https://developers.google.com/web/tools/chrome-user-experience-report)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Next.js 성능 최적화
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Next.js Analytics](https://nextjs.org/analytics)
- [Vercel Analytics](https://vercel.com/docs/analytics)

### 도구
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 8. 정기 모니터링 루틴

### 일일 체크
- [ ] GA4 실시간 보고서 확인
- [ ] 에러 이벤트 확인
- [ ] 주요 전환 지표 확인

### 주간 체크
- [ ] 사용자 트래픽 분석
- [ ] 페이지별 성능 확인
- [ ] 이벤트 통계 분석
- [ ] Core Web Vitals 점수 확인

### 월간 체크
- [ ] 월간 보고서 생성
- [ ] 트렌드 분석 (사용자 증가율, 전환율 변화)
- [ ] 경쟁사 벤치마킹
- [ ] SEO 성과 분석
- [ ] 성능 최적화 계획 수립

---

**마지막 업데이트**: 2025-11-22
**작성자**: Saju MVP Team
