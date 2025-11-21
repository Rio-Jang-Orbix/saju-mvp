import { type SajuResult } from './calculator'

export interface DayFortune {
  date: Date
  heavenlyStem: string
  earthlyBranch: string
  elements: {
    wood: number
    fire: number
    earth: number
    metal: number
    water: number
  }
  compatibility: 'excellent' | 'good' | 'normal' | 'caution' | 'warning'
  luckyColors: string[]
  luckyDirections: string[]
  advice: string
}

export interface MonthFortune {
  year: number
  month: number
  heavenlyStem: string
  earthlyBranch: string
  elements: {
    wood: number
    fire: number
    earth: number
    metal: number
    water: number
  }
  theme: string
  advice: string[]
}

export interface FortuneCalendar {
  currentMonth: MonthFortune
  today: DayFortune
  tomorrow: DayFortune
  thisWeek: DayFortune[]
}

// 천간 목록
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 지지 목록
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 천간 오행
const STEM_ELEMENTS: { [key: string]: string } = {
  甲: '木',
  乙: '木',
  丙: '火',
  丁: '火',
  戊: '土',
  己: '土',
  庚: '金',
  辛: '金',
  壬: '水',
  癸: '水',
}

// 지지 오행
const BRANCH_ELEMENTS: { [key: string]: string } = {
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

// 오행별 행운의 색
const ELEMENT_COLORS: { [key: string]: string[] } = {
  木: ['초록', '청록', '녹색'],
  火: ['빨강', '분홍', '주황'],
  土: ['노랑', '갈색', '베이지'],
  金: ['흰색', '은색', '금색'],
  水: ['검정', '파랑', '남색'],
}

// 오행별 행운의 방향
const ELEMENT_DIRECTIONS: { [key: string]: string[] } = {
  木: ['동쪽', '동남쪽'],
  火: ['남쪽'],
  土: ['중앙', '남서쪽'],
  金: ['서쪽', '북서쪽'],
  水: ['북쪽'],
}

/**
 * 오행별 개수 계산
 */
function countElements(stem: string, branch: string) {
  const elements = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }

  const stemElement = STEM_ELEMENTS[stem]
  const branchElement = BRANCH_ELEMENTS[branch]

  if (stemElement === '木') elements.wood++
  if (stemElement === '火') elements.fire++
  if (stemElement === '土') elements.earth++
  if (stemElement === '金') elements.metal++
  if (stemElement === '水') elements.water++

  if (branchElement === '木') elements.wood++
  if (branchElement === '火') elements.fire++
  if (branchElement === '土') elements.earth++
  if (branchElement === '金') elements.metal++
  if (branchElement === '水') elements.water++

  return elements
}

/**
 * 특정 날짜의 일주 계산
 * 기준일: 1900년 1월 1일 = 甲寅일
 */
function calculateDayPillar(date: Date): { stem: string; branch: string } {
  // 기준일: 1900년 1월 1일 = 甲寅일 (인덱스: 천간 0, 지지 2)
  const baseDate = new Date(1900, 0, 1)
  const baseStemIndex = 0 // 甲
  const baseBranchIndex = 2 // 寅

  // 경과 일수 계산
  const diffTime = date.getTime() - baseDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // 60갑자 순환
  const stemIndex = (baseStemIndex + diffDays) % 10
  const branchIndex = (baseBranchIndex + diffDays) % 12

  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex],
  }
}

/**
 * 특정 월의 월주 계산
 */
function calculateMonthPillar(
  year: number,
  month: number
): { stem: string; branch: string } {
  // 월지는 고정: 1월(寅), 2월(卯), ... 12월(丑)
  const monthBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']
  const branch = monthBranches[month - 1]

  // 월간은 년간에 따라 결정 (간단히 계산)
  const yearStemIndex = (year - 4) % 10
  const monthStemBase = yearStemIndex * 2 + 2
  const stemIndex = (monthStemBase + month - 1) % 10

  const stem = HEAVENLY_STEMS[stemIndex]

  return { stem, branch }
}

/**
 * 일운과 본인 사주의 궁합 판단
 */
function calculateDayCompatibility(
  dayStem: string,
  dayBranch: string,
  saju: SajuResult
): DayFortune['compatibility'] {
  let score = 50

  // 일주와의 비교
  if (dayStem === saju.day.heavenlyStem) score += 20
  if (dayBranch === saju.day.earthlyBranch) score += 20

  // 년주와의 비교
  if (dayStem === saju.year.heavenlyStem) score += 10
  if (dayBranch === saju.year.earthlyBranch) score += 10

  if (score >= 80) return 'excellent'
  if (score >= 65) return 'good'
  if (score >= 50) return 'normal'
  if (score >= 35) return 'caution'
  return 'warning'
}

