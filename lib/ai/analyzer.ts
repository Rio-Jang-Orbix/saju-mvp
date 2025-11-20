import { openai, withRetry } from './client'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { AnalysisResult } from '@/types'

const ANALYZE_PROMPT = readFileSync(
  join(process.cwd(), 'prompts/analyze.txt'),
  'utf-8'
)

export async function analyzeConversation(
  conversation: string,
  userId: string
): Promise<Omit<AnalysisResult, 'id' | 'createdAt'>> {
  // Check if we have a valid OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY
  const hasValidApiKey = apiKey && !apiKey.includes('placeholder') && !apiKey.includes('demo-key') && apiKey.startsWith('sk-')

  if (!hasValidApiKey) {
    console.log('Using mock analysis - no valid OpenAI API key')
    return getMockAnalysis(conversation, userId)
  }

  try {
    const prompt = ANALYZE_PROMPT.replace('{{CONVERSATION}}', conversation)

    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 전문적인 연애 대화 분석가입니다. 한국어 대화의 뉘앙스를 잘 이해하고 객관적으로 분석합니다.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })

      const content = completion.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from OpenAI')
      }

      return JSON.parse(content)
    })

    // Validate the response structure
    if (!result.emotion || !result.intention || !Array.isArray(result.risk_signals) || !Array.isArray(result.suggestions)) {
      throw new Error('Invalid analysis result structure')
    }

    return {
      userId,
      conversationText: conversation,
      emotion: result.emotion,
      intention: result.intention,
      riskSignals: result.risk_signals,
      suggestions: result.suggestions
    }
  } catch (error) {
    console.error('OpenAI analysis failed, falling back to mock:', error)
    return getMockAnalysis(conversation, userId)
  }
}

function getMockAnalysis(conversation: string, userId: string): Omit<AnalysisResult, 'id' | 'createdAt'> {
  return {
    userId,
    conversationText: conversation,
    emotion: {
      type: 'positive',
      confidence: 0.85,
      description: '전반적으로 긍정적이고 호감을 보이는 대화 분위기입니다.'
    },
    intention: {
      type: 'showing_interest',
      indicators: ['관심 표현', '질문하기', '대화 지속 의도']
    },
    riskSignals: [],
    suggestions: [
      '상대방이 호감을 보이고 있으니 자연스럽게 대화를 이어나가세요',
      '공통 관심사에 대해 더 깊이 이야기해보는 것이 좋겠습니다',
      '다음 만남에 대한 제안을 해보는 것도 좋은 타이밍입니다'
    ]
  }
}

export async function generateReplies(
  conversationText: string,
  analysisResult: any,
  userProfile?: any
): Promise<any[]> {
  // Check if we have a valid OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY
  const hasValidApiKey = apiKey && !apiKey.includes('placeholder') && !apiKey.includes('demo-key') && apiKey.startsWith('sk-')

  if (!hasValidApiKey) {
    console.log('Using mock replies - no valid OpenAI API key')
    return getMockReplies()
  }

  try {
    const REPLY_PROMPT = readFileSync(
      join(process.cwd(), 'prompts/reply.txt'),
      'utf-8'
    )

    const prompt = REPLY_PROMPT
      .replace('{{CONVERSATION}}', conversationText)
      .replace('{{ANALYSIS_RESULT}}', JSON.stringify(analysisResult))
      .replace('{{USER_PROFILE}}', JSON.stringify(userProfile || {}))

    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: '당신은 연애 상담 전문가입니다. 한국어 대화의 맥락을 이해하고 자연스러운 답장을 제안합니다.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })

      const content = completion.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from OpenAI')
      }

      return JSON.parse(content)
    })

    if (!result.replies || !Array.isArray(result.replies)) {
      throw new Error('Invalid reply result structure')
    }

    return result.replies
  } catch (error) {
    console.error('OpenAI reply generation failed, falling back to mock:', error)
    return getMockReplies()
  }
}

function getMockReplies(): any[] {
  return [
    {
      tone: 'gentle',
      message: '와 정말 재미있었어요! 다음에 또 그런 이야기 들려주세요 😊',
      reasoning: '상대방의 이야기에 긍정적으로 반응하면서 지속적인 대화 의지를 보여줍니다.'
    },
    {
      tone: 'neutral',
      message: '그런 경험이 있으셨군요. 저도 비슷한 생각을 해본 적이 있어요.',
      reasoning: '공감을 표현하면서 자연스럽게 본인의 경험을 공유할 수 있는 여지를 남깁니다.'
    },
    {
      tone: 'playful',
      message: '헉 대박! 그거 정말 신기하네요 ㅋㅋ 저도 해보고 싶어져요!',
      reasoning: '활발하고 유쾌한 톤으로 상대방의 관심사에 호기심을 보여줍니다.'
    }
  ]
}

export async function generateDatePlans(
  analysisResult: any,
  userProfile: any
): Promise<any[]> {
  const DATE_PLAN_PROMPT = readFileSync(
    join(process.cwd(), 'prompts/date-plan.txt'),
    'utf-8'
  )

  const prompt = DATE_PLAN_PROMPT
    .replace('{{ANALYSIS_RESULT}}', JSON.stringify(analysisResult))
    .replace('{{USER_PROFILE}}', JSON.stringify(userProfile))

  const result = await withRetry(async () => {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 서울 지역 데이트 코스 전문가입니다. 실제 장소를 기반으로 실용적인 데이트 플랜을 제안합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(content)
  })

  if (!result.plans || !Array.isArray(result.plans)) {
    throw new Error('Invalid date plan result structure')
  }

  return result.plans
}