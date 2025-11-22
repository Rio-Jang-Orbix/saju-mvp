/**
 * 성명학 (姓名學) - 이름 분석
 * 한글 이름의 획수를 기반으로 오행과 길흉을 분석
 */

import type { SajuResult, Element } from './calculator'

// 한글 자음 획수 (초성/종성)
const CONSONANT_STROKES: { [key: string]: number } = {
  ㄱ: 2, ㄲ: 4, ㄴ: 2, ㄷ: 3, ㄸ: 6,
  ㄹ: 5, ㅁ: 4, ㅂ: 4, ㅃ: 8, ㅅ: 2,
  ㅆ: 4, ㅇ: 1, ㅈ: 3, ㅉ: 6, ㅊ: 4,
  ㅋ: 3, ㅌ: 4, ㅍ: 4, ㅎ: 3,
}

// 한글 모음 획수 (중성)
const VOWEL_STROKES: { [key: string]: number } = {
  ㅏ: 2, ㅐ: 3, ㅑ: 3, ㅒ: 4, ㅓ: 2,
  ㅔ: 3, ㅕ: 3, ㅖ: 4, ㅗ: 2, ㅘ: 4,
  ㅙ: 5, ㅚ: 3, ㅛ: 3, ㅜ: 2, ㅝ: 4,
  ㅞ: 5, ㅟ: 3, ㅠ: 3, ㅡ: 1, ㅢ: 2,
  ㅣ: 1,
}

// 자주 사용되는 한자 획수 (성씨 및 이름에 사용)
const HANJA_STROKES: { [key: string]: number } = {
  // 대표 성씨
  김: 8, 이: 7, 박: 6, 최: 12, 정: 9,
  강: 10, 조: 10, 윤: 12, 장: 11, 임: 6,
  한: 15, 오: 4, 서: 10, 신: 9, 권: 22,
  황: 12, 안: 6, 송: 7, 류: 10, 전: 13,
  홍: 9, 고: 10, 문: 4, 양: 13, 손: 10,
  배: 11, 백: 6, 허: 11, 유: 9, 남: 9,
  심: 8, 노: 15, 하: 7, 곽: 11, 성: 7,
  차: 9, 주: 8, 우: 6, 구: 11, 민: 5,
  진: 10, 나: 7, 지: 6, 엄: 20, 원: 10,
  천: 4, 방: 4, 공: 4, 현: 12, 함: 12,
  변: 9, 염: 17, 석: 5, 선: 15, 설: 14,
  마: 10, 길: 6, 연: 14, 위: 9, 표: 9,
  명: 8, 기: 12, 반: 5, 왕: 4, 금: 8,
  옥: 5, 육: 6, 인: 4, 맹: 8, 제: 14,
  모: 4, 탁: 8, 국: 11, 여: 8, 어: 14,
  은: 14, 편: 15, 용: 16, 예: 13, 경: 13,
  봉: 10, 사: 5, 부: 9, 가: 14, 복: 14,
  태: 4, 추: 13, 도: 12, 소: 8, 시: 5,
  범: 8, 수: 4, 점: 9, 필: 12, 선: 15,
  // 이름에 자주 쓰이는 한자
  준: 10, 민: 5, 지: 6, 현: 12, 서: 10,
  연: 14, 수: 4, 영: 9, 진: 10, 우: 6,
  성: 7, 호: 9, 재: 13, 동: 12, 희: 17,
  정: 9, 은: 14, 혜: 15, 미: 9, 승: 12,
  원: 10, 윤: 12, 하: 7, 유: 9, 태: 4,
  경: 13, 석: 5, 주: 8, 철: 21, 상: 11,
  용: 16, 기: 12, 형: 7, 광: 6, 일: 4,
  웅: 12, 훈: 16, 환: 17, 규: 11, 창: 12,
  선: 15, 종: 8, 인: 4, 건: 11, 혁: 17,
  찬: 22, 빈: 14, 율: 9, 온: 13, 담: 17,
  솔: 11, 린: 15, 나: 7, 라: 19, 아: 8,
  채: 11, 예: 13, 별: 7, 꽃: 10, 봄: 9,
  달: 4, 별: 7, 솔: 11, 샘: 9, 한: 15,
}

