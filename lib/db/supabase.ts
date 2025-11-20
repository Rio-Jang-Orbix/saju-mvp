import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for browser/frontend use with RLS
export const supabase = (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseUrl.includes('mock'))
  ? null
  : createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes('placeholder') || supabaseUrl.includes('mock'))
  ? null
  : createClient(supabaseUrl, supabaseServiceKey)

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          relationship_goal: string
          personality_type: string
          budget_range: string
          created_at: string
        }
        Insert: {
          id: string
          relationship_goal: string
          personality_type: string
          budget_range: string
          created_at?: string
        }
        Update: {
          id?: string
          relationship_goal?: string
          personality_type?: string
          budget_range?: string
          created_at?: string
        }
      }
      analyses: {
        Row: {
          id: string
          user_id: string
          conversation_text: string
          emotion: any
          intention: any
          risk_signals: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          conversation_text: string
          emotion: any
          intention: any
          risk_signals: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          conversation_text?: string
          emotion?: any
          intention?: any
          risk_signals?: any
          created_at?: string
        }
      }
      replies: {
        Row: {
          id: string
          analysis_id: string
          tone: string
          message: string
          reasoning: string
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          tone: string
          message: string
          reasoning: string
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          tone?: string
          message?: string
          reasoning?: string
          created_at?: string
        }
      }
      date_plans: {
        Row: {
          id: string
          analysis_id: string
          user_id: string
          plans: any
          is_paid: boolean
          payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          analysis_id: string
          user_id: string
          plans: any
          is_paid?: boolean
          payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          analysis_id?: string
          user_id?: string
          plans?: any
          is_paid?: boolean
          payment_id?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          user_id: string | null
          event_name: string
          properties: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_name: string
          properties?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_name?: string
          properties?: any
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']