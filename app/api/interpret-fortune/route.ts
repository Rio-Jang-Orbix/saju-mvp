import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { FortuneCalendar } from '@/lib/saju/fortune'
import type { SajuResult } from '@/lib/saju/calculator'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fortuneCalendar, sajuResult } = body as {
      fortuneCalendar: FortuneCalendar
      sajuResult: SajuResult
    }

    // OpenAI API가 설정되지 않은 경우 Mock 데이터 반환
    if (!openai) {
      const mockInterpretation = generateMockFortuneInterpretation(fortuneCalendar, sajuResult)
      return NextResponse.json({ interpretation: mockInterpretation })
    }

    // AI 프롬프트 생성
    const prompt = `당신은 전문 명리학자이자 사주 상담가입니다. 사용자의 사주를 바탕으로 이번 달과 오늘의 운세를 상세히 해석해주세요.

[사용자의 사주]
- 년주: ${sajuResult.year.heavenlyStem}${sajuResult.year.earthlyBranch}
- 월주: ${sajuResult.month.heavenlyStem}${sajuResult.month.earthlyBranch}
- 일주: ${sajuResult.day.heavenlyStem}${sajuResult.day.earthlyBranch}
- 시주: ${sajuResult.hour.heavenlyStem}${sajuResult.hour.earthlyBranch}
- 오행: 木${sajuResult.elements.wood} 火${sajuResult.elements.fire} 土${sajuResult.elements.earth} 金${sajuResult.elements.metal} 水${sajuResult.elements.water}
- 성별: ${sajuResult.birthInfo.gender === 'male' ? '남성' : '여성'}

[이번 달 운세]
- 월주: ${fortuneCalendar.currentMonth.heavenlyStem}${fortuneCalendar.currentMonth.earthlyBranch}
- 테마: ${fortuneCalendar.currentMonth.theme}
- 월 오행: 木${fortuneCalendar.currentMonth.elements.wood} 火${fortuneCalendar.currentMonth.elements.fire} 土${fortuneCalendar.currentMonth.elements.earth} 金${fortuneCalendar.currentMonth.elements.metal} 水${fortuneCalendar.currentMonth.elements.water}

[오늘의 운세]
- 일주: ${fortuneCalendar.today.heavenlyStem}${fortuneCalendar.today.earthlyBranch}
- 궁합도: ${fortuneCalendar.today.compatibility}
- 일 오행: 木${fortuneCalendar.today.elements.wood} 火${fortuneCalendar.today.elements.fire} 土${fortuneCalendar.today.elements.earth} 金${fortuneCalendar.today.elements.metal} 水${fortuneCalendar.today.elements.water}
- 행운의 색: ${fortuneCalendar.today.luckyColors.join(', ')}
- 행운의 방향: ${fortuneCalendar.today.luckyDirections.join(', ')}

[내일의 운세]
- 일주: ${fortuneCalendar.tomorrow.heavenlyStem}${fortuneCalendar.tomorrow.earthlyBranch}
- 궁합도: ${fortuneCalendar.tomorrow.compatibility}

다음 항목들을 포함하여 상세하고 실용적인 운세 해석을 작성해주세요:

1. **이번 달 전체 운세**: 월주와 사용자 사주의 조화를 바탕으로 이번 달의 전반적인 흐름 예측
2. **이번 달 핵심 조언**: 이번 달 특히 주의하거나 집중해야 할 사항
3. **오늘의 종합 운세**: 오늘 하루의 전반적인 운세와 에너지
4. **오늘의 분야별 운세**:
   - 업무/학업운
   - 금전운
   - 대인관계운
   - 건강운
   - 연애/가정운
5. **오늘의 실천 사항**: 오늘 하면 좋은 구체적인 행동 3가지
6. **오늘의 주의 사항**: 오늘 피하거나 조심해야 할 것들
7. **내일 준비**: 내일을 위해 오늘 준비하면 좋은 것들

실용적이고 구체적인 조언을 제공하되, 희망적이고 긍정적인 톤을 유지해주세요.
운세가 좋지 않더라도 극복할 수 있는 방법을 함께 제시해주세요.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            '당신은 30년 경력의 전문 명리학자입니다. 사주팔자와 일진을 깊이 이해하고 있으며, 실용적이고 따뜻한 조언으로 많은 사람들의 하루를 응원하고 있습니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2500,
    })

    const interpretation = completion.choices[0]?.message?.content || '해석을 생성할 수 없습니다.'

    return NextResponse.json({ interpretation })
  } catch (error) {
    console.error('AI 해석 생성 오류:', error)
    return NextResponse.json(
      { error: 'AI 해석을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function generateMockFortuneInterpretation(
  fortuneCalendar: FortuneCalendar,
  sajuResult: SajuResult
): string {
  const monthTheme = fortuneCalendar.currentMonth.theme
  const todayCompatibility = fortuneCalendar.today.compatibility
  const tomorrowCompatibility = fortuneCalendar.tomorrow.compatibility

  const compatibilityText = {
    excellent: '매우 좋은',
    good: '좋은',
    normal: '평범한',
    caution: '조심스러운',
    warning: '주의가 필요한',
  }

  return `🔮 ${sajuResult.birthInfo.year}년생 ${sajuResult.birthInfo.gender === 'male' ? '남성' : '여성'}의 월운·일운 해석