export interface SeongmyeongResult {
  name: string
  lastName: string
  firstName: string
  strokes: {
    lastName: number
    firstName: number[]
    total: number
  }
  oggyeok: {
    cheongyeok: OggyeokAnalysis // 천격 (성 + 1)
    ingyeok: OggyeokAnalysis   // 인격 (성 + 이름 첫글자)
    jigyeok: OggyeokAnalysis   // 지격 (이름 전체)
    oegyeok: OggyeokAnalysis   // 외격
    chonggyeok: OggyeokAnalysis // 총격 (전체)
  }
  element: Element
  elementBalance: {
    wood: number
    fire: number
    earth: number
    metal: number
    water: number
  }
  interpretation: string
  compatibility?: {
    score: number
    description: string
  }
}

export interface OggyeokAnalysis {
  name: string
  strokes: number
  element: Element
  yinYang: '양' | '음'
  fortune: '대길' | '길' | '반길' | '흉' | '대흉'
  meaning: string
}

/**
 * 한글 한 글자의 획수 계산
 */
function getKoreanCharacterStrokes(char: string): number {
  // 한자 데이터베이스에서 먼저 검색
  if (HANJA_STROKES[char]) {
    return HANJA_STROKES[char]
  }

  const code = char.charCodeAt(0)

  // 한글 음절 범위 (가 ~ 힣)
  if (code >= 0xAC00 && code <= 0xD7A3) {
    const baseCode = code - 0xAC00
    const cho = Math.floor(baseCode / 588) // 초성
    const jung = Math.floor((baseCode % 588) / 28) // 중성
    const jong = baseCode % 28 // 종성

    // 초성, 중성, 종성 인덱스를 실제 문자로 변환
    const choList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
    const jungList = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
    const jongList = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    let strokes = 0
    strokes += CONSONANT_STROKES[choList[cho]] || 0
    strokes += VOWEL_STROKES[jungList[jung]] || 0

    if (jong > 0) {
      const jongChar = jongList[jong]
      // 겹받침 처리
      if (jongChar.length === 2) {
        strokes += (CONSONANT_STROKES[jongChar[0]] || 0) + (CONSONANT_STROKES[jongChar[1]] || 0)
      } else {
        strokes += CONSONANT_STROKES[jongChar] || 0
      }
    }

    return strokes
  }

  return 0
}

/**
 * 이름 전체의 획수 계산
 */
function calculateNameStrokes(name: string): number[] {
  return [...name].map(char => getKoreanCharacterStrokes(char))
}

/**
 * 획수로 오행 판단
 */
function getElementFromStrokes(strokes: number): Element {
  const lastDigit = strokes % 10
  if (lastDigit === 1 || lastDigit === 2) return '木'
  if (lastDigit === 3 || lastDigit === 4) return '火'
  if (lastDigit === 5 || lastDigit === 6) return '土'
  if (lastDigit === 7 || lastDigit === 8) return '金'
  return '水' // 9, 0
}

/**
 * 획수로 음양 판단
 */
function getYinYangFromStrokes(strokes: number): '양' | '음' {
  return strokes % 2 === 1 ? '양' : '음'
}

/**
 * 획수별 길흉 판단 (수리오행)
 */
function getFortuneFromStrokes(strokes: number): OggyeokAnalysis['fortune'] {
  // 대길수: 1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68
  const greatLuck = [1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68]
  // 길수: 2, 10, 12, 14, 19, 20, 22, 27, 28, 30, 38, 40, 42, 44, 46, 49, 50, 51, 53, 55, 58, 59, 60, 62, 64, 66
  const luck = [2, 10, 12, 14, 19, 20, 22, 27, 28, 30, 38, 40, 42, 44, 46, 49, 50, 51, 53, 55, 58, 59, 60, 62, 64, 66]
  // 반길수: 26, 36, 54, 56
  const halfLuck = [26, 36, 54, 56]
  // 흉수: 4, 9, 34, 43
  const bad = [4, 9, 34, 43]

  if (greatLuck.includes(strokes)) return '대길'
  if (luck.includes(strokes)) return '길'
  if (halfLuck.includes(strokes)) return '반길'
  if (bad.includes(strokes)) return '흉'
  return '대흉'
}

/**
 * 오격별 의미 생성
 */
function getOggyeokMeaning(type: string, fortune: OggyeokAnalysis['fortune'], element: Element): string {
  const elementMeanings: { [key in Element]: string } = {
    '木': '성장, 발전, 창의성',
    '火': '열정, 명예, 인기',
    '土': '안정, 신뢰, 중용',
    '金': '결단력, 정의, 성공',
    '水': '지혜, 유연성, 재물',
  }

  const typeMeanings: { [key: string]: string } = {
    '천격': '조상운, 어린시절',
    '인격': '주운, 성격, 중년운',
    '지격': '초년운, 가정운',
    '외격': '대인관계, 사회운',
    '총격': '총운, 말년운',
  }

  const fortuneDesc = {
    '대길': '매우 좋음',
    '길': '좋음',
    '반길': '보통',
    '흉': '주의 필요',
    '대흉': '어려움 예상',
  }

  return `${typeMeanings[type]} - ${fortuneDesc[fortune]} (${elementMeanings[element]})`
}

