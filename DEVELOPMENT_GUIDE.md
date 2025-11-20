# 🚀 Luvo MVP 개발 가이드

## 📁 프로젝트 구조

이 프로젝트는 **하나의 코드베이스**로 **세 가지 다른 앱**을 운영합니다:

1. **테스트 모드** (`test`) - 데이터 수집 및 실험용
2. **친구소개 모드** (`friend-intro`) - 안전한 친구소개 전용
3. **프로덕션 모드** (`production`) - 완전한 데이팅 서비스

## 🎯 모드별 개발 시 참조할 파일들

### 1. 테스트 모드 개발
```
핵심 파일:
- app/page.tsx (메인 페이지)
- app/analyze/page.tsx (대화 분석)
- app/result/[id]/page.tsx (결과)
- components/analyze/ (분석 컴포넌트들)
- components/ui/RealTimeLiveStats.tsx (실시간 통계)
- lib/ai/ (AI 분석)
- lib/config/app-config.ts (설정)

환경변수:
NEXT_PUBLIC_APP_MODE=test
```

### 2. 친구소개 모드 개발
```
핵심 파일:
- app/friends/ (친구소개 전용 페이지들)
  - app/friends/invite/page.tsx (초대 생성)
  - app/friends/join/page.tsx (초대 수락)
- lib/friends/ (친구초대 시스템)
  - lib/friends/invitation-system.ts
- lib/config/app-config.ts (설정)
- components/ui/ (공통 UI)

환경변수:
NEXT_PUBLIC_APP_MODE=friend-intro
```

### 3. 프로덕션 모드 개발
```
핵심 파일:
- app/ (모든 페이지)
- app/premium-matching/ (프리미엄 매칭)
- components/ (모든 컴포넌트)
- lib/ (모든 라이브러리)

환경변수:
NEXT_PUBLIC_APP_MODE=production
```

## 🛠️ 개발 시 토큰 절약 팁

### Claude와 작업할 때:

#### 테스트 모드 작업 시
```
"app/page.tsx, app/analyze/page.tsx, components/analyze/, lib/ai/, lib/config/app-config.ts 파일들만 읽어줘"
```

#### 친구소개 모드 작업 시
```
"app/friends/, lib/friends/, lib/config/app-config.ts 파일들만 읽어줘"
```

#### 공통 UI 작업 시
```
"components/ui/, app/layout.tsx 파일들만 읽어줘"
```

## 🔧 환경 설정

### 모드 전환
```bash
# 테스트 모드
echo "NEXT_PUBLIC_APP_MODE=test" > .env.local

# 친구소개 모드
echo "NEXT_PUBLIC_APP_MODE=friend-intro" > .env.local

# 프로덕션 모드
echo "NEXT_PUBLIC_APP_MODE=production" > .env.local
```

### 개발 서버 실행
```bash
npm run dev
```

## 📋 기능별 파일 매핑

### 공통 기능 (모든 모드)
```
- 레이아웃: app/layout.tsx
- 대화분석: app/analyze/page.tsx, components/analyze/
- 결과표시: app/result/[id]/page.tsx
- 공통UI: components/ui/
- 설정관리: lib/config/app-config.ts
- 언어지원: lib/i18n/
- 유틸리티: lib/utils.ts
```

### 테스트 모드 전용
```
- 실시간통계: components/ui/RealTimeLiveStats.tsx
- AI분석: lib/ai/
- 데이터수집: lib/analytics/
```

### 친구소개 모드 전용
```
- 초대생성: app/friends/invite/page.tsx
- 초대수락: app/friends/join/page.tsx
- 초대시스템: lib/friends/invitation-system.ts
```

### 프로덕션 모드 전용
```
- 프리미엄매칭: app/premium-matching/
- 결제시스템: lib/stripe.ts
- 고급기능: (추후 추가)
```

## 🚀 배포 전략

### 도메인별 배포
```
test.luvo.ai     → NEXT_PUBLIC_APP_MODE=test
friends.luvo.ai  → NEXT_PUBLIC_APP_MODE=friend-intro
luvo.ai          → NEXT_PUBLIC_APP_MODE=production
```

### 빌드 명령어
```bash
# 각 모드별로 빌드
NEXT_PUBLIC_APP_MODE=test npm run build
NEXT_PUBLIC_APP_MODE=friend-intro npm run build
NEXT_PUBLIC_APP_MODE=production npm run build
```

## 📝 개발 워크플로우

### 새 기능 추가 시:
1. 어느 모드의 기능인지 확인
2. 해당 모드의 폴더에 파일 추가
3. `lib/config/app-config.ts`에서 기능 플래그 확인
4. 필요시 다른 모드에도 적용

### 공통 기능 수정 시:
1. 모든 모드에 영향을 주는지 확인
2. 각 모드별로 테스트
3. 설정 파일에서 모드별 동작 정의

## 🐛 디버깅

### 현재 모드 확인
```javascript
console.log('Current mode:', process.env.NEXT_PUBLIC_APP_MODE)
```

### 기능 플래그 확인
```javascript
import { appConfig } from '@/lib/config/app-config'
console.log('Config:', appConfig)
```

---

## 💡 개발 시 주의사항

1. **토큰 절약**: 작업할 모드의 파일들만 참조
2. **모드 테스트**: 환경변수 변경 후 반드시 테스트
3. **공통 코드**: 여러 모드에서 사용되는 코드는 신중히 수정
4. **독립성 유지**: 각 모드는 독립적으로 동작해야 함

이 가이드를 따르면 효율적이고 체계적인 개발이 가능합니다! 🎯