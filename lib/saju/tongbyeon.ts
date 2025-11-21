/**
 * 통변성 (通變星) - 십신(十神)
 * 일간과 다른 간지의 오행 관계로 판단하는 10가지 성질
 */

export type TongByeonSeong =
  | '비견' // 比肩 - 형제, 동료
  | '겁재' // 劫財 - 경쟁, 쟁탈
  | '식신' // 食神 - 표현, 여유
  | '상관' // 傷官 - 재능, 반항
  | '편재' // 偏財 - 유동재산
  | '정재' // 正財 - 고정재산
  | '편관' // 偏官 - 권력, 압박 (칠살)
  | '정관' // 正官 - 명예, 지위
  | '편인' // 偏印 - 지혜, 고독 (도식)
  | '정인' // 正印 - 학문, 모성

export interface TongByeonResult {
  year: {
    stem: TongByeonSeong
    branch: TongByeonSeong
  }
  month: {
    stem: TongByeonSeong
    branch: TongByeonSeong
  }
  day: {
    stem: TongByeonSeong
    branch: TongByeonSeong
  }
  hour: {
    stem: TongByeonSeong
    branch: TongByeonSeong
  }
  summary: {
    [key in TongByeonSeong]: number
  }
  dominant: TongByeonSeong[] // 가장 많은 통변성
}

// 천간별 오행과 음양
const STEM_INFO: {
  [key: string]: { element: string; isYang: boolean }
} = {
  甲: { element: '木', isYang: true },
  乙: { element: '木', isYang: false },
  丙: { element: '火', isYang: true },
  丁: { element: '火', isYang: false },
  戊: { element: '土', isYang: true },
  己: { element: '土', isYang: false },
  庚: { element: '金', isYang: true },
  辛: { element: '金', isYang: false },
  壬: { element: '水', isYang: true },
  癸: { element: '水', isYang: false },
}

// 지지별 오행 (장간 대표)
const BRANCH_ELEMENT: { [key: string]: string } = {
  子: '水',
  丑: '土',
  寅: '木',
  卯: '木',
  辰: '土',
  巳: '火',
  午: '火',
  未: '土',
  申: '金',
  酉: '金',
  戌: '土',
  亥: '水',
}

// 오행 상생 관계 (A가 B를 생함)
function generates(element1: string, element2: string): boolean {
  const generation: { [key: string]: string } = {
    木: '火',
    火: '土',
    土: '金',
    金: '水',
    水: '木',
  }
  return generation[element1] === element2
}

// 오행 상극 관계 (A가 B를 극함)
function controls(element1: string, element2: string): boolean {
  const control: { [key: string]: string } = {
    木: '土',
    土: '水',
    水: '火',
    火: '金',
    金: '木',
  }
  return control[element1] === element2
}

/**
 * 두 천간 사이의 통변성 계산
 */
export function getTongByeonSeong(dayStem: string, targetStem: string): TongByeonSeong {
  const dayInfo = STEM_INFO[dayStem]
  const targetInfo = STEM_INFO[targetStem]

  if (!dayInfo || !targetInfo) {
    console.error(`Invalid stems: ${dayStem}, ${targetStem}, using default`)
    return '비견' // 기본값 반환
  }

  const dayElement = dayInfo.element
  const targetElement = targetInfo.element
  const sameYinYang = dayInfo.isYang === targetInfo.isYang

  // 같은 오행
  if (dayElement === targetElement) {
    return sameYinYang ? '비견' : '겁재'
  }

  // 내가 생하는 오행 (食傷)
  if (generates(dayElement, targetElement)) {
    return sameYinYang ? '식신' : '상관'
  }

  // 내가 극하는 오행 (財)
  if (controls(dayElement, targetElement)) {
    return sameYinYang ? '편재' : '정재'
  }

  // 나를 극하는 오행 (官殺)
  if (controls(targetElement, dayElement)) {
    return sameYinYang ? '편관' : '정관'
  }

  // 나를 생하는 오행 (印)
  if (generates(targetElement, dayElement)) {
    return sameYinYang ? '편인' : '정인'
  }

  // 기본값 반환
  return '비견'
}

/**
 * 지지의 통변성 계산 (장간 대표 오행 사용)
 */
