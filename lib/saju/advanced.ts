/**
 * 고급 사주 이론 통합
 */

import type { SajuResult } from './calculator'
import { calculateSibiUnseong, type SibiUnseongResult } from './sibiunseong'
import { calculateSinsal, type SinsalResult } from './sinsal'
import { calculateTongByeon, type TongByeonResult } from './tongbyeon'

export interface AdvancedSajuAnalysis {
  sibiunseong: SibiUnseongResult
  sinsal: SinsalResult
  tongbyeon: TongByeonResult
}

/**
 * 사주의 고급 이론 분석 수행
 */
export function analyzeAdvancedSaju(saju: SajuResult): AdvancedSajuAnalysis {
  // 십이운성 계산
  const sibiunseong = calculateSibiUnseong(
    saju.day.stem,
    saju.year.branch,
    saju.month.branch,
    saju.day.branch,
    saju.hour.branch
  )

  // 신살 계산
  const sinsal = calculateSinsal(
    saju.year.stem,
    saju.year.branch,
    saju.month.branch,
    saju.day.stem,
    saju.day.branch,
    saju.hour.branch
  )

  // 통변성 계산
  const tongbyeon = calculateTongByeon(
    saju.year.stem,
    saju.year.branch,
    saju.month.stem,
    saju.month.branch,
    saju.day.stem,
    saju.day.branch,
    saju.hour.stem,
    saju.hour.branch
  )

  return {
    sibiunseong,
    sinsal,
    tongbyeon,
  }
}

export * from './sibiunseong'
export * from './sinsal'
export * from './tongbyeon'
