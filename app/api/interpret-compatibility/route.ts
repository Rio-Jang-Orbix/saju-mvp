import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { CompatibilityResult } from '@/lib/saju/compatibility'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { compatibilityResult, person1Name, person2Name } = body as {
      compatibilityResult: CompatibilityResult
      person1Name: string
      person2Name: string
    }

    // OpenAI API가 설정되지 않은 경우 Mock 데이터 반환
    if (!openai) {
      const mockInterpretation = generateMockCompatibilityInterpretation(
        compatibilityResult,
        person1Name,
        person2Name
      )
      return NextResponse.json({ interpretation: mockInterpretation })
    }

    // AI 프롬프트 생성
    const prompt = `당신은 전문 명리학자이자 사주 상담가입니다. 두 사람의 궁합 분석 결과를 바탕으로 상세하고 따뜻한 조언을 제공해주세요.

[분석 대상]
- ${person1Name}님과 ${person2Name}님의 궁합

[궁합 점수 및 조화도]
- 종합 점수: ${compatibilityResult.score}점 / 100점
- 천간 조화도: ${compatibilityResult.harmony.heavenlyStem}점
- 지지 조화도: ${compatibilityResult.harmony.earthlyBranch}점
- 오행 조화도: ${compatibilityResult.harmony.elements}점

[${person1Name}님의 사주]
- 년주: ${compatibilityResult.person1.year.heavenlyStem}${compatibilityResult.person1.year.earthlyBranch}
- 월주: ${compatibilityResult.person1.month.heavenlyStem}${compatibilityResult.person1.month.earthlyBranch}
- 일주: ${compatibilityResult.person1.day.heavenlyStem}${compatibilityResult.person1.day.earthlyBranch}
- 시주: ${compatibilityResult.person1.hour.heavenlyStem}${compatibilityResult.person1.hour.earthlyBranch}
- 오행: 木${compatibilityResult.person1.elements.wood} 火${compatibilityResult.person1.elements.fire} 土${compatibilityResult.person1.elements.earth} 金${compatibilityResult.person1.elements.metal} 水${compatibilityResult.person1.elements.water}

[${person2Name}님의 사주]
- 년주: ${compatibilityResult.person2.year.heavenlyStem}${compatibilityResult.person2.year.earthlyBranch}
- 월주: ${compatibilityResult.person2.month.heavenlyStem}${compatibilityResult.person2.month.earthlyBranch}
- 일주: ${compatibilityResult.person2.day.heavenlyStem}${compatibilityResult.person2.day.earthlyBranch}
- 시주: ${compatibilityResult.person2.hour.heavenlyStem}${compatibilityResult.person2.hour.earthlyBranch}
- 오행: 木${compatibilityResult.person2.elements.wood} 火${compatibilityResult.person2.elements.fire} 土${compatibilityResult.person2.elements.earth} 金${compatibilityResult.person2.elements.metal} 水${compatibilityResult.person2.elements.water}

[자동 분석된 관계]
${compatibilityResult.relationships.map(r => `- ${r.description} (${r.pillars.join(', ')})`).join('\n')}

다음 항목들을 포함하여 상세하고 따뜻한 궁합 해석을 작성해주세요:

1. **종합 평가**: 두 사람의 궁합을 전반적으로 평가
2. **성격 및 가치관 조화**: 천간 조화도를 바탕으로 생각과 가치관의 조화 분석
3. **생활 패턴 조화**: 지지 조화도를 바탕으로 생활 습관과 리듬의 조화 분석
4. **오행 균형 분석**: 두 사람의 오행이 서로 어떻게 보완되는지 분석
5. **연애/결혼 궁합**: 연애와 결혼 생활에서의 조화와 주의사항
6. **직업 및 재물 궁합**: 함께 일하거나 재물을 관리할 때의 조화
7. **소통 및 갈등 해결**: 두 사람의 소통 방식과 갈등 해결 조언
8. **장기적 관계 조언**: 오래도록 좋은 관계를 유지하기 위한 구체적 조언

각 섹션을 명확히 구분하고, 긍정적이면서도 현실적인 조언을 제공해주세요.
따뜻하고 희망적인 톤을 유지하되, 개선이 필요한 부분은 솔직하게 언급해주세요.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            '당신은 30년 경력의 전문 명리학자입니다. 사주팔자를 깊이 이해하고 있으며, 따뜻하고 공감적인 상담으로 많은 사람들에게 도움을 주고 있습니다.',
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

function generateMockCompatibilityInterpretation(
  result: CompatibilityResult,
  person1Name: string,
  person2Name: string
): string {
  const score = result.score

  return `🔮 ${person1Name}님과 ${person2Name}님의 궁합 해석

## 1️⃣ 종합 평가

두 분의 궁합 점수는 ${score}점입니다. ${
    score >= 80
      ? '매우 이상적인 궁합으로, 서로를 깊이 이해하고 존중할 수 있는 관계입니다.'
      : score >= 60
      ? '좋은 궁합으로, 서로 노력한다면 행복한 관계를 만들어갈 수 있습니다.'
      : score >= 40
      ? '보통의 궁합으로, 서로의 차이를 인정하고 배려한다면 조화로운 관계가 가능합니다.'
      : '다소 어려운 궁합이지만, 진정한 사랑과 노력으로 극복할 수 있습니다.'
  }

## 2️⃣ 성격 및 가치관 조화 (천간 ${result.harmony.heavenlyStem}점)

