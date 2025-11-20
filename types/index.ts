export interface UserProfile {
  id: string
  relationshipGoal: string
  personalityType: string
  budgetRange: string
  createdAt?: string
}

export interface AnalysisResult {
  id: string
  userId: string
  conversationText: string
  emotion: {
    type: 'positive' | 'neutral' | 'negative' | 'mixed'
    confidence: number
    description: string
  }
  intention: {
    type: 'showing_interest' | 'sharing_info' | 'declining' | 'testing_boundaries'
    indicators: string[]
  }
  riskSignals: Array<{
    type: string
    severity: 'low' | 'medium' | 'high'
    evidence: string
  }>
  suggestions: string[]
  createdAt?: string
}

export interface Reply {
  id: string
  analysisId: string
  tone: 'gentle' | 'neutral' | 'playful'
  message: string
  reasoning: string
  createdAt?: string
}

export interface DatePlan {
  id: string
  title: string
  time: string
  places: Array<{
    name: string
    address: string
    why: string
  }>
  estimatedCost: string
  inviteMessage: string
  tips: string[]
}

export interface DatePlanResponse {
  planId: string
  plans?: DatePlan[]
  preview?: {
    count: number
    themes: string[]
  }
  requiresPayment: boolean
}