function getTongByeonSeongForBranch(dayStem: string, targetBranch: string): TongByeonSeong {
  const dayInfo = STEM_INFO[dayStem]
  const targetElement = BRANCH_ELEMENT[targetBranch]

  if (!dayInfo || !targetElement) {
    console.error(`Invalid stem/branch: ${dayStem}, ${targetBranch}, using default`)
    return '비견' // 기본값 반환
  }

  const dayElement = dayInfo.element

  // 지지는 음양 구분 없이 오행 관계만으로 판단 (간단화)
  // 실제로는 지지 장간을 모두 분석해야 하지만, 대표 오행으로 단순화

  // 같은 오행
  if (dayElement === targetElement) {
    return '비견'
  }

  // 내가 생하는 오행
  if (generates(dayElement, targetElement)) {
    return '식신'
  }

  // 내가 극하는 오행
  if (controls(dayElement, targetElement)) {
    return '편재'
  }

  // 나를 극하는 오행
  if (controls(targetElement, dayElement)) {
    return '정관'
  }

  // 나를 생하는 오행
  if (generates(targetElement, dayElement)) {
    return '정인'
  }

  // 기본값 반환
  return '비견'
}

/**
 * 사주 전체의 통변성 계산
 */
export function calculateTongByeon(
  yearStem: string,
  yearBranch: string,
  monthStem: string,
  monthBranch: string,
  dayStem: string,
  dayBranch: string,
  hourStem: string,
  hourBranch: string
): TongByeonResult {
  // 각 기둥의 통변성 계산
  const year = {
    stem: getTongByeonSeong(dayStem, yearStem),
    branch: getTongByeonSeongForBranch(dayStem, yearBranch),
  }

  const month = {
    stem: getTongByeonSeong(dayStem, monthStem),
    branch: getTongByeonSeongForBranch(dayStem, monthBranch),
  }

  const day = {
    stem: getTongByeonSeong(dayStem, dayStem), // 일간 자신은 비견
    branch: getTongByeonSeongForBranch(dayStem, dayBranch),
  }

  const hour = {
    stem: getTongByeonSeong(dayStem, hourStem),
    branch: getTongByeonSeongForBranch(dayStem, hourBranch),
  }

  // 통변성별 개수 집계
  const summary: { [key in TongByeonSeong]: number } = {
    비견: 0,
    겁재: 0,
    식신: 0,
    상관: 0,
    편재: 0,
    정재: 0,
    편관: 0,
    정관: 0,
    편인: 0,
    정인: 0,
  }

  const allTongByeon = [
    year.stem,
    year.branch,
    month.stem,
    month.branch,
    day.stem,
    day.branch,
    hour.stem,
    hour.branch,
  ]

  allTongByeon.forEach((tb) => {
    summary[tb]++
  })

  // 가장 많은 통변성 찾기
  const maxCount = Math.max(...Object.values(summary))
  const dominant = (Object.keys(summary) as TongByeonSeong[]).filter(
    (key) => summary[key] === maxCount && maxCount > 0
  )

  return {
    year,
    month,
    day,
    hour,
    summary,
    dominant,
  }
}

/**
 * 통변성별 설명
 */
export function getTongByeonDescription(tongbyeon: TongByeonSeong): string {
  const descriptions: { [key in TongByeonSeong]: string } = {
    비견: '형제, 동료, 경쟁자. 독립심과 자존심이 강하며 협력보다는 경쟁을 선호합니다.',
    겁재: '쟁탈, 도전. 재물을 빼앗기거나 경쟁이 치열합니다. 행동력과 추진력이 강합니다.',
    식신: '표현, 여유, 복록. 온화하고 낙천적이며 예술적 재능이 있습니다.',
    상관: '재능, 표현, 반항. 뛰어난 재능과 표현력이 있으나 기존 틀을 거부하는 성향이 있습니다.',
    편재: '유동재산, 활동적 재물. 사업과 투자에 능하며 활동적으로 재물을 얻습니다.',
    정재: '고정재산, 안정적 재물. 근면하고 성실하며 안정적으로 재물을 축적합니다.',
    편관: '권력, 압박, 추진력. 강한 추진력과 승부욕이 있으나 스트레스도 많습니다. (칠살)',
    정관: '명예, 지위, 책임감. 정직하고 책임감이 강하며 사회적 지위를 중시합니다.',
    편인: '지혜, 학문, 고독. 지적이고 창의적이나 외로움을 느끼기 쉽습니다. (도식)',
    정인: '학문, 모성, 인덕. 학문을 좋아하고 어른의 도움을 받으며 덕망이 있습니다.',
  }

  return descriptions[tongbyeon]
}

/**
 * 통변성의 길흉 판단 (일반적인 경우)
 */
export function getTongByeonFortune(tongbyeon: TongByeonSeong): '길' | '흉' | '중립' {
  const fortuneMap: { [key in TongByeonSeong]: '길' | '흉' | '중립' } = {
    비견: '중립',
    겁재: '흉',
    식신: '길',
    상관: '중립',
    편재: '길',
    정재: '길',
    편관: '흉',
    정관: '길',
    편인: '중립',
    정인: '길',
  }

  return fortuneMap[tongbyeon]
}
