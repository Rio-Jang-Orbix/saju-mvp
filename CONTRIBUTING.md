# 🤝 Contributing to Luvo MVP

Luvo MVP에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn
- Git

### 초기 설정
```bash
# 저장소 클론
git clone https://github.com/choryo/luvo-mvp.git
cd luvo-mvp

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 실제 값 입력

# 개발 서버 실행
npm run dev
```

## 🏗️ 프로젝트 구조

```
luvo-mvp/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── api/               # API 라우트
│   ├── analyze/           # 대화 분석 페이지
│   ├── result/            # 분석 결과 페이지
│   └── date-plan/         # 데이트 플랜 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── onboarding/       # 온보딩 관련 컴포넌트
│   ├── analyze/          # 분석 관련 컴포넌트
│   └── date-plan/        # 데이트 플랜 관련 컴포넌트
├── lib/                  # 유틸리티 함수 및 설정
│   ├── ai/              # AI 관련 로직
│   ├── db/              # 데이터베이스 스키마 및 클라이언트
│   └── utils/           # 공통 유틸리티
├── types/               # TypeScript 타입 정의
└── prompts/            # AI 프롬프트 템플릿
```

## 🎨 코딩 스타일

### TypeScript
- 엄격한 타입 체크 사용
- `any` 타입 사용 최소화
- 인터페이스는 `PascalCase` 사용

### React 컴포넌트
```typescript
// 좋은 예
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### CSS 클래스
- Tailwind CSS 사용
- 커스텀 클래스는 `globals.css`에 정의
- 컴포넌트별 스타일은 클래스 조합으로 구현

## 🔄 개발 워크플로우

### 1. 이슈 생성
새로운 기능이나 버그 수정 전에 이슈를 생성해주세요.

### 2. 브랜치 생성
```bash
# 기능 개발
git checkout -b feature/새로운-기능명

# 버그 수정
git checkout -b fix/버그-설명

# 문서 수정
git checkout -b docs/문서-업데이트
```

### 3. 커밋 컨벤션
```bash
# 새 기능
git commit -m "feat: 대화 분석 알고리즘 개선"

# 버그 수정
git commit -m "fix: 온보딩 플로우 진행 오류 수정"

# 문서 업데이트
git commit -m "docs: API 문서 업데이트"

# 스타일 변경
git commit -m "style: 버튼 컴포넌트 디자인 개선"

# 리팩토링
git commit -m "refactor: 사용자 인증 로직 최적화"
```

### 4. Pull Request
- 명확한 제목과 설명 작성
- 관련 이슈 번호 언급
- 스크린샷 첨부 (UI 변경사항)
- 테스트 결과 공유

## 🧪 테스트

### 단위 테스트
```bash
# 테스트 실행
npm test

# 테스트 커버리지
npm run test:coverage
```

### E2E 테스트
```bash
# Playwright 테스트
npm run test:e2e
```

### 수동 테스트 체크리스트
- [ ] 전체 사용자 플로우 테스트
- [ ] 모바일 반응형 확인
- [ ] 다양한 브라우저에서 테스트
- [ ] API 엔드포인트 동작 확인

## 🎯 기여 가능한 영역

### 🔥 높은 우선순위
- AI 프롬프트 최적화
- 사용자 경험 개선
- 성능 최적화
- 보안 강화

### 🌟 중간 우선순위
- 새로운 기능 추가
- 코드 리팩토링
- 문서 개선
- 테스트 커버리지 증가

### 💡 낮은 우선순위
- 디자인 시스템 확장
- 개발자 도구 개선
- CI/CD 파이프라인 구축

## 📝 코드 리뷰 가이드라인

### 리뷰어
- 건설적인 피드백 제공
- 코드 품질과 성능 확인
- 보안 취약점 검토
- 문서화 필요성 확인

### 기여자
- 리뷰 요청 전 자체 검토
- 피드백에 대한 적극적인 대응
- 코드 변경 이유 명확하게 설명

## 🐛 버그 리포트

버그를 발견하셨나요? 다음 정보를 포함해서 이슈를 생성해주세요:

```markdown
## 🐛 버그 설명
간단한 버그 설명

## 🔄 재현 단계
1. '...' 페이지로 이동
2. '...' 버튼 클릭
3. 오류 발생

## 🎯 예상 동작
예상했던 정상적인 동작

## 💻 환경 정보
- OS: [예: macOS 13.0]
- 브라우저: [예: Chrome 108.0]
- Node.js: [예: 18.12.0]

## 📸 스크린샷
가능하다면 스크린샷 첨부
```

## 💡 기능 제안

새로운 기능을 제안하고 싶으시다면:

```markdown
## 💡 기능 설명
제안하고 싶은 기능에 대한 설명

## 🎯 문제점
현재 어떤 문제나 불편함이 있는지

## 💻 해결 방안
제안하는 기능으로 어떻게 해결할 수 있는지

## 🔄 대안
고려해본 다른 대안들

## 📋 추가 정보
필요한 추가 정보나 컨텍스트
```

## 📞 소통 채널

- **이슈**: 버그 리포트, 기능 제안
- **Pull Request**: 코드 기여
- **이메일**: choryo@example.com (긴급하거나 민감한 사안)

## 📜 라이선스

이 프로젝트에 기여함으로써, 여러분의 기여가 프로젝트와 동일한 라이선스 하에 있음에 동의하게 됩니다.

---

**감사합니다!** 여러분의 기여가 Luvo MVP를 더 나은 서비스로 만들어갑니다. 💕