/**
 * 일운별 조언 생성
 */
function generateDayAdvice(
  elements: DayFortune['elements'],
  compatibility: DayFortune['compatibility']
): string {
  const advice: string[] = []

  // 궁합에 따른 조언
  if (compatibility === 'excellent') {
    advice.push('매우 좋은 날입니다.')
  } else if (compatibility === 'good') {
    advice.push('좋은 일이 있을 수 있는 날입니다.')
  } else if (compatibility === 'normal') {
    advice.push('평범한 하루가 예상됩니다.')
  } else if (compatibility === 'caution') {
    advice.push('조심스러운 행동이 필요한 날입니다.')
  } else {
    advice.push('신중한 하루를 보내세요.')
  }

  // 오행에 따른 조언
  if (elements.wood >= 2) {
    advice.push('새로운 시작에 좋은 시기입니다.')
  }
  if (elements.fire >= 2) {
    advice.push('활발한 활동과 만남이 유리합니다.')
  }
  if (elements.earth >= 2) {
    advice.push('안정적인 계획 수립에 좋습니다.')
  }
  if (elements.metal >= 2) {
    advice.push('결정과 정리에 적합한 시기입니다.')
  }
  if (elements.water >= 2) {
    advice.push('사색과 학습에 유리한 날입니다.')
  }

  return advice.join(' ')
}

/**
 * 특정 날짜의 일운 계산
 */
export function calculateDayFortune(date: Date, saju: SajuResult): DayFortune {
  const { stem, branch } = calculateDayPillar(date)
  const elements = countElements(stem, branch)
  const compatibility = calculateDayCompatibility(stem, branch, saju)

  // 행운의 색상과 방향
  const stemElement = STEM_ELEMENTS[stem]
  const branchElement = BRANCH_ELEMENTS[branch]
  const luckyColors = [
    ...(ELEMENT_COLORS[stemElement] || []),
    ...(ELEMENT_COLORS[branchElement] || []),
  ]
  const luckyDirections = [
    ...(ELEMENT_DIRECTIONS[stemElement] || []),
    ...(ELEMENT_DIRECTIONS[branchElement] || []),
  ]

  const advice = generateDayAdvice(elements, compatibility)

  return {
    date,
    heavenlyStem: stem,
    earthlyBranch: branch,
    elements,
    compatibility,
    luckyColors: [...new Set(luckyColors)], // 중복 제거
    luckyDirections: [...new Set(luckyDirections)],
    advice,
  }
}

/**
 * 월운 계산
 */
export function calculateMonthFortune(
  year: number,
  month: number,
  saju: SajuResult
): MonthFortune {
  const { stem, branch } = calculateMonthPillar(year, month)
  const elements = countElements(stem, branch)

  // 월운 테마 결정
  let theme = '안정적인 한 달'
  if (elements.wood >= 2) theme = '성장과 발전의 달'
  if (elements.fire >= 2) theme = '열정과 활동의 달'
  if (elements.earth >= 2) theme = '안정과 축적의 달'
  if (elements.metal >= 2) theme = '정리와 결단의 달'
  if (elements.water >= 2) theme = '지혜와 유연성의 달'

  // 조언 생성
  const advice: string[] = []
  if (elements.wood >= 2) {
    advice.push('새로운 계획을 시작하기 좋은 달입니다')
  }
  if (elements.fire >= 2) {
    advice.push('사회 활동과 대인관계에 적극적으로 임하세요')
  }
  if (elements.earth >= 2) {
    advice.push('재정 관리와 저축에 신경 쓰세요')
  }
  if (elements.metal >= 2) {
    advice.push('불필요한 것을 정리하고 중요한 결정을 내리세요')
  }
  if (elements.water >= 2) {
    advice.push('학습과 자기계발에 집중하기 좋습니다')
  }

  if (advice.length === 0) {
    advice.push('균형잡힌 생활을 유지하세요')
  }

  return {
    year,
    month,
    heavenlyStem: stem,
    earthlyBranch: branch,
    elements,
    theme,
    advice,
  }
}

/**
 * 운세 달력 생성 (이번 달, 오늘, 내일, 이번 주)
 */
export function generateFortuneCalendar(saju: SajuResult): FortuneCalendar {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // 이번 주 (오늘부터 7일)
  const thisWeek: DayFortune[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    thisWeek.push(calculateDayFortune(date, saju))
  }

  return {
    currentMonth: calculateMonthFortune(today.getFullYear(), today.getMonth() + 1, saju),
    today: calculateDayFortune(today, saju),
    tomorrow: calculateDayFortune(tomorrow, saju),
    thisWeek,
  }
}
