import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SajuResult } from '@/lib/saju/calculator'
import { analyzeAdvancedSaju } from '@/lib/saju/advanced'

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { sajuResult }: { sajuResult: SajuResult } = await request.json()

    if (!sajuResult) {
      return NextResponse.json(
        { error: '사주 데이터가 필요합니다.' },
        { status: 400 }
      )
    }

    // 고급 이론 분석
    const advancedAnalysis = analyzeAdvancedSaju(sajuResult)

    // OpenAI API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      // API 키가 없으면 Mock 응답 반환
      const mockInterpretation = generateMockInterpretation(sajuResult, advancedAnalysis)
      return NextResponse.json({ interpretation: mockInterpretation })
    }

    // 사주 정보를 프롬프트로 변환
    const prompt = buildPrompt(sajuResult, advancedAnalysis)

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `당신은 전문적인 사주 명리학자입니다. 사주팔자를 분석하여 운세를 상세하게 해석해주세요.
          친근하고 긍정적인 톤으로 작성하되, 전문성을 유지하세요.
          다음 항목들을 포함하여 해석해주세요:
          1. 전체적인 성격 및 기질 (통변성 분석 포함)
          2. 오행 균형 분석
          3. 십이운성 분석 - 생애 주기별 에너지 상태
          4. 신살 분석 - 길신과 흉살의 영향
          5. 적성 및 진로 (통변성 기반 재능 분석)
          6. 대인관계 및 연애운
          7. 재물운 및 건강운
          8. 올해의 운세 (간단히)
          9. 조언 및 당부사항

          특히 십이운성, 신살, 통변성(십신) 이론을 활용하여 깊이 있는 해석을 제공해주세요.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const interpretation = completion.choices[0]?.message?.content || '해석을 생성할 수 없습니다.'

    return NextResponse.json({ interpretation })
  } catch (error: any) {
    console.error('AI 해석 오류:', error)

    // 오류 발생 시 Mock 응답 반환
    try {
      const sajuResult = await request.json().then(data => data.sajuResult)
      const advancedAnalysis = analyzeAdvancedSaju(sajuResult)
      const mockInterpretation = generateMockInterpretation(sajuResult, advancedAnalysis)
      return NextResponse.json({ interpretation: mockInterpretation })
    } catch {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}

/**
 * 사주 정보를 프롬프트로 변환
 */
function buildPrompt(saju: SajuResult, advanced: any): string {
  const { year, month, day, hour, elements, birthInfo } = saju
  const { sibiunseong, sinsal, tongbyeon } = advanced

  // 통변성 요약
  const dominantTongbyeon = tongbyeon.dominant.join(', ')
  const tongbyeonSummary = Object.entries(tongbyeon.summary)
    .filter(([_, count]: [string, any]) => count > 0)
    .map(([tb, count]) => `${tb}: ${count}개`)
    .join(', ')

  // 신살 요약
  const goodSinsals = sinsal.sinsals.filter((s: any) => s.isGood).map((s: any) => s.name).join(', ')
  const badSinsals = sinsal.sinsals.filter((s: any) => !s.isGood).map((s: any) => s.name).join(', ')

  return `
다음 사주를 분석해주세요:

【 기본 정보 】
- 생년월일시: ${birthInfo.year}년 ${birthInfo.month}월 ${birthInfo.day}일 ${birthInfo.hour}시 ${birthInfo.minute}분
- 달력: ${birthInfo.isLunar ? '음력' : '양력'}
- 성별: ${birthInfo.gender === 'male' ? '남성' : '여성'}

【 사주팔자 】
- 년주: ${year.stem}${year.branch} (${year.stemKr}${year.branchKr})
- 월주: ${month.stem}${month.branch} (${month.stemKr}${month.branchKr})
- 일주: ${day.stem}${day.branch} (${day.stemKr}${day.branchKr})
- 시주: ${hour.stem}${hour.branch} (${hour.stemKr}${hour.branchKr})

