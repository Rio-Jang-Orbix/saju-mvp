# 🚀 Luvo MVP - Deployment Guide

완전한 AI 기반 연애 상담 서비스의 배포 가이드입니다.

## 📋 배포 준비사항

### 1. 환경 변수 설정
```bash
cp .env.example .env.local
```

필수 환경 변수를 설정하세요:

#### 🤖 OpenAI (AI 분석 기능)
- **필수도**: 높음
- **용도**: 실제 대화 분석 및 답장 생성
- **설정**: https://platform.openai.com/api-keys

#### 🗄️ Supabase (데이터베이스)
- **필수도**: 중간 (Mock 데이터로 대체 가능)
- **용도**: 사용자 데이터 저장, 분석 결과 보관
- **설정**: https://supabase.com/dashboard

#### 💳 Stripe (결제 시스템)
- **필수도**: 낮음 (무료 버전으로 운영 가능)
- **용도**: 프리미엄 기능 결제
- **설정**: https://dashboard.stripe.com/apikeys

### 2. 데이터베이스 설정 (Supabase)
1. Supabase 프로젝트 생성
2. SQL 에디터에서 `lib/db/schema.sql` 실행
3. 환경 변수에 URL과 키 설정

## 🌐 배포 옵션

### Option 1: Vercel (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
# ... 기타 환경 변수들

# 프로덕션 배포
vercel --prod
```

### Option 2: Netlify
```bash
# 빌드
npm run build

# Netlify CLI로 배포
npx netlify deploy --prod --dir=.next
```

### Option 3: 자체 서버 (VPS/EC2)
```bash
# PM2로 프로세스 관리
npm install -g pm2

# 빌드
npm run build

# PM2로 실행
pm2 start npm --name "luvo-mvp" -- start

# 영구 실행 설정
pm2 startup
pm2 save
```

## 🔧 성능 최적화

### 1. 빌드 최적화
```bash
# 프로덕션 빌드
npm run build

# 빌드 분석
npm run analyze
```

### 2. 캐싱 설정
- Next.js 자동 정적 최적화 활용
- CDN 캐싱 (Vercel Edge Network 권장)
- 이미지 최적화 (Next.js Image 컴포넌트 사용)

### 3. 모니터링
```bash
# 성능 모니터링 도구
- Vercel Analytics
- Google Analytics
- Sentry (에러 추적)
```

## 🔒 보안 설정

### 1. 환경 변수 보안
- `.env.local` 파일은 절대 커밋하지 않음
- 프로덕션에서는 플랫폼별 환경 변수 관리 도구 사용

### 2. API 키 권한 제한
- OpenAI: 최소 필요 권한만 부여
- Supabase: RLS 정책 활성화 상태 유지
- Stripe: 테스트 키로 시작, 필요시 프로덕션 키로 변경

### 3. CORS 설정
```javascript
// next.config.js에서 필요시 CORS 설정
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
        ],
      },
    ]
  },
}
```

## 📊 배포 후 체크리스트

### ✅ 기능 테스트
- [ ] 홈페이지 로딩
- [ ] 온보딩 플로우 완료
- [ ] 대화 분석 기능
- [ ] 답장 제안 생성
- [ ] 데이트 플랜 표시
- [ ] 결제 기능 (설정한 경우)

### ✅ 성능 테스트
- [ ] 페이지 로딩 속도 (< 3초)
- [ ] 모바일 반응형 확인
- [ ] SEO 메타 태그 확인

### ✅ 보안 체크
- [ ] 환경 변수 노출 여부
- [ ] API 엔드포인트 보안
- [ ] HTTPS 적용 확인

## 🚨 문제 해결

### 빌드 에러
```bash
# 캐시 클리어
rm -rf .next node_modules
npm install
npm run build
```

### 환경 변수 문제
```bash
# 환경 변수 확인
echo $OPENAI_API_KEY
echo $NEXT_PUBLIC_SUPABASE_URL
```

### 데이터베이스 연결 문제
- Supabase 프로젝트 상태 확인
- RLS 정책 설정 확인
- 네트워크 접근 권한 확인

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 환경 변수 설정
2. 빌드 로그 확인
3. 브라우저 개발자 도구 콘솔
4. 서버 로그 (배포 플랫폼별)

---

**성공적인 배포를 위한 팁**: 먼저 환경 변수 없이 Mock 데이터로 배포해서 기본 기능을 확인한 후, 점진적으로 실제 서비스들을 연동하는 것을 권장합니다.