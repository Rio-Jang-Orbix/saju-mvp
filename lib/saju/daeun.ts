import { type SajuResult } from './calculator'
import { calculateSibiUnseong, type SibiUnseong } from './sibiunseong'
import { getTongByeonSeong, type TongByeonSeong } from './tongbyeon'

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
  // 고급 이론
  advanced?: {
    sibiunseong: {
      stem: SibiUnseong
      branch: SibiUnseong
    }
    tongbyeon: {
      stem: TongByeonSeong
      branch: TongByeonSeong
    }
    energy: '강' | '중' | '약' // 전반적인 에너지 강도
    interaction: string // 원국과의 상호작용 설명
  }
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

  // 일간 추출 (고급 이론용)
  const dayStem = saju.day.heavenlyStem

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

    // 고급 이론 분석
    const advanced = analyzeDaeunAdvanced(dayStem, stem, branch, saju)

    periods.push({
      startAge,
      endAge,
      heavenlyStem: stem,
      earthlyBranch: branch,
      elements,
      description,
      advanced,
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

/**
 * 대운의 고급 이론 분석
 */
function analyzeDaeunAdvanced(
  dayStem: string,
  daeunStem: string,
  daeunBranch: string,
  saju: SajuResult
): DaeunPeriod['advanced'] {
  // 십이운성 계산 (대운 지지 기준)
  const sibiunseongResult = calculateSibiUnseong(
    dayStem,
    daeunBranch, // 대운 지지를 년지로
    daeunBranch,
    daeunBranch,
    daeunBranch
  )

  // 통변성 계산
  const tongbyeonStem = getTongByeonSeong(dayStem, daeunStem)

  // 지지는 간단히 처리
  const branchElement = BRANCH_ELEMENTS[daeunBranch]
  let tongbyeonBranch: TongByeonSeong = '비견'

  // 간단한 통변성 판단 (오행 관계만 고려)
  const dayStemElement = STEM_ELEMENTS[dayStem]
  if (dayStemElement === branchElement) {
    tongbyeonBranch = '비견'
  } else if (generates(dayStemElement, branchElement)) {
    tongbyeonBranch = '식신'
  } else if (controls(dayStemElement, branchElement)) {
    tongbyeonBranch = '편재'
  } else if (controls(branchElement, dayStemElement)) {
    tongbyeonBranch = '정관'
  } else if (generates(branchElement, dayStemElement)) {
    tongbyeonBranch = '정인'
  }

  // 에너지 강도 판단 (십이운성 기준)
  const energy: '강' | '중' | '약' =
    ['제왕', '건록', '장생'].includes(sibiunseongResult.year) ? '강' :
    ['사', '절', '병'].includes(sibiunseongResult.year) ? '약' : '중'

  // 원국과의 상호작용 분석
  let interaction = ''

  if (energy === '강') {
    if (tongbyeonStem === '정인' || tongbyeonStem === '편인') {
      interaction = '학문과 명예를 얻기 좋은 시기. 귀인의 도움이 많습니다.'
    } else if (tongbyeonStem === '정재' || tongbyeonStem === '편재') {
      interaction = '재물운이 좋고 사업 확장에 유리한 시기입니다.'
    } else if (tongbyeonStem === '정관' || tongbyeonStem === '편관') {
      interaction = '책임과 권한이 커지는 시기. 리더십을 발휘할 기회가 많습니다.'
    } else if (tongbyeonStem === '식신' || tongbyeonStem === '상관') {
      interaction = '창의성과 표현력이 빛나는 시기. 새로운 도전을 시작하기 좋습니다.'
    } else {
      interaction = '동료나 경쟁자와의 관계가 중요한 시기입니다.'
    }
  } else if (energy === '약') {
    interaction = '몸과 마음을 다스리고 에너지를 충전하는 시기. 무리하지 말고 안정을 추구하세요.'
  } else {
    interaction = '안정적이고 평온한 시기. 꾸준한 노력이 좋은 결과를 만듭니다.'
  }

  return {
    sibiunseong: {
      stem: sibiunseongResult.year,
      branch: sibiunseongResult.year,
    },
    tongbyeon: {
      stem: tongbyeonStem,
      branch: tongbyeonBranch,
    },
    energy,
    interaction,
  }
}

// 오행 상생
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

// 오행 상극
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