【 오행 분석 】
- 木 (목): ${elements['木']}개
- 火 (화): ${elements['火']}개
- 土 (토): ${elements['土']}개
- 金 (금): ${elements['金']}개
- 水 (수): ${elements['水']}개

【 십이운성 분석 】
- 년주: ${sibiunseong.year}
- 월주: ${sibiunseong.month}
- 일주: ${sibiunseong.day}
- 시주: ${sibiunseong.hour}

【 신살 분석 】
- 길신: ${goodSinsals || '없음'}
- 흉살: ${badSinsals || '없음'}

【 통변성 분석 (십신) 】
- 분포: ${tongbyeonSummary}
- 주요 성향: ${dominantTongbyeon}

위 사주를 바탕으로 상세한 운세 해석을 부탁드립니다.
십이운성, 신살, 통변성의 의미를 깊이 있게 반영하여 해석해주세요.
`.trim()
}

/**
 * Mock 해석 생성 (API 키가 없거나 오류 발생 시)
 */
function generateMockInterpretation(saju: SajuResult, advanced: any): string {
  const { year, month, day, hour, elements, birthInfo } = saju
  const { sibiunseong, sinsal, tongbyeon } = advanced

  // 오행 중 가장 많은 것과 적은 것 찾기
  const elementEntries = Object.entries(elements) as [string, number][]
  const maxElement = elementEntries.reduce((a, b) => a[1] > b[1] ? a : b)[0]
  const minElement = elementEntries.reduce((a, b) => a[1] < b[1] ? a : b)[0]

  const elementNames: { [key: string]: string } = {
    '木': '목(木)',
    '火': '화(火)',
    '土': '토(土)',
    '金': '금(金)',
    '水': '수(水)'
  }

  return `
🔮 사주팔자 종합 분석

안녕하세요! ${birthInfo.year}년생 ${birthInfo.gender === 'male' ? '남성' : '여성'}분의 사주를 분석해드리겠습니다.

━━━━━━━━━━━━━━━━━━━━

📌 전체적인 성격 및 기질

당신의 일주(日柱)는 ${day.stem}${day.branch}(${day.stemKr}${day.branchKr})로, 이는 당신의 본질적인 성격을 나타냅니다.
일간 ${day.stem}(${day.stemKr})은 ${day.element}의 기운을 가지고 있어, 기본적으로 ${getElementPersonality(day.element)} 성향을 띱니다.

년주의 ${year.stem}${year.branch}는 당신의 선천적인 기질과 조상의 덕을 나타내며,
월주의 ${month.stem}${month.branch}는 부모와의 관계 및 청년기의 운을 보여줍니다.

━━━━━━━━━━━━━━━━━━━━

🌈 오행 균형 분석

당신의 사주에서 ${elementNames[maxElement]} 기운이 ${elements[maxElement]}개로 가장 강하게 나타납니다.
반면 ${elementNames[minElement]} 기운은 ${elements[minElement]}개로 상대적으로 약합니다.

${getElementBalance(maxElement, minElement)}

━━━━━━━━━━━━━━━━━━━━

⚡ 십이운성 분석 (生命의 主期)

- 년주: ${sibiunseong.year} - ${sibiunseong.descriptions.year}
- 월주: ${sibiunseong.month} - ${sibiunseong.descriptions.month}
- 일주: ${sibiunseong.day} - ${sibiunseong.descriptions.day}
- 시주: ${sibiunseong.hour} - ${sibiunseong.descriptions.hour}

특히 일주의 ${sibiunseong.day}는 당신의 핵심 에너지를 나타내며,
${sibiunseong.descriptions.day}

━━━━━━━━━━━━━━━━━━━━

⭐ 신살 분석

${sinsal.sinsals.length > 0 ? sinsal.sinsals.map((s: any) =>
  `• ${s.name} (${s.position.join(', ')}): ${s.description}`
).join('\n') : '특별한 신살이 없습니다.'}

