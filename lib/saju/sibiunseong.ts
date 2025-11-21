/**
 * 십이운성 (十二運星)
 * 일간과 지지의 관계로 생명의 12가지 주기를 나타냄
 */

export type SibiUnseong =
  | '장생' // 長生 - 탄생, 시작
  | '목욕' // 沐浴 - 세례, 불안정 (패지)
  | '관대' // 冠帶 - 성장, 성인식
  | '건록' // 建祿 - 성취, 안정 (임관)
  | '제왕' // 帝旺 - 절정, 최고점
  | '쇠' // 衰 - 쇠퇴 시작
  | '병' // 病 - 병듦, 어려움
  | '사' // 死 - 죽음, 끝
  | '묘' // 墓 - 무덤, 저장 (고)
  | '절' // 絶 - 절멸, 끊김
  | '태' // 胎 - 임신, 준비
  | '양' // 養 - 양육, 성장 준비

export interface SibiUnseongResult {
  year: SibiUnseong
  month: SibiUnseong
  day: SibiUnseong
  hour: SibiUnseong
  descriptions: {
    year: string
    month: string
    day: string
    hour: string
  }
}

// 천간 목록
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 지지 목록
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 십이운성 매핑 테이블
// 각 천간별로 12지지에 대응하는 십이운성
const SIBI_UNSEONG_TABLE: { [key: string]: SibiUnseong[] } = {
  // 갑목 (甲木) - 양목
  甲: ['목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양', '장생'],
  // 을목 (乙木) - 음목
  乙: ['양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태'],
  // 병화 (丙火) - 양화
  丙: ['태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절'],
  // 정화 (丁火) - 음화
  丁: ['절', '태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘'],
  // 무토 (戊土) - 양토
  戊: ['태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절'],
  // 기토 (己土) - 음토
  己: ['절', '태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘'],
  // 경금 (庚金) - 양금
  庚: ['사', '묘', '절', '태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠', '병'],
  // 신금 (辛金) - 음금
  辛: ['병', '사', '묘', '절', '태', '양', '장생', '목욕', '관대', '건록', '제왕', '쇠'],
  // 임수 (壬水) - 양수
  壬: ['건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양', '장생', '목욕', '관대'],
  // 계수 (癸水) - 음수
  癸: ['관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양', '장생', '목욕'],
}

/**
 * 십이운성 계산
 */
export function calculateSibiUnseong(
  dayStem: string, // 일간
  yearBranch: string,
  monthBranch: string,
  dayBranch: string,
  hourBranch: string
): SibiUnseongResult {
  const stemTable = SIBI_UNSEONG_TABLE[dayStem]

  if (!stemTable) {
    throw new Error(`Invalid day stem: ${dayStem}`)
  }

  const yearIndex = EARTHLY_BRANCHES.indexOf(yearBranch)
  const monthIndex = EARTHLY_BRANCHES.indexOf(monthBranch)
  const dayIndex = EARTHLY_BRANCHES.indexOf(dayBranch)
  const hourIndex = EARTHLY_BRANCHES.indexOf(hourBranch)

  const year = stemTable[yearIndex]
  const month = stemTable[monthIndex]
  const day = stemTable[dayIndex]
  const hour = stemTable[hourIndex]

  return {
    year,
    month,
    day,
    hour,
    descriptions: {
      year: getSibiUnseongDescription(year),
      month: getSibiUnseongDescription(month),
      day: getSibiUnseongDescription(day),
      hour: getSibiUnseongDescription(hour),
    },
  }
}

/**
 * 십이운성별 설명
 */
function getSibiUnseongDescription(unseong: SibiUnseong): string {
  const descriptions: { [key in SibiUnseong]: string } = {
    장생: '탄생과 시작의 기운. 새로운 것을 시작하고 성장하는 힘이 강합니다.',
    목욕: '세례와 정화의 시기. 불안정하지만 변화와 혁신의 가능성이 있습니다.',
    관대: '성인이 되어 사회에 나가는 시기. 책임감과 능력이 발휘됩니다.',
    건록: '안정과 성취의 시기. 능력을 인정받고 지위가 확고해집니다.',
    제왕: '최고의 전성기. 권위와 영향력이 최고조에 달합니다.',
    쇠: '쇠퇴의 시작. 여유를 찾고 내면을 돌아보는 시기입니다.',
    병: '어려움과 시련의 시기. 인내와 극복이 필요합니다.',
    사: '끝과 정리의 시기. 과거를 정리하고 새로운 준비를 합니다.',
    묘: '저장과 축적의 시기. 내면의 힘을 키우고 준비합니다.',
    절: '끊김과 단절. 완전히 새로운 시작을 위한 공백의 시기입니다.',
    태: '임신과 잉태. 새로운 것을 품고 준비하는 시기입니다.',
    양: '양육과 성장. 조용히 힘을 기르며 준비하는 시기입니다.',
  }

  return descriptions[unseong]
}

/**
 * 십이운성의 강약 점수 (1-10)
 */
export function getSibiUnseongStrength(unseong: SibiUnseong): number {
  const strength: { [key in SibiUnseong]: number } = {
    장생: 7,
    목욕: 3,
    관대: 6,
    건록: 9,
    제왕: 10,
    쇠: 5,
    병: 2,
    사: 1,
    묘: 4,
    절: 1,
    태: 4,
    양: 5,
  }

  return strength[unseong]
}

/**
 * 십이운성의 길흉 판단
 */
export function getSibiUnseongFortune(unseong: SibiUnseong): '길' | '흉' | '평' {
  const fortuneMap: { [key in SibiUnseong]: '길' | '흉' | '평' } = {
    장생: '길',
    목욕: '평',
    관대: '길',
    건록: '길',
    제왕: '길',
    쇠: '평',
    병: '흉',
    사: '흉',
    묘: '평',
    절: '흉',
    태: '평',
    양: '평',
  }

  return fortuneMap[unseong]
}