## 🌙 이번 달 전체 운세

이번 달은 "${monthTheme}"의 기운이 강합니다.
월주 ${fortuneCalendar.currentMonth.heavenlyStem}${fortuneCalendar.currentMonth.earthlyBranch}와 당신의 사주가 만나 ${
    fortuneCalendar.currentMonth.elements.wood >= 2 ||
    fortuneCalendar.currentMonth.elements.fire >= 2
      ? '활발하고 역동적인 한 달'
      : fortuneCalendar.currentMonth.elements.earth >= 2
      ? '안정적이고 차분한 한 달'
      : fortuneCalendar.currentMonth.elements.metal >= 2
      ? '정리와 결단의 한 달'
      : '지혜롭고 유연한 한 달'
  }이 될 것입니다.

${fortuneCalendar.currentMonth.advice.map(advice => `• ${advice}`).join('\n')}

### 이번 달 핵심 조언

${
  fortuneCalendar.currentMonth.elements.wood >= 2
    ? `• 새로운 프로젝트나 계획을 시작하기 좋은 시기입니다
• 적극적으로 기회를 찾아 나서세요
• 창의적인 아이디어를 실행에 옮기세요`
    : fortuneCalendar.currentMonth.elements.fire >= 2
    ? `• 사람들과의 교류를 통해 에너지를 얻으세요
• 열정을 가지고 도전하되 무리하지 마세요
• 표현력과 리더십을 발휘할 기회가 많습니다`
    : fortuneCalendar.currentMonth.elements.earth >= 2
    ? `• 기반을 다지고 안정성을 확보하세요
• 재정 관리와 저축에 집중하기 좋습니다
• 꾸준함과 인내심이 좋은 결과를 만듭니다`
    : fortuneCalendar.currentMonth.elements.metal >= 2
    ? `• 불필요한 것들을 정리하고 정돈하세요
• 중요한 결정을 내리기 좋은 시기입니다
• 원칙과 기준을 명확히 하세요`
    : `• 유연한 사고로 변화에 대응하세요
• 학습과 자기계발에 투자하기 좋습니다
• 직관을 신뢰하되 신중하게 행동하세요`
}

## ☀️ 오늘의 종합 운세

오늘은 ${compatibilityText[todayCompatibility]} 하루입니다.
일주 ${fortuneCalendar.today.heavenlyStem}${fortuneCalendar.today.earthlyBranch}의 기운이 당신의 사주와 ${
    todayCompatibility === 'excellent' || todayCompatibility === 'good'
      ? '조화롭게 어울려 긍정적인 에너지를 만들어냅니다.'
      : todayCompatibility === 'normal'
      ? '적당히 조화를 이루며 평범한 하루를 만듭니다.'
      : '충돌하는 면이 있어 조심스러운 대응이 필요합니다.'
  }

### 📊 분야별 운세

**💼 업무/학업운 (${todayCompatibility === 'excellent' ? '⭐⭐⭐⭐⭐' : todayCompatibility === 'good' ? '⭐⭐⭐⭐' : todayCompatibility === 'normal' ? '⭐⭐⭐' : '⭐⭐'})**
${
  todayCompatibility === 'excellent' || todayCompatibility === 'good'
    ? '집중력이 높고 생산성이 좋은 날입니다. 중요한 업무나 시험에 도전하기 좋습니다.'
    : todayCompatibility === 'normal'
    ? '평소대로 꾸준히 진행하세요. 무리한 도전보다는 안정적인 진행이 좋습니다.'
    : '실수하기 쉬운 날입니다. 꼼꼼하게 확인하고 신중하게 행동하세요.'
}

**💰 금전운 (${todayCompatibility === 'excellent' ? '⭐⭐⭐⭐' : todayCompatibility === 'good' ? '⭐⭐⭐⭐' : todayCompatibility === 'normal' ? '⭐⭐⭐' : '⭐⭐'})**
${
  todayCompatibility === 'excellent' || todayCompatibility === 'good'
    ? '재물운이 좋은 편입니다. 투자나 계약을 고려할 수 있습니다.'
    : todayCompatibility === 'normal'
    ? '평범한 금전운입니다. 큰 지출은 미루는 것이 좋습니다.'
    : '지출이 늘어날 수 있으니 절약을 생각하세요. 충동구매를 피하세요.'
}

