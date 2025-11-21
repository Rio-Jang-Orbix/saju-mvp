/**
 * 신살 (神殺)
 * 사주에서 길흉을 판단하는 특수한 신살들
 */

export type SinsalType =
  | '천을귀인' // 天乙貴人 - 최고의 길신
  | '문창귀인' // 文昌貴人 - 학문과 문예
  | '화개' // 華蓋 - 예술, 종교, 고독
  | '도화' // 桃花 - 이성운, 인기
  | '역마' // 驛馬 - 이동, 변화
  | '백호대살' // 白虎大殺 - 흉살
  | '공망' // 空亡 - 공허함

export interface Sinsal {
  name: SinsalType
  position: string[] // 어느 기둥에 있는지
  isGood: boolean // 길신인지 흉살인지
  description: string
}

export interface SinsalResult {
  sinsals: Sinsal[]
  summary: {
    goodCount: number
    badCount: number
    hasCheonEulGuiIn: boolean
    hasMunChangGuiIn: boolean
  }
}

// 천을귀인 테이블 (일간 기준)
const CHEON_EUL_GUI_IN: { [key: string]: string[] } = {
  甲: ['丑', '未'],
  戊: ['丑', '未'],
  庚: ['丑', '未'],
  乙: ['子', '申'],
  己: ['子', '申'],
  丙: ['亥', '酉'],
  丁: ['亥', '酉'],
  辛: ['寅', '午'],
  壬: ['卯', '巳'],
  癸: ['卯', '巳'],
}

// 문창귀인 테이블 (일간 또는 년간 기준)
const MUN_CHANG_GUI_IN: { [key: string]: string } = {
  甲: '巳',
  乙: '午',
  丙: '申',
  丁: '酉',
  戊: '申',
  己: '酉',
  庚: '亥',
  辛: '子',
  壬: '寅',
  癸: '卯',
}

// 화개살 테이블 (일지 또는 년지 기준)
const HWA_GAE: { [key: string]: string } = {
  寅: '戌',
  午: '戌',
  戌: '戌',
  申: '辰',
  子: '辰',
  辰: '辰',
  巳: '丑',
  酉: '丑',
  丑: '丑',
  亥: '未',
  卯: '未',
  未: '未',
}

// 도화살 테이블 (일지 또는 년지 기준)
const DO_HWA: { [key: string]: string } = {
  寅: '卯',
  午: '卯',
  戌: '卯',
  申: '酉',
  子: '酉',
  辰: '酉',
  巳: '午',
  酉: '午',
  丑: '午',
  亥: '子',
  卯: '子',
  未: '子',
}

// 역마살 테이블 (일지 또는 년지 기준)
const YEOK_MA: { [key: string]: string } = {
  寅: '申',
  午: '申',
  戌: '申',
  申: '寅',
  子: '寅',
  辰: '寅',
  巳: '亥',
  酉: '亥',
  丑: '亥',
  亥: '巳',
  卯: '巳',
  未: '巳',
}

// 백호대살 테이블 (년지 기준)
const BAEK_HO: { [key: string]: string } = {
  子: '酉',
  丑: '午',
  寅: '卯',
  卯: '子',
  辰: '酉',
  巳: '午',
  午: '卯',
  未: '子',
  申: '酉',
  酉: '午',
  戌: '卯',
  亥: '子',
}

// 공망 테이블 (일주 기준)
const GONG_MANG: { [key: string]: string[] } = {
  甲子: ['戌', '亥'],
  甲戌: ['申', '酉'],
  甲申: ['午', '未'],
  甲午: ['辰', '巳'],
  甲辰: ['寅', '卯'],
  甲寅: ['子', '丑'],
}

/**
 * 신살 계산
 */