길신 ${sinsal.summary.goodCount}개, 흉살 ${sinsal.summary.badCount}개로 ${
  sinsal.summary.goodCount > sinsal.summary.badCount ? '긍정적인 기운이 우세합니다.' :
  sinsal.summary.goodCount < sinsal.summary.badCount ? '조심스러운 행동이 필요합니다.' :
  '균형잡힌 상태입니다.'
}

━━━━━━━━━━━━━━━━━━━━

👥 통변성 분석 (十神)

주요 성향: ${tongbyeon.dominant.join(', ')}
${tongbyeon.dominant.map((tb: any) => {
  const descriptions: any = {
    '비견': '독립심과 자존심이 강하며 협력보다는 경쟁을 선호합니다.',
    '겁재': '행동력과 추진력이 강하나 재물 관리에 주의가 필요합니다.',
    '식신': '온화하고 낙천적이며 예술적 재능이 있습니다.',
    '상관': '뛰어난 재능과 표현력이 있으나 기존 틀을 거부하는 성향이 있습니다.',
    '편재': '사업과 투자에 능하며 활동적으로 재물을 얻습니다.',
    '정재': '근면하고 성실하며 안정적으로 재물을 축적합니다.',
    '편관': '강한 추진력과 승부욕이 있으나 스트레스도 많습니다.',
    '정관': '정직하고 책임감이 강하며 사회적 지위를 중시합니다.',
    '편인': '지적이고 창의적이나 외로움을 느끼기 쉽습니다.',
    '정인': '학문을 좋아하고 어른의 도움을 받으며 덕망이 있습니다.'
  }
  return `• ${tb}: ${descriptions[tb] || ''}`
}).join('\n')}

━━━━━━━━━━━━━━━━━━━━

💼 적성 및 진로

${day.element} 일간의 특성상, ${getCareerAdvice(day.element)}

시주 ${hour.stem}${hour.branch}는 말년운과 자녀운을 나타내는데, 이는 당신이 노년에 ${getHourInterpretation(hour.element)}

━━━━━━━━━━━━━━━━━━━━

💕 대인관계 및 연애운

${birthInfo.gender === 'male' ?
  `남성의 경우 재성(財星)이 배우자를 나타냅니다. 당신의 사주에서는 조화로운 관계를 이룰 수 있는 기운이 보입니다.` :
  `여성의 경우 관성(官星)이 배우자를 나타냅니다. 당신의 사주에서는 좋은 인연을 만날 수 있는 가능성이 엿보입니다.`}

대인관계에서는 ${month.element} 기운의 영향으로 ${getRelationshipAdvice(month.element)}

━━━━━━━━━━━━━━━━━━━━

💰 재물운 및 건강운

재물운: 오행의 균형을 볼 때, ${getWealthAdvice(elements)}

건강운: ${elementNames[minElement]} 기운이 약하므로, 관련 장기에 유의하시고 균형잡힌 식단과 규칙적인 생활을 유지하세요.

━━━━━━━━━━━━━━━━━━━━

✨ 올해의 운세

현재 운세는 전반적으로 안정적인 흐름을 보이고 있습니다.
${maxElement} 기운이 강한 시기이므로, 이를 잘 활용하면 좋은 결과를 얻을 수 있습니다.

특히 ${getCurrentYearAdvice()} 노력하시면 더욱 좋은 운을 맞이하실 수 있습니다.

━━━━━━━━━━━━━━━━━━━━

🙏 조언 및 당부사항

1. 오행의 균형을 맞추기 위해 ${elementNames[minElement]} 기운을 보강하세요
   (색상: ${getElementColor(minElement)}, 방향: ${getElementDirection(minElement)})

2. 자신의 강점인 ${elementNames[maxElement]} 기운을 잘 활용하되, 지나치지 않도록 주의하세요

3. 꾸준한 자기계발과 긍정적인 마음가짐으로 운을 더욱 좋게 만들어가세요

사주는 하나의 참고사항입니다. 가장 중요한 것은 현재의 노력과 긍정적인 마음가짐입니다.
당신의 앞날에 행운이 가득하길 바랍니다! 🍀

━━━━━━━━━━━━━━━━━━━━

