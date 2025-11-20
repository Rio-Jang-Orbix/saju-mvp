# 🔮 사주 분석 MVP - AI 기반 사주팔자 해석 플랫폼

> **현재 상태**: ✅ 기본 기능 구현 완료 - 바로 사용 가능!

AI 기반 사주팔자 분석으로 운명을 알아보는 웹 애플리케이션입니다.

![사주 분석 앱](https://via.placeholder.com/1200x600/4c1d95/ffffff?text=Saju+Analysis+App)

## ✨ 구현 완료된 기능

### 🎯 **현재 제공되는 기능**
- ✅ **📅 생년월일시 입력**: 양력/음력 선택 가능한 입력 폼
- ✅ **🔢 사주팔자 계산**: 천간지지 기반 사주 자동 계산
- ✅ **🌈 오행 분석**: 목화토금수 5가지 원소 분석 및 시각화
- ✅ **🤖 AI 기반 해석**: OpenAI GPT를 활용한 상세한 운세 해석
- ✅ **📊 시각화**: 아름다운 차트와 그래프로 결과 표시
- ✅ **📱 반응형 디자인**: 모바일/데스크톱 완벽 지원
- ✅ **🎨 화려한 UI/UX**: 우주 테마의 신비로운 디자인
- ✅ **📤 결과 공유**: 클립보드 복사 및 네이티브 공유 기능

### 🎨 **사용자 경험**
- **우주 같은 배경**: 별이 빛나는 보라-분홍 그라데이션
- **글래스모피즘**: 반투명 블러 효과의 모던한 디자인
- **부드러운 애니메이션**: 페이드인, 슬라이드업, 플로팅 효과
- **인터랙티브 요소**: 호버 효과, 스케일 변화, 그라데이션 그림자

## 🚀 빠른 시작

### 로컬 개발 환경

```bash
# 프로젝트 디렉토리로 이동
cd saju-mvp

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 시작
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 환경 변수 설정 (선택사항)

`.env.local` 파일을 만들고 아래 내용을 추가하세요:

```bash
# OpenAI API (AI 해석 기능 사용시)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Supabase (사용자 인증 - 추후 구현)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe (결제 시스템 - 추후 구현)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_SECRET_KEY=sk_test_your-key
```

**참고**: OpenAI API 키가 없어도 Mock 데이터로 작동합니다!

## 🏗️ 기술 스택

### **Frontend**
- **Next.js 15.5.4** - React 19.1 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 CSS
- **Radix UI** - 접근성 우선 컴포넌트
- **Lucide React** - 아름다운 아이콘

### **Backend & Database**
- **API Routes** - Next.js 서버리스 함수
- **Supabase Ready** - 인증 및 데이터베이스 (추후 연동)

### **AI & 분석**
- **OpenAI GPT-4** - 사주 해석 엔진
- **korean-lunar-calendar** - 음력/양력 변환
- **커스텀 알고리즘** - 천간지지 계산

### **결제 (추후)**
- **Stripe** - 유료 결제 시스템

## 📁 프로젝트 구조

```
saju-mvp/
├── app/                      # Next.js App Router
│   ├── page.tsx             # 메인 페이지 (입력 폼)
│   ├── analyze/             # 분석 결과 페이지
│   │   └── page.tsx
│   ├── api/                 # API 엔드포인트
│   │   └── interpret-saju/  # AI 해석 API
│   └── layout.tsx           # 루트 레이아웃
├── components/              # 재사용 가능한 컴포넌트
│   └── ui/                  # 기본 UI 컴포넌트
├── lib/                     # 유틸리티 및 로직
│   ├── saju/               # 사주 관련 로직
│   │   ├── calculator.ts   # 사주 계산 엔진
│   │   └── share.ts        # 공유 기능
│   └── utils.ts            # 공통 유틸리티
└── types/                   # TypeScript 타입 정의
```

## 🎯 주요 기능 상세

### 1. 사주팔자 계산 (lib/saju/calculator.ts)

```typescript
// 생년월일시로 사주 계산
const result = calculateSaju(
  year,    // 년
  month,   // 월
  day,     // 일
  hour,    // 시
  minute,  // 분
  isLunar, // 음력 여부
  gender   // 성별
)

// 결과에 포함되는 정보:
// - 년주, 월주, 일주, 시주 (천간지지)
// - 오행 분석 (木火土金水 개수)
// - 입력한 생년월일시 정보
```

### 2. AI 해석 (app/api/interpret-saju/route.ts)

```typescript
// OpenAI GPT-4를 활용한 상세 해석
// - 성격 및 기질 분석
// - 오행 균형 분석
// - 적성 및 진로 조언
// - 대인관계 및 연애운
// - 재물운 및 건강운
// - 올해의 운세
// - 조언 및 당부사항
```

### 3. 공유 기능 (lib/saju/share.ts)

```typescript
// 클립보드 복사
await copyToClipboard(text)

// 네이티브 공유 (모바일)
await shareViaNative(sajuResult)

// 텍스트 변환
const text = sajuToText(sajuResult)
```

## 📈 개발 로드맵

### Phase 1: 기본 구조 ✅ 완료
- [x] 프로젝트 초기 설정
- [x] 화려한 메인 페이지 디자인
- [x] 사주 계산 로직 구현
- [x] 분석 결과 페이지
- [x] 오행 분석 시각화

### Phase 2: AI 기능 ✅ 완료
- [x] OpenAI API 연동
- [x] AI 해석 프롬프트 최적화
- [x] Mock 데이터 (API 키 없을 때)

### Phase 3: 추가 기능 ✅ 완료
- [x] 결과 공유 기능
- [x] 클립보드 복사
- [x] 네이티브 공유

### Phase 4: 사용자 시스템 🔜 예정
- [ ] Supabase 인증 연동
- [ ] 회원가입/로그인
- [ ] 해석 히스토리 저장
- [ ] 사용자 대시보드

### Phase 5: 수익화 🔜 예정
- [ ] Stripe 결제 연동
- [ ] 무료/유료 티어 구분
- [ ] 프리미엄 기능 (상세 해석, PDF 다운로드)

## 🎨 디자인 특징

### 색상 팔레트
- **배경**: 인디고-보라-분홍 그라데이션 (`from-indigo-950 via-purple-900 to-pink-900`)
- **양력**: 주황-분홍 (`from-orange-500 to-pink-500`)
- **음력**: 인디고-보라 (`from-indigo-500 to-purple-500`)
- **오행 색상**:
  - 木 (목): 초록 (#22c55e)
  - 火 (화): 빨강 (#ef4444)
  - 土 (토): 주황 (#f59e0b)
  - 金 (금): 노랑 (#eab308)
  - 水 (수): 파랑 (#3b82f6)

### 애니메이션
- **Float**: 위아래로 떠다니는 효과
- **Blob**: 유기적으로 움직이는 배경
- **Fade-in**: 부드러운 등장
- **Slide-up**: 아래에서 위로 슬라이드
- **Pulse**: 맥박치듯 깜빡임
- **Spin**: 천천히 회전

## 🔧 설정

### 개발 모드
```bash
npm run dev        # 일반 개발 서버
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
npm run lint       # ESLint 실행
```

### 타입 체크
```bash
npx tsc --noEmit
```

## 🚀 배포 가이드

### Vercel (추천)

1. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Vercel에서 Import**
   - vercel.com 접속
   - "Import Project" 클릭
   - GitHub 저장소 선택
   - 환경 변수 설정 (OPENAI_API_KEY 등)
   - Deploy 클릭

3. **환경 변수 설정**
   - Vercel 대시보드에서 Settings → Environment Variables
   - `.env.local`의 변수들을 추가

## 📝 개발 가이드

### 새로운 기능 추가하기

1. **사주 계산 로직 수정**: `lib/saju/calculator.ts`
2. **AI 프롬프트 변경**: `app/api/interpret-saju/route.ts`
3. **UI 컴포넌트 추가**: `components/` 폴더
4. **새 페이지 추가**: `app/` 폴더

### 코드 스타일
- TypeScript 사용
- Tailwind CSS로 스타일링
- 함수형 컴포넌트 (React Hooks)
- ESLint 규칙 준수

## 🛠️ 트러블슈팅

### 자주 발생하는 문제

**포트 충돌**
```bash
# 다른 포트 사용
PORT=3001 npm run dev
```

**빌드 에러**
```bash
# 캐시 삭제 후 재빌드
rm -rf .next
npm run build
```

**음력 변환 오류**
- `korean-lunar-calendar` 라이브러리의 제약 확인
- 1800-2100년 범위 내에서만 정확

## 📞 지원 및 문의

### **개발진 연락처**
- **이메일**: support@saju-mvp.com
- **GitHub**: [저장소 링크]

### **기술 지원**
- **Issue 리포트**: GitHub Issues
- **문서**: 이 README 파일

---

## 🏆 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참조

---

## 🎉 구현 완료!

> **🚀 지금 바로 사용 가능합니다!**
>
> ```bash
> npm install
> npm run dev
> ```
>
> http://localhost:3000 에서 확인하세요! ✨

**Made with 🔮 in Seoul**

---

## 📸 스크린샷

### 메인 페이지
- 우주 테마의 화려한 배경
- 생년월일시 입력 폼
- 양력/음력 선택
- 성별 선택

### 분석 결과 페이지
- 사주팔자 (년월일시주) 표시
- 오행 분석 차트
- AI 운세 해석
- 공유 기능

---

## 🌟 특징 요약

| 기능 | 상태 | 설명 |
|------|------|------|
| 사주 계산 | ✅ | 천간지지 자동 계산 |
| 음력 변환 | ✅ | 양력↔음력 자동 변환 |
| 오행 분석 | ✅ | 목화토금수 시각화 |
| AI 해석 | ✅ | GPT-4 기반 해석 |
| 공유 기능 | ✅ | 복사/공유 지원 |
| 반응형 | ✅ | 모바일 완벽 지원 |
| 회원 기능 | 🔜 | 추후 구현 예정 |
| 결제 | 🔜 | 추후 구현 예정 |

---

**더 궁금한 사항이 있으시면 이슈를 등록해주세요!** 🙏