${
  result.harmony.heavenlyStem >= 70
    ? `두 분은 생각하는 방식과 가치관이 매우 비슷합니다. 같은 목표를 향해 함께 나아갈 수 있으며,
서로의 생각을 쉽게 이해할 수 있습니다. 대화가 잘 통하고 의견 일치를 이루기 쉬운 편입니다.`
    : result.harmony.heavenlyStem >= 50
    ? `기본적으로 생각과 가치관이 통하는 편입니다. 때때로 관점의 차이가 있을 수 있지만,
대화를 통해 충분히 조율이 가능합니다. 서로의 다른 점을 존중하는 태도가 중요합니다.`
    : `가치관과 생각하는 방식에 차이가 있습니다. 서로의 관점을 이해하려는 노력이 필요하며,
차이를 인정하고 존중하는 태도가 관계의 핵심입니다. 토론보다는 경청이 중요합니다.`
}

## 3️⃣ 생활 패턴 조화 (지지 ${result.harmony.earthlyBranch}점)

${
  result.harmony.earthlyBranch >= 70
    ? `생활 리듬과 습관이 잘 맞는 편입니다. 함께 생활할 때 불편함이 적고,
일상의 루틴을 공유하기 쉽습니다. 같은 공간에서도 편안함을 느낄 수 있는 관계입니다.`
    : result.harmony.earthlyBranch >= 50
    ? `생활 패턴이 대체로 조화롭습니다. 일부 습관의 차이는 있을 수 있지만,
서로 양보하고 조율하면 편안한 일상을 만들 수 있습니다. 서로의 생활 리듬을 존중하세요.`
    : `생활 방식과 습관에 차이가 있습니다. 함께 지낼 때 서로의 패턴을 이해하고
조율하는 시간이 필요합니다. 각자의 공간과 시간을 존중하는 것이 중요합니다.`
}

## 4️⃣ 오행 균형 분석 (오행 ${result.harmony.elements}점)

${person1Name}님의 오행: 木${result.person1.elements.wood} 火${result.person1.elements.fire} 土${result.person1.elements.earth} 金${result.person1.elements.metal} 水${result.person1.elements.water}
${person2Name}님의 오행: 木${result.person2.elements.wood} 火${result.person2.elements.fire} 土${result.person2.elements.earth} 金${result.person2.elements.metal} 水${result.person2.elements.water}

${
  result.harmony.elements >= 70
    ? `두 분의 오행은 서로를 잘 보완합니다. 한 분이 부족한 기운을 다른 분이 채워주어
균형 잡힌 에너지를 만들어냅니다. 함께 있으면 서로의 장점이 더욱 빛납니다.`
    : result.harmony.elements >= 50
    ? `오행의 균형이 적절한 편입니다. 일부 영역에서는 보완이 되고,
일부는 비슷한 성향을 가지고 있습니다. 서로의 강점을 살리는 것이 좋습니다.`
    : `오행의 차이가 큽니다. 이는 서로 다른 에너지를 가지고 있다는 의미이며,
서로를 이해하는 데 시간이 필요할 수 있습니다. 차이를 매력으로 받아들이세요.`
}

## 5️⃣ 연애/결혼 궁합

${
  score >= 70
    ? `연애와 결혼 모두 좋은 궁합입니다. 서로에게 편안함과 설렘을 동시에 줄 수 있으며,
장기적인 관계를 유지하기에 좋은 조건을 갖추고 있습니다. 자연스럽게 발전하는 관계가 될 것입니다.`
    : score >= 50
    ? `연애 궁합은 양호합니다. 서로를 이해하고 배려한다면 행복한 관계를 만들 수 있습니다.
결혼 생활에서도 소통과 존중을 바탕으로 안정적인 가정을 꾸릴 수 있습니다.`
    : `연애에서 서로의 차이를 이해하는 과정이 필요합니다. 급하게 진행하기보다는
충분한 시간을 가지고 서로를 알아가는 것이 좋습니다. 노력이 필요한 관계입니다.`
}

## 6️⃣ 직업 및 재물 궁합

${
  score >= 60
    ? `함께 일하거나 재물을 관리할 때 좋은 시너지를 낼 수 있습니다.
서로의 강점을 살려 협력하면 좋은 성과를 이룰 수 있습니다.`
    : `재물 관리나 직업 선택에서는 각자의 의견을 존중하는 것이 좋습니다.
중요한 결정은 충분한 대화를 거쳐 함께 결정하세요.`
}

## 7️⃣ 소통 및 갈등 해결

${result.strengths.length > 0 ? `두 분의 강점:
${result.strengths.map(s => `• ${s}`).join('\n')}
` : ''}
${result.weaknesses.length > 0 ? `주의가 필요한 부분:
${result.weaknesses.map(w => `• ${w}`).join('\n')}
` : ''}

갈등이 생겼을 때는 서로를 비난하기보다 문제 자체에 집중하세요.
차분히 대화하고 상대방의 입장을 이해하려는 노력이 중요합니다.

## 8️⃣ 장기적 관계 조언

${result.advice.map(a => `• ${a}`).join('\n')}

• 서로의 다른 점을 매력으로 받아들이세요
• 정기적인 대화 시간을 가지세요
• 감사한 마음을 자주 표현하세요
• 각자의 성장을 응원하고 지지하세요

---

💝 궁합은 참고사항일 뿐, 두 분의 노력과 사랑이 가장 중요합니다.
서로를 존중하고 배려하는 마음으로 아름다운 관계를 만들어가시길 바랍니다.

* 이 해석은 AI 기반으로 생성되었으며, 참고용으로만 활용하시기 바랍니다.`
}