**👥 대인관계운 (${todayCompatibility === 'excellent' ? '⭐⭐⭐⭐⭐' : todayCompatibility === 'good' ? '⭐⭐⭐⭐' : todayCompatibility === 'normal' ? '⭐⭐⭐' : '⭐⭐'})**
${
  todayCompatibility === 'excellent' || todayCompatibility === 'good'
    ? '사람들과의 만남이 즐겁고 유익한 날입니다. 새로운 인연을 만들기 좋습니다.'
    : todayCompatibility === 'normal'
    ? '평소 관계를 유지하세요. 큰 변화보다는 안정적인 교류가 좋습니다.'
    : '오해가 생기기 쉬운 날입니다. 말을 신중히 하고 경청하세요.'
}

**🏥 건강운 (${fortuneCalendar.today.elements.water >= 2 || fortuneCalendar.today.elements.earth >= 2 ? '⭐⭐⭐⭐' : '⭐⭐⭐'})**
${
  fortuneCalendar.today.elements.water >= 2
    ? '피로가 쌓이기 쉬운 날입니다. 충분한 수분 섭취와 휴식을 취하세요.'
    : fortuneCalendar.today.elements.fire >= 2
    ? '에너지가 넘치지만 과하면 탈이 납니다. 적당한 운동과 휴식의 균형이 중요합니다.'
    : '전반적으로 양호한 컨디션입니다. 규칙적인 생활 리듬을 유지하세요.'
}

**💕 연애/가정운 (${todayCompatibility === 'excellent' ? '⭐⭐⭐⭐⭐' : todayCompatibility === 'good' ? '⭐⭐⭐⭐' : todayCompatibility === 'normal' ? '⭐⭐⭐' : '⭐⭐'})**
${
  todayCompatibility === 'excellent' || todayCompatibility === 'good'
    ? '사랑하는 사람과 좋은 시간을 보낼 수 있는 날입니다. 마음을 표현하세요.'
    : todayCompatibility === 'normal'
    ? '평범하지만 안정적인 하루입니다. 작은 배려가 큰 행복을 만듭니다.'
    : '감정 기복이 있을 수 있습니다. 차분하게 대화하고 상대를 이해하려 노력하세요.'
}

### ✨ 오늘의 실천 사항

1. **행운의 색 활용**: ${fortuneCalendar.today.luckyColors.slice(0, 2).join(' 또는 ')} 계열의 옷이나 소품을 사용하세요
2. **행운의 방향**: ${fortuneCalendar.today.luckyDirections[0]}쪽을 향해 중요한 일을 하거나 산책하세요
3. **${
    todayCompatibility === 'excellent' || todayCompatibility === 'good'
      ? '오늘의 긍정 에너지를 활용해 미뤄뒀던 일을 시작하세요'
      : '차분하게 하루를 정리하고 내일을 준비하세요'
  }**

### ⚠️ 오늘의 주의 사항

${
  todayCompatibility === 'warning' || todayCompatibility === 'caution'
    ? `• 중요한 결정은 내일로 미루는 것이 좋습니다
• 감정적인 반응을 자제하고 이성적으로 판단하세요
• 말다툼이나 논쟁을 피하세요`
    : todayCompatibility === 'normal'
    ? `• 평소대로 행동하되 새로운 도전은 신중하게 결정하세요
• 건강 관리에 소홀하지 마세요
• 작은 것에 감사하는 마음을 가지세요`
    : `• 좋은 운세라도 방심하지 마세요
• 겸손한 태도를 유지하세요
• 주변 사람들에게 먼저 배려하세요`
}

## 🌅 내일 준비

내일은 ${compatibilityText[tomorrowCompatibility]} 하루가 예상됩니다.
${
  tomorrowCompatibility === 'excellent' || tomorrowCompatibility === 'good'
    ? `내일을 위해 오늘 미리 계획을 세우고 준비하세요. 좋은 기회를 놓치지 않도록 마음의 준비를 하세요.`
    : tomorrowCompatibility === 'normal'
    ? `내일은 평범한 하루가 될 것입니다. 오늘 충분히 휴식을 취하고 내일을 위한 에너지를 충전하세요.`
    : `내일은 조심스러운 대응이 필요한 날입니다. 오늘 마음을 차분히 가라앉히고 내일의 중요한 일정을 미리 확인하세요.`
}

---

🌟 운세는 참고사항입니다. 긍정적인 마음과 노력이 가장 중요합니다!

* 이 해석은 AI 기반으로 생성되었으며, 참고용으로만 활용하시기 바랍니다.`
}