export function calculateSinsal(
  yearStem: string,
  yearBranch: string,
  monthBranch: string,
  dayStem: string,
  dayBranch: string,
  hourBranch: string
): SinsalResult {
  const sinsals: Sinsal[] = []
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch]
  const positions = ['년', '월', '일', '시']

  // 천을귀인 (일간 기준)
  const cheonEulBranches = CHEON_EUL_GUI_IN[dayStem] || []
  const cheonEulPositions = branches
    .map((branch, idx) => (cheonEulBranches.includes(branch) ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (cheonEulPositions.length > 0) {
    sinsals.push({
      name: '천을귀인',
      position: cheonEulPositions,
      isGood: true,
      description:
        '가장 강력한 길신. 귀인의 도움을 받고 위기에서 벗어나는 힘이 있습니다. 리더십과 카리스마가 있습니다.',
    })
  }

  // 문창귀인 (일간 기준)
  const munChangBranch = MUN_CHANG_GUI_IN[dayStem]
  const munChangPositions = branches
    .map((branch, idx) => (branch === munChangBranch ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (munChangPositions.length > 0) {
    sinsals.push({
      name: '문창귀인',
      position: munChangPositions,
      isGood: true,
      description:
        '학문과 문예의 길신. 총명하고 학습 능력이 뛰어납니다. 문서 작업과 창작 활동에 유리합니다.',
    })
  }

  // 화개살 (일지 기준)
  const hwaGaeBranch = HWA_GAE[dayBranch]
  const hwaGaePositions = branches
    .map((branch, idx) => (branch === hwaGaeBranch ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (hwaGaePositions.length > 0) {
    sinsals.push({
      name: '화개',
      position: hwaGaePositions,
      isGood: true,
      description:
        '예술과 종교, 철학의 기운. 예술적 재능과 영적 감수성이 뛰어납니다. 고독을 즐기는 경향이 있습니다.',
    })
  }

  // 도화살 (일지 기준)
  const doHwaBranch = DO_HWA[dayBranch]
  const doHwaPositions = branches
    .map((branch, idx) => (branch === doHwaBranch ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (doHwaPositions.length > 0) {
    sinsals.push({
      name: '도화',
      position: doHwaPositions,
      isGood: true,
      description:
        '이성운과 인기의 기운. 매력적이고 사교적입니다. 예술과 미의 감각이 뛰어납니다.',
    })
  }

  // 역마살 (일지 기준)
  const yeokMaBranch = YEOK_MA[dayBranch]
  const yeokMaPositions = branches
    .map((branch, idx) => (branch === yeokMaBranch ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (yeokMaPositions.length > 0) {
    sinsals.push({
      name: '역마',
      position: yeokMaPositions,
      isGood: true,
      description:
        '이동과 변화의 기운. 활동적이고 변화를 즐깁니다. 여행, 이사, 해외 관련 일에 유리합니다.',
    })
  }

  // 백호대살 (년지 기준)
  const baekHoBranch = BAEK_HO[yearBranch]
  const baekHoPositions = branches
    .map((branch, idx) => (branch === baekHoBranch ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (baekHoPositions.length > 0) {
    sinsals.push({
      name: '백호대살',
      position: baekHoPositions,
      isGood: false,
      description:
        '흉살의 기운. 사고나 상해에 주의가 필요합니다. 신중하고 조심스러운 행동이 요구됩니다.',
    })
  }

  // 공망 계산 (일주 기준 - 간단화)
  const dayPillar = dayStem + dayBranch
  const gongMangKey = Object.keys(GONG_MANG).find((key) => dayPillar.startsWith(key.slice(0, 2)))
  const gongMangBranches = gongMangKey ? GONG_MANG[gongMangKey] : []
  const gongMangPositions = branches
    .map((branch, idx) => (gongMangBranches.includes(branch) ? positions[idx] : null))
    .filter((p) => p !== null) as string[]

  if (gongMangPositions.length > 0) {
    sinsals.push({
      name: '공망',
      position: gongMangPositions,
      isGood: false,
      description:
        '공허와 무의 기운. 일이 공허하게 끝나기 쉽습니다. 정신적 수양과 내면의 성찰이 필요합니다.',
    })
  }

  // 요약 정보
  const summary = {
    goodCount: sinsals.filter((s) => s.isGood).length,
    badCount: sinsals.filter((s) => !s.isGood).length,
    hasCheonEulGuiIn: sinsals.some((s) => s.name === '천을귀인'),
    hasMunChangGuiIn: sinsals.some((s) => s.name === '문창귀인'),
  }

  return {
    sinsals,
    summary,
  }
}