/**
 * 오격 분석 생성
 */
function createOggyeokAnalysis(name: string, strokes: number): OggyeokAnalysis {
  const element = getElementFromStrokes(strokes)
  const fortune = getFortuneFromStrokes(strokes)

  return {
    name,
    strokes,
    element,
    yinYang: getYinYangFromStrokes(strokes),
    fortune,
    meaning: getOggyeokMeaning(name, fortune, element),
  }
}

/**
 * 성명학 분석 메인 함수
 */
export function analyzeSeongmyeong(fullName: string, saju?: SajuResult): SeongmyeongResult {
  // 성과 이름 분리 (첫 글자가 성)
  const lastName = fullName.charAt(0)
  const firstName = fullName.slice(1)

  // 획수 계산
  const lastNameStrokes = getKoreanCharacterStrokes(lastName)
  const firstNameStrokes = calculateNameStrokes(firstName)
  const totalFirstNameStrokes = firstNameStrokes.reduce((a, b) => a + b, 0)
  const totalStrokes = lastNameStrokes + totalFirstNameStrokes

  // 오격 계산
  const cheongyeok = lastNameStrokes + 1 // 천격
  const ingyeok = lastNameStrokes + (firstNameStrokes[0] || 0) // 인격
  const jigyeok = totalFirstNameStrokes + 1 // 지격
  const chonggyeok = totalStrokes // 총격
  const oegyeok = cheongyeok + jigyeok - ingyeok // 외격

  // 오행 균형 계산
  const elementBalance = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }

  const allElements = [
    getElementFromStrokes(cheongyeok),
    getElementFromStrokes(ingyeok),
    getElementFromStrokes(jigyeok),
    getElementFromStrokes(oegyeok),
    getElementFromStrokes(chonggyeok),
  ]

  allElements.forEach(el => {
    if (el === '木') elementBalance.wood++
    if (el === '火') elementBalance.fire++
    if (el === '土') elementBalance.earth++
    if (el === '金') elementBalance.metal++
    if (el === '水') elementBalance.water++
  })

  // 주요 오행 (인격 기준)
  const mainElement = getElementFromStrokes(ingyeok)

  // 결과 생성
  const result: SeongmyeongResult = {
    name: fullName,
    lastName,
    firstName,
    strokes: {
      lastName: lastNameStrokes,
      firstName: firstNameStrokes,
      total: totalStrokes,
    },
    oggyeok: {
      cheongyeok: createOggyeokAnalysis('천격', cheongyeok),
      ingyeok: createOggyeokAnalysis('인격', ingyeok),
      jigyeok: createOggyeokAnalysis('지격', jigyeok),
      oegyeok: createOggyeokAnalysis('외격', oegyeok),
      chonggyeok: createOggyeokAnalysis('총격', chonggyeok),
    },
    element: mainElement,
    elementBalance,
    interpretation: generateInterpretation(result),
  }

  // 사주와의 궁합 분석
  if (saju) {
    result.compatibility = analyzeSajuCompatibility(result, saju)
  }

  result.interpretation = generateInterpretation(result)

  return result
}

/**
 * 성명학 해석 생성
 */
function generateInterpretation(result: SeongmyeongResult): string {
  const { oggyeok, elementBalance } = result
  const interpretations: string[] = []

  // 인격 (주운) 해석
  if (oggyeok.ingyeok.fortune === '대길' || oggyeok.ingyeok.fortune === '길') {
    interpretations.push('이름의 주운이 좋아 대체로 순탄한 인생을 살 수 있습니다.')
  } else if (oggyeok.ingyeok.fortune === '흉' || oggyeok.ingyeok.fortune === '대흉') {
    interpretations.push('인격수에 주의가 필요합니다. 중년기에 신중한 판단이 요구됩니다.')
  }

  // 총격 (총운) 해석
  if (oggyeok.chonggyeok.fortune === '대길') {
    interpretations.push('총운이 매우 좋아 전반적인 인생운이 밝습니다.')
  } else if (oggyeok.chonggyeok.fortune === '대흉') {
    interpretations.push('총격이 약하므로 꾸준한 노력이 필요합니다.')
  }

  // 오행 균형 해석
  const dominant = Object.entries(elementBalance)
    .filter(([_, count]) => count >= 2)
    .map(([element]) => element)

  if (dominant.length > 0) {
    const elementNames: { [key: string]: string } = {
      wood: '목(木)',
      fire: '화(火)',
      earth: '토(土)',
      metal: '금(金)',
      water: '수(水)',
    }
    interpretations.push(`이름에서 ${dominant.map(d => elementNames[d]).join(', ')} 기운이 강합니다.`)
  }

  return interpretations.join(' ')
}

