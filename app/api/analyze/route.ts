import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db/supabase'
import { analyzeConversation, generateReplies } from '@/lib/ai/analyzer'
import crypto from 'crypto'

// Emergency mock database for when Supabase is not configured
class MockDatabase {
  private static analyses: Map<string, any> = new Map()
  private static replies: Map<string, any[]> = new Map()

  static async saveAnalysis(analysisData: any) {
    const id = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const analysis = { id, ...analysisData, created_at: new Date().toISOString() }
    this.analyses.set(id, analysis)
    return { data: analysis, error: null }
  }

  static async saveReplies(analysisId: string, replies: any[]) {
    this.replies.set(analysisId, replies)
    return { data: replies, error: null }
  }

  static async getAnalysis(id: string) {
    return { data: this.analyses.get(id) || null, error: null }
  }
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      const text = await request.text()
      // Enhanced JSON parsing with better error handling for Korean characters
      body = JSON.parse(text)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: '요청 데이터 형식이 올바르지 않습니다. 특수문자나 긴 텍스트로 인한 문제일 수 있습니다.' },
        { status: 400 }
      )
    }

    const { conversation, userId } = body

    // Enhanced validation with Korean support
    if (!conversation || typeof conversation !== 'string') {
      return NextResponse.json(
        { error: 'Conversation text is required' },
        { status: 400 }
      )
    }

    if (conversation.trim().length < 20) {
      return NextResponse.json(
        { error: '대화 내용이 너무 짧습니다. 최소 20자 이상 입력해주세요.' },
        { status: 400 }
      )
    }

    if (conversation.length > 5000) {
      return NextResponse.json(
        { error: '대화 내용이 너무 깁니다. 5000자 이하로 입력해주세요.' },
        { status: 400 }
      )
    }

    // Additional validation for character count
    const actualLength = conversation.trim().length
    if (actualLength > 5000) {
      return NextResponse.json(
        { error: '대화 내용이 너무 깁니다. 5000자 이하로 입력해주세요.' },
        { status: 400 }
      )
    }

    // Generate userId if not provided (for anonymous users)
    const finalUserId = userId || `anonymous_${crypto.randomUUID()}`

    // Get user profile for context (with fallback for missing DB)
    let userProfile = null
    if (userId && userId !== finalUserId && supabaseAdmin) {
      try {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()
        userProfile = profile
      } catch (error) {
        console.log('Profile lookup failed, continuing with mock profile')
        userProfile = null
      }
    }

    // Analyze conversation with AI
    console.log('Starting conversation analysis...')
    const analysisResult = await analyzeConversation(conversation, finalUserId)

    // Store analysis in database (with fallback to mock)
    let analysis, analysisError
    try {
      if (supabaseAdmin && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
        const result = await supabaseAdmin
          .from('analyses')
          .insert(analysisResult)
          .select('*')
          .single()
        analysis = result.data
        analysisError = result.error
      } else {
        throw new Error('Supabase not configured')
      }
    } catch (error) {
      console.log('Using mock database for analysis:', error.message)
      const result = await MockDatabase.saveAnalysis(analysisResult)
      analysis = result.data
      analysisError = result.error
    }

    if (analysisError) {
      console.error('Database error:', analysisError)
      return NextResponse.json(
        { error: 'Failed to save analysis' },
        { status: 500 }
      )
    }

    console.log('Analysis saved, generating replies...')

    // Generate replies with enhanced error handling
    const replies = await generateReplies(
      conversation,
      analysisResult,
      userProfile
    )

    // Store replies in database (with fallback to mock)
    try {
      if (supabaseAdmin && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
        const replyPromises = replies.map(reply =>
          supabaseAdmin
            .from('replies')
            .insert({
              analysis_id: analysis.id,
              tone: reply.tone,
              message: reply.message,
              reasoning: reply.reasoning
            })
        )
        await Promise.all(replyPromises)
      } else {
        throw new Error('Supabase not configured')
      }
    } catch (error) {
      console.log('Reply storage failed, using mock database:', error.message)
      await MockDatabase.saveReplies(analysis.id, replies)
    }

    console.log('Analysis complete:', analysis.id)

    // Track analytics event (with fallback)
    try {
      if (supabaseAdmin && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
        await supabaseAdmin
          .from('events')
          .insert({
            user_id: userId || null,
            event_name: 'conversation_analyzed',
            properties: {
              analysis_id: analysis.id,
              conversation_length: conversation.length,
              emotion_type: analysisResult.emotion?.type || 'unknown',
              intention_type: analysisResult.intention?.type || 'unknown',
              has_risk_signals: (analysisResult.riskSignals || []).length > 0
            }
          })
      } else {
        console.log('Analytics tracking skipped - Supabase not configured')
      }
    } catch (error) {
      console.log('Analytics tracking failed:', error.message)
    }

    return NextResponse.json({
      analysisId: analysis.id,
      emotion: analysis.emotion,
      intention: analysis.intention,
      riskSignals: analysis.risk_signals,
      suggestions: analysis.suggestions,
      replies: replies
    })

  } catch (error) {
    console.error('Analysis error:', error)

    // Check if it's an OpenAI API error
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'AI 분석 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}