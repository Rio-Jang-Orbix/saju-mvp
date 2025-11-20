import crypto from 'crypto'

export type ABTestGroup = 'A' | 'B'

export interface ABTestConfig {
  ratio: number // 0.0 = all A, 1.0 = all B
}

/**
 * Determines A/B test group based on user ID hash
 * Group A: Email collection (free)
 * Group B: Stripe payment (₩2,900)
 */
export function getABTestGroup(userId: string, config?: ABTestConfig): ABTestGroup {
  const ratio = config?.ratio ?? parseFloat(process.env.AB_TEST_RATIO || '0.5')

  // Create consistent hash from user ID
  const hash = crypto.createHash('md5').update(userId).digest('hex')
  const hashValue = parseInt(hash.substring(0, 8), 16)
  const normalizedValue = hashValue / 0xffffffff

  return normalizedValue < ratio ? 'B' : 'A'
}

/**
 * Track A/B test assignment
 */
export async function trackABTestAssignment(
  userId: string,
  group: ABTestGroup,
  context: string
) {
  try {
    // For MVP phase, use mock tracking instead of Supabase
    console.log('A/B Test Assignment:', {
      userId,
      group,
      context,
      test_name: 'paywall_strategy',
      timestamp: new Date().toISOString()
    })

    // Store in localStorage for development
    if (typeof window !== 'undefined') {
      const abTestData = JSON.parse(localStorage.getItem('ab_test_data') || '[]')
      abTestData.push({
        userId,
        group,
        context,
        test_name: 'paywall_strategy',
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('ab_test_data', JSON.stringify(abTestData))
    }
  } catch (error) {
    console.error('Failed to track A/B test assignment:', error)
  }
}

/**
 * Email collection for Group A
 */
export async function handleEmailCollection(
  email: string,
  datePlanId: string,
  userId?: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: '올바른 이메일 주소를 입력해주세요.'
      }
    }

    // For MVP phase, use mock email collection
    console.log('Email Collection:', {
      email,
      datePlanId,
      userId,
      timestamp: new Date().toISOString(),
      ab_group: 'A'
    })

    // Store in localStorage for development
    if (typeof window !== 'undefined') {
      const emailData = JSON.parse(localStorage.getItem('email_collection_data') || '[]')
      emailData.push({
        email,
        datePlanId,
        userId,
        timestamp: new Date().toISOString(),
        ab_group: 'A'
      })
      localStorage.setItem('email_collection_data', JSON.stringify(emailData))
    }

    return {
      success: true,
      message: '이메일로 데이트 플랜을 보내드렸어요!'
    }

  } catch (error) {
    console.error('Email collection error:', error)
    return {
      success: false,
      message: '처리 중 오류가 발생했습니다.'
    }
  }
}

/**
 * Get A/B test statistics
 */
export async function getABTestStats() {
  try {
    // For MVP phase, use mock statistics from localStorage
    const stats = {
      groupA: {
        assigned: 0,
        converted: 0,
        conversionRate: 0
      },
      groupB: {
        assigned: 0,
        converted: 0,
        conversionRate: 0
      }
    }

    if (typeof window !== 'undefined') {
      // Get assignment data from localStorage
      const abTestData = JSON.parse(localStorage.getItem('ab_test_data') || '[]')
      const emailData = JSON.parse(localStorage.getItem('email_collection_data') || '[]')

      // Count assignments
      abTestData.forEach((event: any) => {
        if (event.group === 'A') stats.groupA.assigned++
        if (event.group === 'B') stats.groupB.assigned++
      })

      // Count conversions (email collections for Group A)
      emailData.forEach(() => {
        stats.groupA.converted++
      })

      // Calculate conversion rates
      stats.groupA.conversionRate = stats.groupA.assigned > 0
        ? stats.groupA.converted / stats.groupA.assigned
        : 0
      stats.groupB.conversionRate = stats.groupB.assigned > 0
        ? stats.groupB.converted / stats.groupB.assigned
        : 0
    }

    return stats

  } catch (error) {
    console.error('Failed to get A/B test stats:', error)
    return null
  }
}