'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'

interface LiveStats {
  activeUsers: number
  completedAnalyses: number
  successRate: number
  averageTime: number
}

export function RealTimeLiveStats() {
  const { language } = useI18n()
  const [stats, setStats] = useState<LiveStats>({
    activeUsers: 2143,
    completedAnalyses: 15847,
    successRate: 98.2,
    averageTime: 12.3
  })

  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1, // -1 to +1 random change
        completedAnalyses: prev.completedAnalyses + Math.floor(Math.random() * 2), // 0 to +1 increment
        successRate: Math.max(97.5, Math.min(98.9, prev.successRate + (Math.random() - 0.5) * 0.1)), // Small fluctuation around 98.2%
        averageTime: Math.max(11.5, Math.min(13.2, prev.averageTime + (Math.random() - 0.5) * 0.3)) // Small fluctuation around 12.3s
      }))
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Simulate online/offline status
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setIsActive(prev => {
        // 95% chance to stay active, 5% chance to go offline briefly
        if (prev) {
          return Math.random() > 0.05
        } else {
          return Math.random() > 0.3 // 70% chance to come back online
        }
      })
    }, 5000)

    return () => clearInterval(statusInterval)
  }, [])

  return (
    <div className="inline-flex items-center gap-4 bg-white border border-luxury-gold shadow-lg rounded-full px-6 py-3">
      {/* Live Indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} ${isActive ? 'animate-pulse' : ''}`}></div>
        <span className="text-xs font-semibold text-luxury-charcoal">
          {isActive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Active Users */}
      <div className="flex items-center gap-2">
        <span className="text-lg">👥</span>
        <div>
          <div className="font-bold text-luxury-charcoal tabular-nums">
            {stats.activeUsers.toLocaleString()}
          </div>
          <div className="text-xs text-luxury-bronze">
            {language === 'en' ? 'active users' : '실시간 분석 중'}
          </div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="flex items-center gap-2">
        <span className="text-lg">✨</span>
        <div>
          <div className="font-bold text-luxury-charcoal tabular-nums">
            {stats.successRate.toFixed(1)}%
          </div>
          <div className="text-xs text-luxury-bronze">
            {language === 'en' ? 'success rate' : '분석 정확도'}
          </div>
        </div>
      </div>

      {/* Average Time */}
      <div className="flex items-center gap-2">
        <span className="text-lg">⚡</span>
        <div>
          <div className="font-bold text-luxury-charcoal tabular-nums">
            {stats.averageTime.toFixed(1)}s
          </div>
          <div className="text-xs text-luxury-bronze">
            {language === 'en' ? 'avg time' : '평균 시간'}
          </div>
        </div>
      </div>

      {/* Total Analyses */}
      <div className="flex items-center gap-2">
        <span className="text-lg">📊</span>
        <div>
          <div className="font-bold text-luxury-charcoal tabular-nums">
            {stats.completedAnalyses.toLocaleString()}
          </div>
          <div className="text-xs text-luxury-bronze">
            {language === 'en' ? 'completed' : '분석 완료'}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LiveUserCounter() {
  const { language } = useI18n()
  const [count, setCount] = useState(2143)
  const [recentActivity, setRecentActivity] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2 // -2 to +2 random change
      setCount(prev => Math.max(2000, prev + change))

      // Add recent activity
      const activities = [
        language === 'en' ? 'User joined from Seoul' : '서울에서 사용자 접속',
        language === 'en' ? 'Analysis completed' : '분석 완료',
        language === 'en' ? 'New signup from Busan' : '부산에서 신규 가입',
        language === 'en' ? 'Premium upgrade' : '프리미엄 업그레이드',
        language === 'en' ? 'Match found' : '매칭 성공'
      ]

      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      setRecentActivity(prev => [randomActivity, ...prev.slice(0, 2)])
    }, 2000)

    return () => clearInterval(interval)
  }, [language])

  return (
    <div className="bg-white border border-luxury-gold rounded-lg p-4 luxury-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="font-semibold text-luxury-charcoal">
          {language === 'en' ? 'Live Activity' : '실시간 활동'}
        </h3>
      </div>

      <div className="text-2xl font-bold text-luxury-charcoal mb-2 tabular-nums">
        {count.toLocaleString()} {language === 'en' ? 'users online' : '명 온라인'}
      </div>

      {recentActivity.length > 0 && (
        <div className="space-y-1">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className={`text-xs text-luxury-bronze opacity-${100 - index * 30} transition-opacity duration-1000`}
            >
              • {activity}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function RealTimeAnalysisIndicator() {
  const { language } = useI18n()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnalyzing(true)

      // Generate random user identifier
      const users = ['김**', '이**', '박**', 'J**', 'S**', 'L**']
      setCurrentUser(users[Math.floor(Math.random() * users.length)])

      // Stop analyzing after 3 seconds
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 3000)

    }, 8000) // Start new analysis every 8 seconds

    return () => clearInterval(interval)
  }, [])

  if (!isAnalyzing) return null

  return (
    <div className="fixed bottom-6 right-6 bg-white border border-luxury-accent rounded-lg p-4 luxury-shadow z-50 min-w-[280px]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-luxury-accent rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-luxury-charcoal">{currentUser}</span>
            <span className="text-xs bg-luxury-accent text-white px-2 py-1 rounded">
              {language === 'en' ? 'ANALYZING' : '분석중'}
            </span>
          </div>
          <div className="text-xs text-luxury-bronze">
            {language === 'en' ? 'AI personality analysis in progress...' : 'AI 성향 분석 진행 중...'}
          </div>
          <div className="w-full bg-luxury-cream rounded-full h-1 mt-2">
            <div className="bg-luxury-accent h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}