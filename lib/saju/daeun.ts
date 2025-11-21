import { type SajuResult } from './calculator'

export interface DaeunPeriod {
  startAge: number
  endAge: number
  heavenlyStem: string
  earthlyBranch: string
  elements: {
    wood: number
    fire: number
    earth: number
    metal: number
    water: number
  }
  description: string
}

export interface DaeunResult {
  periods: DaeunPeriod[]
  currentPeriod: DaeunPeriod | null
  nextPeriod: DaeunPeriod | null
}

// 천간 목록
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 지지 목록
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 양간 (陽干)
const YANG_STEMS = ['甲', '丙', '戊', '庚', '壬']

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

// 오행별 개수 계산
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
 * 대운(大運) 계산
 * 10년 주기로 인생의 큰 흐름을 나타냄
 */
export function calculateDaeun(saju: SajuResult, currentAge: number): DaeunResult {
  const periods: DaeunPeriod[] = []

  // 년간이 양간인지 음간인지 판단
  const yearStem = saju.year.heavenlyStem
  const isYangStem = YANG_STEMS.includes(yearStem)

  // 양남음녀는 순행, 음남양녀는 역행
  const gender = saju.gender
  const isForward =
    (isYangStem && gender === 'male') || (!isYangStem && gender === 'female')

  // 월주의 천간지지 인덱스 찾기
  const monthStem = saju.month.heavenlyStem
  const monthBranch = saju.month.earthlyBranch
  let stemIndex = HEAVENLY_STEMS.indexOf(monthStem)
  let branchIndex = EARTHLY_BRANCHES.indexOf(monthBranch)

  // 대운은 보통 3세부터 시작 (간단히 1세부터 시작으로 설정)
  let startAge = 1

  // 10개의 대운 계산 (100세까지)
  for (let i = 0; i < 10; i++) {
    // 순행/역행에 따라 인덱스 이동
    if (isForward) {
      stemIndex = (stemIndex + 1) % 10
      branchIndex = (branchIndex + 1) % 12
    } else {
      stemIndex = (stemIndex - 1 + 10) % 10
      branchIndex = (branchIndex - 1 + 12) % 12
    }

    const stem = HEAVENLY_STEMS[stemIndex]
    const branch = EARTHLY_BRANCHES[branchIndex]
    const elements = countElements(stem, branch)

    const endAge = startAge + 9

    // 대운에 대한 간단한 설명
    const description = generateDaeunDescription(stem, branch, elements)

    periods.push({
      startAge,
      endAge,
      heavenlyStem: stem,
      earthlyBranch: branch,
      elements,
      description,
    })

    startAge += 10
  }

  // 현재 대운 찾기
  const currentPeriod =
    periods.find((p) => currentAge >= p.startAge && currentAge <= p.endAge) || null

  // 다음 대운 찾기
  const currentIndex = currentPeriod ? periods.indexOf(currentPeriod) : -1
  const nextPeriod = currentIndex >= 0 && currentIndex < periods.length - 1
    ? periods[currentIndex + 1]
    : null

  return {
    periods,
    currentPeriod,
    nextPeriod,
  }
}

/**
 * 대운에 대한 간단한 설명 생성
 */
function generateDaeunDescription(
  stem: string,
  branch: string,
  elements: DaeunPeriod['elements']
): string {
  const descriptions: string[] = []

  // 오행별 특징
  if (elements.wood >= 2) {
    descriptions.push('성장과 발전의 시기')
  }
  if (elements.fire >= 2) {
    descriptions.push('열정과 활동의 시기')
  }
  if (elements.earth >= 2) {
    descriptions.push('안정과 축적의 시기')
  }
  if (elements.metal >= 2) {
    descriptions.push('결단과 정리의 시기')
  }
  if (elements.water >= 2) {
    descriptions.push('지혜와 유연성의 시기')
  }

  // 천간별 특징
  if (stem === '甲' || stem === '乙') {
    descriptions.push('새로운 시작과 확장')
  } else if (stem === '丙' || stem === '丁') {
    descriptions.push('창의성과 표현력 발휘')
  } else if (stem === '戊' || stem === '己') {
    descriptions.push('기반 구축과 관리')
  } else if (stem === '庚' || stem === '辛') {
    descriptions.push('변화와 개혁')
  } else if (stem === '壬' || stem === '癸') {
    descriptions.push('지혜와 통찰력 증진')
  }

  return descriptions.join(', ') || '안정적인 시기'
}

/**
 * 현재 나이 계산 (한국 나이)
 */
export function calculateKoreanAge(birthYear: number): number {
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear + 1
}

/**
 * 만 나이 계산
 */
export function calculateInternationalAge(
  birthYear: number,
  birthMonth: number,
  birthDay: number
): number {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()

  let age = currentYear - birthYear

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--
  }

  return age
}
