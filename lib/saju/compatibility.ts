import { calculateSaju, type SajuResult } from './calculator'

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

  return {
    person1,
    person2,
    score,
    harmony,
    relationships,
    strengths,
    weaknesses,
    advice,
  }
}

/**
 * 천간 조화도 계산
 */
function calculateHeavenlyStemHarmony(p1: SajuResult, p2: SajuResult): number {
  let score = 50 // 기본 점수
  const pillars = ['year', 'month', 'day', 'hour'] as const

  pillars.forEach((pillar) => {
    const stem1 = p1[pillar].heavenlyStem
    const stem2 = p2[pillar].heavenlyStem
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
    const branch1 = p1[pillar].earthlyBranch
    const branch2 = p2[pillar].earthlyBranch
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
    const stem1 = p1[pillar].heavenlyStem
    const stem2 = p2[pillar].heavenlyStem
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
    const branch1 = p1[pillar].earthlyBranch
    const branch2 = p2[pillar].earthlyBranch
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
