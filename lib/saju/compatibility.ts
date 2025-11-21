import { calculateSaju, type SajuResult } from './calculator'
import { analyzeAdvancedSaju, type AdvancedSajuAnalysis } from './advanced'
import type { TongByeonSeong } from './tongbyeon'

export interface CompatibilityInput {
  person1: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    isLunar: boolean
    gender: 'male' | 'female'
    name?: string
  }
  person2: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    isLunar: boolean
    gender: 'male' | 'female'
    name?: string
  }
}

export interface CompatibilityResult {
  person1: SajuResult
  person2: SajuResult
  score: number // 0-100
  harmony: {
    heavenlyStem: number // 천간 조화도
    earthlyBranch: number // 지지 조화도
    elements: number // 오행 조화도
  }
  relationships: {
    type: 'harmony' | 'conflict' | 'generation' | 'control' | 'neutral'
    description: string
    pillars: string[] // 어느 기둥에서 발생하는지
  }[]
  strengths: string[]
  weaknesses: string[]
  advice: string[]
  // 고급 이론
  advancedAnalysis?: {
    person1: AdvancedSajuAnalysis
    person2: AdvancedSajuAnalysis
    tongbyeonCompatibility: {
      complementary: TongByeonSeong[] // 보완적인 통변성
      conflicting: TongByeonSeong[] // 충돌하는 통변성
      score: number // 통변성 궁합 점수
    }
    sinsalCompatibility: {
      sharedGoodSinsals: string[] // 공통 길신
      sharedBadSinsals: string[] // 공통 흉살
      balanceScore: number // 신살 균형 점수
    }
    sibiunseongCompatibility: {
      energyBalance: number // 에너지 균형 점수
      lifeStageMatch: string // 생애 주기 매칭
    }
  }
}

// 천간 관계
const HEAVENLY_STEM_HARMONY: { [key: string]: string } = {
  '甲己': '합토',
  '乙庚': '합금',
  '丙辛': '합수',
  '丁壬': '합목',
  '戊癸': '합화',
}

const HEAVENLY_STEM_CONFLICT: { [key: string]: string } = {
  '甲庚': '충',
  '乙辛': '충',
  '丙壬': '충',
  '丁癸': '충',
}

// 지지 관계
const EARTHLY_BRANCH_HARMONY: { [key: string]: string } = {
  '子丑': '합토',
  '寅亥': '합목',
  '卯戌': '합화',
  '辰酉': '합금',
  '巳申': '합수',
  '午未': '합화',
}

const EARTHLY_BRANCH_CONFLICT: { [key: string]: string } = {
  '子午': '충',
  '丑未': '충',
  '寅申': '충',
  '卯酉': '충',
  '辰戌': '충',
  '巳亥': '충',
}

// 오행 상생/상극
const ELEMENT_GENERATION: { [key: string]: string } = {
  '木火': '목생화',
  '火土': '화생토',
  '土金': '토생금',
  '金水': '금생수',
  '水木': '수생목',
}

const ELEMENT_CONTROL: { [key: string]: string } = {
  '木土': '목극토',
  '土水': '토극수',
  '水火': '수극화',
  '火金': '화극금',
  '金木': '금극목',
}

/**
 * 두 사람의 궁합을 분석합니다
 */
