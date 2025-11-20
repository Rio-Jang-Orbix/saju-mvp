import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db/supabase'
import { generateReplies } from '@/lib/ai/analyzer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { analysisId } = body

    // Validation
    if (!analysisId) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      )
    }

    // Get analysis from database
    const { data: analysis, error: analysisError } = await supabaseAdmin
      .from('analyses')
      .select('*')
      .eq('id', analysisId)
      .single()

    if (analysisError || !analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      )
    }

    // Get user profile for context
    let userProfile = null
    if (analysis.user_id) {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', analysis.user_id)
        .single()

      userProfile = profile
    }

    // Check if replies already exist
    const { data: existingReplies, error: repliesError } = await supabaseAdmin
      .from('replies')
      .select('*')
      .eq('analysis_id', analysisId)

    if (repliesError) {
      console.error('Database error:', repliesError)
      return NextResponse.json(
        { error: 'Failed to check existing replies' },
        { status: 500 }
      )
    }

    // If replies exist, return them
    if (existingReplies && existingReplies.length > 0) {
      const formattedReplies = existingReplies.map(reply => ({
        id: reply.id,
        analysisId: reply.analysis_id,
        tone: reply.tone,
        message: reply.message,
        reasoning: reply.reasoning
      }))

      return NextResponse.json({
        replies: formattedReplies
      })
    }

    // Generate new replies if they don't exist
    console.log('Generating new replies for analysis:', analysisId)

    const newReplies = await generateReplies(
      analysis.conversation_text,
      {
        emotion: analysis.emotion,
        intention: analysis.intention,
        riskSignals: analysis.risk_signals,
        suggestions: analysis.suggestions
      },
      userProfile
    )

    // Store new replies in database
    const replyPromises = newReplies.map(reply =>
      supabaseAdmin
        .from('replies')
        .insert({
          analysis_id: analysisId,
          tone: reply.tone,
          message: reply.message,
          reasoning: reply.reasoning
        })
        .select('*')
        .single()
    )

    const replyResults = await Promise.all(replyPromises)

    const formattedReplies = replyResults.map(result => {
      if (result.error) {
        throw new Error('Failed to save reply')
      }
      return {
        id: result.data.id,
        analysisId: result.data.analysis_id,
        tone: result.data.tone,
        message: result.data.message,
        reasoning: result.data.reasoning
      }
    })

    // Track analytics event
    await supabaseAdmin
      .from('events')
      .insert({
        user_id: analysis.user_id,
        event_name: 'replies_generated',
        properties: {
          analysis_id: analysisId,
          reply_count: formattedReplies.length
        }
      })

    return NextResponse.json({
      replies: formattedReplies
    })

  } catch (error) {
    console.error('Reply generation error:', error)

    // Check if it's an OpenAI API error
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'AI 답장 생성 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: '답장 생성 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}