💡 참고: 이 해석은 기본 분석이며, 더 상세한 해석을 원하시면 전문가와 상담하시는 것을 권장드립니다.
`.trim()
}

// 헬퍼 함수들
function getElementPersonality(element: string): string {
  const personalities: { [key: string]: string } = {
    '木': '성장과 확장을 추구하며, 창의적이고 진취적인',
    '火': '열정적이고 활동적이며, 리더십이 강한',
    '土': '안정적이고 신뢰할 수 있으며, 현실적인',
    '金': '원칙적이고 분석적이며, 결단력 있는',
    '水': '지혜롭고 유연하며, 깊이 있는 사고를 하는'
  }
  return personalities[element] || '독특한'
}

function getElementBalance(maxElement: string, minElement: string): string {
  return `${maxElement} 기운이 강한 것은 강점이 될 수 있지만, 때로는 균형을 잃을 수 있으니 주의가 필요합니다.
${minElement} 기운을 보강하면 전체적인 조화를 이룰 수 있습니다. 이를 위해 ${minElement}의 색상이나 방향성을 일상생활에 활용해보세요.`
}

function getCareerAdvice(element: string): string {
  const careers: { [key: string]: string } = {
    '木': '교육, 예술, 창작 분야나 성장 산업에서 두각을 나타낼 수 있습니다',
    '火': '리더십이 필요한 관리직, 영업, 서비스업에서 능력을 발휘할 수 있습니다',
    '土': '부동산, 건축, 행정 등 안정적인 분야에서 성공할 가능성이 높습니다',
    '金': '금융, 법률, 정밀 기술 분야에서 전문성을 발휘할 수 있습니다',
    '水': '연구, 학문, IT, 유통 등 흐름을 다루는 분야에 적합합니다'
  }
  return careers[element] || '다양한 분야에서 능력을 발휘할 수 있습니다'
}

function getHourInterpretation(element: string): string {
  return `${element} 기운의 영향으로 편안하고 안정적인 시간을 보낼 수 있을 것으로 보입니다.`
}

function getRelationshipAdvice(element: string): string {
  const advice: { [key: string]: string } = {
    '木': '성장을 함께 할 수 있는 관계를 중시합니다',
    '火': '열정적이고 활발한 교류를 즐깁니다',
    '土': '신뢰와 안정감을 바탕으로 한 관계를 선호합니다',
    '金': '명확하고 원칙적인 관계를 추구합니다',
    '水': '깊이 있고 지적인 교감을 중요하게 생각합니다'
  }
  return advice[element] || '조화로운 관계를 이룰 수 있습니다'
}

function getWealthAdvice(elements: { [key: string]: number }): string {
  const total = Object.values(elements).reduce((a, b) => a + b, 0)
  if (total >= 7) {
    return '오행의 기운이 충만하여 재물을 모을 수 있는 기회가 많습니다. 꾸준한 노력이 결실을 맺을 것입니다.'
  }
  return '안정적인 재물 축적이 가능합니다. 무리한 투자보다는 착실한 저축이 유리합니다.'
}

function getCurrentYearAdvice(): string {
  const advices = [
    '새로운 시도를 하거나 자기계발에',
    '대인관계를 넓히고 네트워킹에',
    '건강관리와 자기관리에',
    '재테크와 재무계획에',
    '목표 설정과 실천에'
  ]
  return advices[Math.floor(Math.random() * advices.length)]
}

function getElementColor(element: string): string {
  const colors: { [key: string]: string } = {
    '木': '초록색, 청록색',
    '火': '빨강색, 주황색',
    '土': '노란색, 갈색',
    '金': '흰색, 금색',
    '水': '검정색, 파란색'
  }
  return colors[element] || '자신에게 어울리는 색상'
}

function getElementDirection(element: string): string {
  const directions: { [key: string]: string } = {
    '木': '동쪽',
    '火': '남쪽',
    '土': '중앙',
    '金': '서쪽',
    '水': '북쪽'
  }
  return directions[element] || '좋은 방향'
}