export function calculateCompatibility(input: CompatibilityInput): CompatibilityResult {
  // 각자의 사주 계산
  const person1 = calculateSaju(
    input.person1.year,
    input.person1.month,
    input.person1.day,
    input.person1.hour,
    input.person1.minute,
    input.person1.isLunar,
    input.person1.gender
  )

  const person2 = calculateSaju(
    input.person2.year,
    input.person2.month,
    input.person2.day,
    input.person2.hour,
    input.person2.minute,
    input.person2.isLunar,
    input.person2.gender
  )

  // 고급 이론 분석
  const advanced1 = analyzeAdvancedSaju(person1)
  const advanced2 = analyzeAdvancedSaju(person2)

  // 관계 분석
  const relationships = analyzeRelationships(person1, person2)

  // 조화도 계산
  const harmony = {
    heavenlyStem: calculateHeavenlyStemHarmony(person1, person2),
    earthlyBranch: calculateEarthlyBranchHarmony(person1, person2),
    elements: calculateElementsHarmony(person1, person2),
  }

  // 종합 점수 계산 (가중 평균)
  const score = Math.round(
    harmony.heavenlyStem * 0.3 + harmony.earthlyBranch * 0.4 + harmony.elements * 0.3
  )

  // 강점과 약점 분석
  const strengths: string[] = []
  const weaknesses: string[] = []
  const advice: string[] = []

  // 점수에 따른 평가
  if (score >= 80) {
    strengths.push('전반적으로 매우 조화로운 관계입니다')
    strengths.push('서로에게 긍정적인 영향을 주는 사이입니다')
    advice.push('현재의 좋은 관계를 유지하며 서로를 존중하세요')
  } else if (score >= 60) {
    strengths.push('기본적으로 잘 맞는 궁합입니다')
    advice.push('서로의 차이를 인정하고 존중하면 좋은 관계가 됩니다')
  } else if (score >= 40) {
    advice.push('노력과 이해가 필요한 관계입니다')
    advice.push('서로의 장점을 찾아 칭찬하고 격려하세요')
  } else {
    weaknesses.push('조화롭지 않은 부분이 많습니다')
    advice.push('서로를 이해하려는 깊은 노력이 필요합니다')
  }

  // 오행 조화도에 따른 평가
  if (harmony.elements >= 70) {
    strengths.push('오행 균형이 좋아 서로 보완적입니다')
  } else if (harmony.elements < 40) {
    weaknesses.push('오행 불균형으로 갈등이 생길 수 있습니다')
  }

  // 천간 조화도에 따른 평가
  if (harmony.heavenlyStem >= 70) {
    strengths.push('가치관과 성격이 잘 맞습니다')
  } else if (harmony.heavenlyStem < 40) {
    weaknesses.push('생각과 가치관의 차이가 클 수 있습니다')
  }

  // 지지 조화도에 따른 평가
  if (harmony.earthlyBranch >= 70) {
    strengths.push('생활 방식과 습관이 잘 맞습니다')
  } else if (harmony.earthlyBranch < 40) {
    weaknesses.push('생활 패턴의 차이로 불편함이 있을 수 있습니다')
  }

  // 고급 이론 궁합 분석
  const tongbyeonCompatibility = analyzeTongbyeonCompatibility(advanced1, advanced2)
  const sinsalCompatibility = analyzeSinsalCompatibility(advanced1, advanced2)
  const sibiunseongCompatibility = analyzeSibiunseongCompatibility(advanced1, advanced2)

  // 고급 이론에 따른 추가 평가
  if (tongbyeonCompatibility.score >= 70) {
    strengths.push('성격과 재능이 서로를 보완합니다')
  } else if (tongbyeonCompatibility.score < 40) {
    weaknesses.push('성향 차이로 인한 갈등이 있을 수 있습니다')
  }

  if (sinsalCompatibility.balanceScore >= 70) {
    strengths.push('운세적으로 서로에게 좋은 영향을 줍니다')
  }

  if (sibiunseongCompatibility.energyBalance >= 70) {
    strengths.push('생애 에너지가 조화롭게 흐릅니다')
  }

  return {
    person1,
    person2,
    score,
    harmony,
    relationships,
    strengths,
    weaknesses,
    advice,
    advancedAnalysis: {
      person1: advanced1,
      person2: advanced2,
      tongbyeonCompatibility,
      sinsalCompatibility,
      sibiunseongCompatibility,
    },
  }
}

/**
 * 천간 조화도 계산
 */
function calculateHeavenlyStemHarmony(p1: SajuResult, p2: SajuResult): number {
  let score = 50 // 기본 점수
  const pillars = ['year', 'month', 'day', 'hour'] as const

  pillars.forEach((pillar) => {
    const stem1 = p1[pillar].stem
    const stem2 = p2[pillar].stem
    const pair = stem1 + stem2
    const reversePair = stem2 + stem1

    if (HEAVENLY_STEM_HARMONY[pair] || HEAVENLY_STEM_HARMONY[reversePair]) {
      score += 15 // 합이 있으면 가점
    } else if (HEAVENLY_STEM_CONFLICT[pair] || HEAVENLY_STEM_CONFLICT[reversePair]) {
      score -= 10 // 충이 있으면 감점
    }
  })

  return Math.max(0, Math.min(100, score))
}

