-- Luvo MVP Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  relationship_goal TEXT NOT NULL,
  personality_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversation Analyses
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_text TEXT NOT NULL,
  emotion JSONB NOT NULL, -- {type: 'positive', confidence: 0.85, description: 'string'}
  intention JSONB NOT NULL, -- {type: 'showing_interest', indicators: ['string']}
  risk_signals JSONB DEFAULT '[]'::jsonb, -- [{type: 'string', severity: 'low', evidence: 'string'}]
  suggestions JSONB DEFAULT '[]'::jsonb, -- ['suggestion1', 'suggestion2']
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reply Suggestions
CREATE TABLE IF NOT EXISTS replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
  tone TEXT NOT NULL CHECK (tone IN ('gentle', 'neutral', 'playful')),
  message TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Date Plans
CREATE TABLE IF NOT EXISTS date_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plans JSONB NOT NULL, -- Array of {title, time, places, estimatedCost, inviteMessage, tips}
  is_paid BOOLEAN DEFAULT FALSE,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_replies_analysis_id ON replies(analysis_id);
CREATE INDEX IF NOT EXISTS idx_date_plans_user_id ON date_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_date_plans_analysis_id ON date_plans(analysis_id);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE date_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can manage their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Analyses: Users can manage their own analyses
CREATE POLICY "Users can view own analyses" ON analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Replies: Users can view replies for their analyses
CREATE POLICY "Users can view replies for own analyses" ON replies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = replies.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Service can insert replies" ON replies
  FOR INSERT WITH CHECK (true); -- Allow service to insert replies

-- Date Plans: Users can view their own date plans
CREATE POLICY "Users can view own date plans" ON date_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own date plans" ON date_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own date plans" ON date_plans
  FOR UPDATE USING (auth.uid() = user_id);

-- Events: Allow anonymous tracking and user-specific events
CREATE POLICY "Anyone can insert events" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own events" ON events
  FOR SELECT USING (
    user_id IS NULL OR auth.uid() = user_id
  );

-- Functions for better UX
CREATE OR REPLACE FUNCTION get_user_analysis_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM analyses
    WHERE user_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_recent_analyses(user_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  conversation_text TEXT,
  emotion JSONB,
  intention JSONB,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT a.id, a.conversation_text, a.emotion, a.intention, a.created_at
  FROM analyses a
  WHERE a.user_id = user_uuid
  ORDER BY a.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;