/**
 * 사주와 성명학 궁합 분석
 */
function analyzeSajuCompatibility(
  seongmyeong: SeongmyeongResult,
  saju: SajuResult
): { score: number; description: string } {
  let score = 50
  const descriptions: string[] = []

  const nameElement = seongmyeong.element
  const dayElement = saju.day.element // 일간 오행

  // 상생 관계 체크
  const generationMap: { [key in Element]: Element } = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  }

  // 상극 관계 체크
  const controlMap: { [key in Element]: Element } = {
    '木': '土', '土': '水', '水': '火', '火': '金', '金': '木'
  }

  // 같은 오행
  if (nameElement === dayElement) {
    score += 20
    descriptions.push('이름과 사주의 오행이 같아 조화롭습니다.')
  }
  // 상생 (이름이 사주를 생함)
  else if (generationMap[nameElement] === dayElement) {
    score += 15
    descriptions.push('이름이 사주를 도와주는 상생 관계입니다.')
  }
  // 상생 (사주가 이름을 생함)
  else if (generationMap[dayElement] === nameElement) {
    score += 10
    descriptions.push('사주가 이름을 뒷받침하는 좋은 관계입니다.')
  }
  // 상극 (이름이 사주를 극함)
  else if (controlMap[nameElement] === dayElement) {
    score -= 10
    descriptions.push('이름이 사주를 극하여 주의가 필요합니다.')
  }
  // 상극 (사주가 이름을 극함)
  else if (controlMap[dayElement] === nameElement) {
    score -= 15
    descriptions.push('사주가 이름을 극하여 보완이 필요합니다.')
  }

  // 사주에 부족한 오행을 이름이 보충하는지 체크
  const sajuElements = saju.elements
  const weakElements = Object.entries(sajuElements)
    .filter(([_, count]) => count === 0)
    .map(([element]) => element)

  const nameElementKr: { [key in Element]: string } = {
    '木': 'wood', '火': 'fire', '土': 'earth', '金': 'metal', '水': 'water'
  }

  if (weakElements.includes(nameElementKr[nameElement])) {
    score += 20
    descriptions.push('이름이 사주에 부족한 오행을 보충해줍니다!')
  }

  // 점수 범위 조정
  score = Math.max(0, Math.min(100, score))

  return {
    score,
    description: descriptions.join(' ') || '이름과 사주가 무난하게 조화됩니다.',
  }
}

/**
 * 오격별 상세 설명
 */
export function getOggyeokDescription(type: string): string {
  const descriptions: { [key: string]: string } = {
    천격: '조상으로부터 물려받은 운으로, 어린 시절의 운세에 영향을 줍니다. 직접적인 영향은 적지만 전체 균형에 중요합니다.',
    인격: '이름의 핵심이 되는 운으로, 성격과 재능, 중년기(35-55세)의 운세를 나타냅니다. 가장 중요한 격입니다.',
    지격: '초년운과 가정환경을 나타내며, 어린 시절부터 청년기(~35세)까지의 운세에 영향을 줍니다.',
    외격: '사회생활과 대인관계를 나타냅니다. 직장운, 사회적 성공, 외부 환경과의 관계를 보여줍니다.',
    총격: '일생의 총운을 나타내며, 특히 말년(55세 이후)의 운세에 큰 영향을 줍니다.',
  }
  return descriptions[type] || ''
}

/**
 * 오행별 특성 설명
 */
export function getElementDescription(element: Element): string {
  const descriptions: { [key in Element]: string } = {
    '木': '성장, 발전, 인내, 창의성을 상징합니다. 봄의 에너지로 새로운 시작과 확장에 유리합니다.',
    '火': '열정, 명예, 예술성, 표현력을 상징합니다. 여름의 에너지로 활동적이고 화려합니다.',
    '土': '안정, 신뢰, 중용, 포용력을 상징합니다. 중심의 에너지로 균형과 조화를 추구합니다.',
    '金': '결단력, 정의, 의리, 성취를 상징합니다. 가을의 에너지로 열매를 맺는 시기입니다.',
    '水': '지혜, 유연성, 재물, 소통을 상징합니다. 겨울의 에너지로 깊은 사색과 준비의 시기입니다.',
  }
  return descriptions[element]
}