/**
 * 지지 조화도 계산
 */
function calculateEarthlyBranchHarmony(p1: SajuResult, p2: SajuResult): number {
  let score = 50 // 기본 점수
  const pillars = ['year', 'month', 'day', 'hour'] as const

  pillars.forEach((pillar) => {
    const branch1 = p1[pillar].branch
    const branch2 = p2[pillar].branch
    const pair = branch1 + branch2
    const reversePair = branch2 + branch1

    if (EARTHLY_BRANCH_HARMONY[pair] || EARTHLY_BRANCH_HARMONY[reversePair]) {
      score += 15 // 합이 있으면 가점
    } else if (EARTHLY_BRANCH_CONFLICT[pair] || EARTHLY_BRANCH_CONFLICT[reversePair]) {
      score -= 10 // 충이 있으면 감점
    }
  })

  return Math.max(0, Math.min(100, score))
}

/**
 * 오행 조화도 계산
 */
function calculateElementsHarmony(p1: SajuResult, p2: SajuResult): number {
  const elements1 = p1.elements
  const elements2 = p2.elements

  // 두 사람의 오행 균형 차이 계산
  const diff =
    Math.abs(elements1.wood - elements2.wood) +
    Math.abs(elements1.fire - elements2.fire) +
    Math.abs(elements1.earth - elements2.earth) +
    Math.abs(elements1.metal - elements2.metal) +
    Math.abs(elements1.water - elements2.water)

  // 차이가 작을수록 조화로움 (최대 차이 40 기준)
  const score = Math.max(0, 100 - diff * 2.5)

  return Math.round(score)
}

/**
 * 관계 분석
 */
function analyzeRelationships(
  p1: SajuResult,
  p2: SajuResult
): CompatibilityResult['relationships'] {
  const relationships: CompatibilityResult['relationships'] = []
  const pillars = ['year', 'month', 'day', 'hour'] as const
  const pillarNames = ['년주', '월주', '일주', '시주']

  // 천간 관계 분석
  pillars.forEach((pillar, index) => {
    const stem1 = p1[pillar].stem
    const stem2 = p2[pillar].stem
    const pair = stem1 + stem2
    const reversePair = stem2 + stem1

    if (HEAVENLY_STEM_HARMONY[pair] || HEAVENLY_STEM_HARMONY[reversePair]) {
      const harmonyType =
        HEAVENLY_STEM_HARMONY[pair] || HEAVENLY_STEM_HARMONY[reversePair]
      relationships.push({
        type: 'harmony',
        description: `천간 ${harmonyType} - 서로 협력하고 조화로운 관계`,
        pillars: [pillarNames[index]],
      })
    } else if (HEAVENLY_STEM_CONFLICT[pair] || HEAVENLY_STEM_CONFLICT[reversePair]) {
      relationships.push({
        type: 'conflict',
        description: '천간 충 - 의견 충돌 가능성',
        pillars: [pillarNames[index]],
      })
    }
  })

  // 지지 관계 분석
  pillars.forEach((pillar, index) => {
    const branch1 = p1[pillar].branch
    const branch2 = p2[pillar].branch
    const pair = branch1 + branch2
    const reversePair = branch2 + branch1

    if (EARTHLY_BRANCH_HARMONY[pair] || EARTHLY_BRANCH_HARMONY[reversePair]) {
      const harmonyType =
        EARTHLY_BRANCH_HARMONY[pair] || EARTHLY_BRANCH_HARMONY[reversePair]
      relationships.push({
        type: 'harmony',
        description: `지지 ${harmonyType} - 생활 습관과 리듬이 잘 맞음`,
        pillars: [pillarNames[index]],
      })
    } else if (EARTHLY_BRANCH_CONFLICT[pair] || EARTHLY_BRANCH_CONFLICT[reversePair]) {
      relationships.push({
        type: 'conflict',
        description: '지지 충 - 생활 패턴 차이로 인한 마찰',
        pillars: [pillarNames[index]],
      })
    }
  })

  // 오행 상생/상극 분석
  const elementPairs = [
    [p1.elements, p2.elements],
    [p2.elements, p1.elements],
  ]

  elementPairs.forEach(([elem1, elem2]) => {
    // 상생 관계 확인
    if (elem1.wood > 2 && elem2.fire > 2) {
      relationships.push({
        type: 'generation',
        description: '목생화 - 서로를 성장시키는 관계',
        pillars: ['오행'],
      })
    }
    if (elem1.fire > 2 && elem2.earth > 2) {
      relationships.push({
        type: 'generation',
        description: '화생토 - 안정감을 주는 관계',
        pillars: ['오행'],
      })
    }
    if (elem1.earth > 2 && elem2.metal > 2) {
      relationships.push({
        type: 'generation',
        description: '토생금 - 서로를 지원하는 관계',
        pillars: ['오행'],
      })
    }
    if (elem1.metal > 2 && elem2.water > 2) {
      relationships.push({
        type: 'generation',
        description: '금생수 - 감성적 교감이 좋은 관계',
        pillars: ['오행'],
      })
    }
    if (elem1.water > 2 && elem2.wood > 2) {
      relationships.push({
        type: 'generation',
        description: '수생목 - 서로를 발전시키는 관계',
        pillars: ['오행'],
      })
    }

    // 상극 관계 확인
    if (elem1.wood > 3 && elem2.earth > 3) {
      relationships.push({
        type: 'control',
        description: '목극토 - 가치관 충돌 가능',
        pillars: ['오행'],
      })
    }
    if (elem1.earth > 3 && elem2.water > 3) {
      relationships.push({
        type: 'control',
        description: '토극수 - 감정 표현 방식 차이',
        pillars: ['오행'],
      })
    }
    if (elem1.water > 3 && elem2.fire > 3) {
      relationships.push({
        type: 'control',
        description: '수극화 - 열정과 냉정의 대립',
        pillars: ['오행'],
      })
    }
    if (elem1.fire > 3 && elem2.metal > 3) {
      relationships.push({
        type: 'control',
        description: '화극금 - 성격 차이로 인한 갈등',
        pillars: ['오행'],
      })
    }
    if (elem1.metal > 3 && elem2.wood > 3) {
      relationships.push({
        type: 'control',
        description: '금극목 - 완고함과 유연함의 대립',
        pillars: ['오행'],
      })
    }
  })

  return relationships
}

