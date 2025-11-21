# Google Search Console 설정 가이드

Google Search Console을 통해 사이트의 검색 성능을 모니터링하고 최적화할 수 있습니다.

## 1. Google Search Console 등록

### 1단계: Search Console 접속
1. [Google Search Console](https://search.google.com/search-console) 접속
2. Google 계정으로 로그인
3. "속성 추가" 버튼 클릭

### 2단계: 속성 유형 선택
두 가지 방법 중 하나를 선택:

#### 방법 A: 도메인 속성 (권장)
- 모든 하위 도메인과 프로토콜(http, https)을 포함
- DNS TXT 레코드로 소유권 확인 필요

**확인 방법:**
1. 제공된 TXT 레코드를 도메인 DNS 설정에 추가
2. Vercel을 사용하는 경우:
   - Vercel Dashboard → 프로젝트 → Settings → Domains
   - DNS Records에 TXT 레코드 추가
3. "확인" 버튼 클릭

#### 방법 B: URL 접두어
- 특정 URL만 포함 (예: https://yourdomain.com)
- 여러 확인 방법 제공

**확인 방법 (추천순):**
1. **HTML 파일 업로드**: 제공된 HTML 파일을 `/public` 폴더에 저장
2. **HTML 태그**: `<meta>` 태그를 `app/layout.tsx`의 `<head>`에 추가
3. **Google Analytics**: GA4 계정 연결
4. **Google Tag Manager**: GTM 컨테이너 연결

## 2. 사이트맵 제출

### 사이트맵 URL 등록
Search Console 좌측 메뉴 → "색인 생성" → "Sitemaps"

다음 사이트맵을 제출:
```
https://yourdomain.com/sitemap.xml
https://yourdomain.com/image-sitemap.xml
```

### 사이트맵 상태 확인
- 제출 후 며칠 내에 "성공" 상태로 변경됨
- 에러 발생 시 상세 내용 확인 및 수정

## 3. robots.txt 검증

Search Console → "설정" → "robots.txt 테스터"에서 검증
- 현재 `/robots.txt`가 올바르게 설정되어 있는지 확인
- 중요 페이지가 차단되지 않았는지 확인

## 4. URL 검사 도구 활용

### 개별 페이지 색인 요청
1. Search Console 상단 검색창에 URL 입력
2. "색인 생성 요청" 클릭
3. 중요 페이지 우선 요청:
   - `/` (메인 페이지)
   - `/analyze` (사주 분석)
   - `/compatibility` (궁합 분석)
   - `/fortune` (운세)
   - `/faq` (자주 묻는 질문)

## 5. 구조화된 데이터 확인

Search Console → "개선" → "구조화된 데이터"
- BreadcrumbList 확인
- LocalBusiness 확인
- WebApplication 확인
- 에러가 있는 경우 수정

## 6. 모바일 사용성 확인

Search Console → "개선" → "모바일 사용성"
- 모바일 친화적인지 확인
- 문제가 있는 경우 수정

## 7. Core Web Vitals 모니터링

Search Console → "환경" → "Core Web Vitals"
- LCP (Largest Contentful Paint): 2.5초 이하 목표
- FID (First Input Delay): 100ms 이하 목표
- CLS (Cumulative Layout Shift): 0.1 이하 목표

성능 개선이 필요한 URL 확인 및 최적화

## 8. 검색 성능 분석

Search Console → "실적"에서 확인:
- **총 클릭수**: 검색 결과에서 사이트를 클릭한 횟수
- **총 노출수**: 검색 결과에 사이트가 표시된 횟수
- **평균 CTR**: 클릭률 (클릭수/노출수)
- **평균 게재순위**: 검색 결과에서의 평균 위치

### 주요 분석 지표
- 높은 노출, 낮은 CTR → 제목/설명 개선 필요
- 높은 순위, 낮은 노출 → 키워드 확장 필요
- 낮은 순위 → SEO 최적화 필요

## 9. 주요 검색 쿼리 모니터링

추적할 주요 키워드:
- 사주팔자
- 사주 보기
- 무료 사주
- 사주 풀이
- AI 사주
- 운세
- 궁합 보기
- 사주 궁합
- 무료 운세
- 사주 계산

## 10. 정기 모니터링 체크리스트

### 주간 체크
- [ ] 검색 성능 지표 확인 (클릭, 노출, CTR, 순위)
- [ ] 새로운 색인 에러 확인
- [ ] Core Web Vitals 지표 확인

### 월간 체크
- [ ] 상위 검색 쿼리 분석
- [ ] 구조화된 데이터 에러 확인
- [ ] 모바일 사용성 확인
- [ ] 사이트맵 상태 확인
- [ ] 크롤링 통계 확인

### 분기별 체크
- [ ] 검색 트렌드 분석
- [ ] 경쟁사 키워드 분석
- [ ] SEO 전략 수정
- [ ] 콘텐츠 최적화 계획

## 11. 문제 해결

### 사이트가 색인되지 않는 경우
1. robots.txt 확인 → 차단 여부 확인
2. 사이트맵 제출 확인
3. 수동으로 URL 색인 요청
4. 기술적 SEO 문제 확인 (404, 5xx 에러)

### 순위가 낮은 경우
1. 키워드 연관성 확인
2. 콘텐츠 품질 개선
3. 페이지 속도 최적화
4. 모바일 최적화 확인
5. 백링크 확보 전략

### Core Web Vitals 불량
1. 이미지 최적화 (WebP, lazy loading)
2. JavaScript 번들 크기 줄이기
3. CSS 최적화
4. 서버 응답 시간 개선
5. 레이아웃 시프트 제거

## 12. 고급 설정

### 국가별 타겟팅 (한국 중심)
Search Console → "설정" → "국가"에서 한국 설정

### 주소 변경 (도메인 이전 시)
Search Console → "설정" → "주소 변경"에서 리디렉션 설정

## 참고 자료

- [Google Search Console 고객센터](https://support.google.com/webmasters)
- [Google 검색 가이드라인](https://developers.google.com/search/docs)
- [구조화된 데이터 테스트 도구](https://search.google.com/test/rich-results)
- [모바일 친화성 테스트](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)
