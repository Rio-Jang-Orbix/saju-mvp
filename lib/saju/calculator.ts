import KoreanLunarCalendar from 'korean-lunar-calendar'

// 천간 (10개)
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const HEAVENLY_STEMS_KR = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']

// 지지 (12개)
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const EARTHLY_BRANCHES_KR = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']

// 오행
export type Element = '木' | '火' | '土' | '金' | '水'
const ELEMENTS: Element[] = ['木', '火', '土', '金', '水']
const ELEMENTS_KR = ['목', '화', '토', '금', '수']

// 천간의 오행 매핑
const STEM_ELEMENTS: Element[] = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']

// 지지의 오행 매핑
const BRANCH_ELEMENTS: Element[] = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水']

export interface SajuPillar {
  stem: string // 천간 (한자)
  branch: string // 지지 (한자)
  stemKr: string // 천간 (한글)
  branchKr: string // 지지 (한글)
  element: Element // 오행
}

export interface SajuResult {
  year: SajuPillar // 년주
  month: SajuPillar // 월주
  day: SajuPillar // 일주
  hour: SajuPillar // 시주
  elements: {
    [key in Element]: number // 오행 개수
  }
  birthInfo: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    isLunar: boolean
    gender: 'male' | 'female'
  }
}

/**
 * 년주 계산
 */
function calculateYearPillar(year: number): SajuPillar {
  // 서기 4년이 甲子년 (0번)
  const index = (year - 4) % 60
  const stemIndex = index % 10
  const branchIndex = index % 12

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    stemKr: HEAVENLY_STEMS_KR[stemIndex],
    branchKr: EARTHLY_BRANCHES_KR[branchIndex],
    element: STEM_ELEMENTS[stemIndex]
  }
}

/**
 * 월주 계산
 */
function calculateMonthPillar(year: number, month: number): SajuPillar {
  // 년간에 따른 월간 계산
  const yearStemIndex = (year - 4) % 10

  // 월지는 고정 (인월부터 시작)
  const monthBranchIndex = (month + 1) % 12 // 1월=인월(寅)

  // 월간 계산 (복잡한 공식이지만 간단히)
  const monthStemIndex = (yearStemIndex * 2 + month) % 10

  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: EARTHLY_BRANCHES[monthBranchIndex],
    stemKr: HEAVENLY_STEMS_KR[monthStemIndex],
    branchKr: EARTHLY_BRANCHES_KR[monthBranchIndex],
    element: STEM_ELEMENTS[monthStemIndex]
  }
}

/**
 * 일주 계산 (율리우스 일수 사용)
 */
function calculateDayPillar(year: number, month: number, day: number): SajuPillar {
  // 율리우스 일수 계산
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3

  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y +
             Math.floor(y / 4) - Math.floor(y / 100) +
             Math.floor(y / 400) - 32045

  // 기준일(서기 1년 1월 1일)부터의 일수로 간지 계산
  const index = (jd + 49) % 60
  const stemIndex = index % 10
  const branchIndex = index % 12

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    stemKr: HEAVENLY_STEMS_KR[stemIndex],
    branchKr: EARTHLY_BRANCHES_KR[branchIndex],
    element: STEM_ELEMENTS[stemIndex]
  }
}

/**
 * 시주 계산
 */
function calculateHourPillar(dayStemIndex: number, hour: number): SajuPillar {
  // 시지 계산 (23-01시=자시, 01-03시=축시, ...)
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12

  // 시간에 따른 시간 계산 (일간에 따라 변함)
  const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10

  return {
    stem: HEAVENLY_STEMS[hourStemIndex],
    branch: EARTHLY_BRANCHES[hourBranchIndex],
    stemKr: HEAVENLY_STEMS_KR[hourStemIndex],
    branchKr: EARTHLY_BRANCHES_KR[hourBranchIndex],
    element: STEM_ELEMENTS[hourStemIndex]
  }
}

/**
 * 오행 개수 계산
 */
function calculateElements(year: SajuPillar, month: SajuPillar, day: SajuPillar, hour: SajuPillar) {
  const elements: { [key in Element]: number } = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0
  }

  // 천간 오행
  const pillars = [year, month, day, hour]
  pillars.forEach(pillar => {
    elements[pillar.element]++

    // 지지의 오행도 추가
    const branchIndex = EARTHLY_BRANCHES.indexOf(pillar.branch)
    const branchElement = BRANCH_ELEMENTS[branchIndex]
    elements[branchElement]++
  })

  return elements
}

/**
 * 음력을 양력으로 변환
 */
function lunarToSolar(year: number, month: number, day: number, isLeapMonth: boolean = false) {
  try {
    const calendar = new KoreanLunarCalendar()
    calendar.setLunarDate(year, month, day, isLeapMonth)
    const result = calendar.getSolarCalendar()
    return {
      year: result.year,
      month: result.month,
      day: result.day
    }
  } catch (error) {
    console.error('Lunar to solar conversion failed:', error)
    // 변환 실패시 그대로 반환
    return { year, month, day }
  }
}

/**
 * 메인 사주 계산 함수
 */
export function calculateSaju(
  inputYear: number,
  inputMonth: number,
  inputDay: number,
  inputHour: number,
  inputMinute: number = 0,
  isLunar: boolean = false,
  gender: 'male' | 'female' = 'male'
): SajuResult {
  // 음력이면 양력으로 변환
  let year = inputYear
  let month = inputMonth
  let day = inputDay

  if (isLunar) {
    const solarDate = lunarToSolar(inputYear, inputMonth, inputDay)
    year = solarDate.year
    month = solarDate.month
    day = solarDate.day
  }

  // 각 주 계산
  const yearPillar = calculateYearPillar(year)
  const monthPillar = calculateMonthPillar(year, month)
  const dayPillar = calculateDayPillar(year, month, day)

  // 일주의 천간 인덱스를 구해서 시주 계산
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayPillar.stem)
  const hourPillar = calculateHourPillar(dayStemIndex, inputHour)

  // 오행 계산
  const elements = calculateElements(yearPillar, monthPillar, dayPillar, hourPillar)

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    elements,
    birthInfo: {
      year: inputYear,
      month: inputMonth,
      day: inputDay,
      hour: inputHour,
      minute: inputMinute,
      isLunar,
      gender
    }
  }
}

/**
 * 오행 이름을 한글로 변환
 */
export function getElementName(element: Element): string {
  const index = ELEMENTS.indexOf(element)
  return ELEMENTS_KR[index]
}

/**
 * 오행 색상 매핑
 */
export function getElementColor(element: Element): string {
  const colorMap = {
    '木': '#22c55e', // green
    '火': '#ef4444', // red
    '土': '#f59e0b', // amber
    '金': '#eab308', // yellow
    '水': '#3b82f6'  // blue
  }
  return colorMap[element]
}