/**
 * 통변성 궁합 분석
 */
function analyzeTongbyeonCompatibility(
  advanced1: AdvancedSajuAnalysis,
  advanced2: AdvancedSajuAnalysis
) {
  const tb1 = advanced1.tongbyeon
  const tb2 = advanced2.tongbyeon

  // 보완적인 통변성 찾기
  const complementary: TongByeonSeong[] = []
  const conflicting: TongByeonSeong[] = []

  // 재성(재물) - 식상(표현력) 조합은 좋음
  if ((tb1.dominant.includes('편재') || tb1.dominant.includes('정재')) &&
      (tb2.dominant.includes('식신') || tb2.dominant.includes('상관'))) {
    complementary.push('편재', '식신')
  }

  // 관성(명예) - 인성(학문) 조합은 좋음
  if ((tb1.dominant.includes('정관') || tb1.dominant.includes('편관')) &&
      (tb2.dominant.includes('정인') || tb2.dominant.includes('편인'))) {
    complementary.push('정관', '정인')
  }

  // 식상 - 인성은 충돌
  if ((tb1.dominant.includes('식신') || tb1.dominant.includes('상관')) &&
      (tb2.dominant.includes('정인') || tb2.dominant.includes('편인'))) {
    conflicting.push('식신', '정인')
  }

  // 비겁이 둘 다 강하면 충돌
  if ((tb1.summary['비견'] + tb1.summary['겁재'] > 3) &&
      (tb2.summary['비견'] + tb2.summary['겁재'] > 3)) {
    conflicting.push('비견')
  }

  // 점수 계산
  let score = 50
  score += complementary.length * 15
  score -= conflicting.length * 10

  // 주요 통변성이 다양하면 가점
  if (tb1.dominant.length + tb2.dominant.length >= 4) {
    score += 10
  }

  return {
    complementary,
    conflicting,
    score: Math.max(0, Math.min(100, score))
  }
}

/**
 * 신살 궁합 분석
 */
function analyzeSinsalCompatibility(
  advanced1: AdvancedSajuAnalysis,
  advanced2: AdvancedSajuAnalysis
) {
  const s1 = advanced1.sinsal
  const s2 = advanced2.sinsal

  // 공통 신살 찾기
  const names1 = s1.sinsals.map(s => s.name)
  const names2 = s2.sinsals.map(s => s.name)

  const sharedGoodSinsals = names1.filter(n =>
    names2.includes(n) &&
    s1.sinsals.find(s => s.name === n)?.isGood
  )

  const sharedBadSinsals = names1.filter(n =>
    names2.includes(n) &&
    !s1.sinsals.find(s => s.name === n)?.isGood
  )

  // 균형 점수 계산
  let balanceScore = 50

  // 둘 다 천을귀인이 있으면 매우 좋음
  if (s1.summary.hasCheonEulGuiIn && s2.summary.hasCheonEulGuiIn) {
    balanceScore += 20
  }

  // 둘 다 문창귀인이 있으면 좋음
  if (s1.summary.hasMunChangGuiIn && s2.summary.hasMunChangGuiIn) {
    balanceScore += 15
  }

  // 한 쪽이 길신이 많고 한 쪽이 흉살이 많으면 보완 관계
  if ((s1.summary.goodCount > s1.summary.badCount && s2.summary.badCount > s2.summary.goodCount) ||
      (s1.summary.badCount > s1.summary.goodCount && s2.summary.goodCount > s2.summary.badCount)) {
    balanceScore += 10
  }

  // 공통 길신이 많으면 가점
  balanceScore += sharedGoodSinsals.length * 5

  // 공통 흉살이 많으면 감점
  balanceScore -= sharedBadSinsals.length * 5

  return {
    sharedGoodSinsals,
    sharedBadSinsals,
    balanceScore: Math.max(0, Math.min(100, balanceScore))
  }
}

/**
 * 십이운성 궁합 분석
 */
function analyzeSibiunseongCompatibility(
  advanced1: AdvancedSajuAnalysis,
  advanced2: AdvancedSajuAnalysis
) {
  const u1 = advanced1.sibiunseong
  const u2 = advanced2.sibiunseong

  // 일주의 운성이 가장 중요
  const dayUnseong1 = u1.day
  const dayUnseong2 = u2.day

  // 에너지 균형 점수
  let energyBalance = 50

  // 강한 운성 (제왕, 건록, 장생)과 약한 운성 (사, 절, 병)의 조합은 보완적
  const strong = ['제왕', '건록', '장생']
  const weak = ['사', '절', '병']

  if ((strong.includes(dayUnseong1) && weak.includes(dayUnseong2)) ||
      (weak.includes(dayUnseong1) && strong.includes(dayUnseong2))) {
    energyBalance += 20
  }

  // 둘 다 강하면 충돌 가능
  if (strong.includes(dayUnseong1) && strong.includes(dayUnseong2)) {
    energyBalance -= 10
  }

  // 둘 다 약하면 문제
  if (weak.includes(dayUnseong1) && weak.includes(dayUnseong2)) {
    energyBalance -= 15
  }

  // 중간 운성끼리는 무난
  const moderate = ['관대', '목욕', '쇠', '묘', '태', '양']
  if (moderate.includes(dayUnseong1) && moderate.includes(dayUnseong2)) {
    energyBalance += 10
  }

  // 생애 주기 매칭
  let lifeStageMatch = ''
  if ((strong.includes(dayUnseong1) && weak.includes(dayUnseong2)) ||
      (weak.includes(dayUnseong1) && strong.includes(dayUnseong2))) {
    lifeStageMatch = '보완적 - 서로의 부족함을 채워주는 관계'
  } else if (strong.includes(dayUnseong1) && strong.includes(dayUnseong2)) {
    lifeStageMatch = '경쟁적 - 둘 다 강해서 주도권 다툼 가능'
  } else if (weak.includes(dayUnseong1) && weak.includes(dayUnseong2)) {
    lifeStageMatch = '공감적 - 어려움을 함께 이해하는 관계'
  } else {
    lifeStageMatch = '안정적 - 평온한 관계 유지'
  }

  return {
    energyBalance: Math.max(0, Math.min(100, energyBalance)),
    lifeStageMatch
  }
}
