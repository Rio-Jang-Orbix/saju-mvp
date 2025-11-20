import { SajuResult } from './calculator'

/**
 * 사주 결과를 텍스트로 변환
 */
export function sajuToText(saju: SajuResult): string {
  const { year, month, day, hour, birthInfo } = saju

  return `
🔮 나의 사주팔자 분석 결과

생년월일시: ${birthInfo.year}.${birthInfo.month}.${birthInfo.day} ${birthInfo.hour}:${birthInfo.minute} (${birthInfo.isLunar ? '음력' : '양력'})

📅 년주: ${year.stem}${year.branch} (${year.stemKr}${year.branchKr})
🌙 월주: ${month.stem}${month.branch} (${month.stemKr}${month.branchKr})
☀️ 일주: ${day.stem}${day.branch} (${day.stemKr}${day.branchKr})
🕐 시주: ${hour.stem}${hour.branch} (${hour.stemKr}${hour.branchKr})

오행: 木${saju.elements['木']} 火${saju.elements['火']} 土${saju.elements['土']} 金${saju.elements['金']} 水${saju.elements['水']}

더 상세한 해석은 사주 분석 앱에서 확인하세요!
`.trim()
}

/**
 * 클립보드에 복사
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 폴백: 임시 textarea 생성
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    }
  } catch (error) {
    console.error('클립보드 복사 실패:', error)
    return false
  }
}

/**
 * 카카오톡 공유 (Web Share API 사용)
 */
export async function shareViaNative(saju: SajuResult): Promise<boolean> {
  const text = sajuToText(saju)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  if (navigator.share) {
    try {
      await navigator.share({
        title: '🔮 나의 사주팔자 분석 결과',
        text: text,
        url: url,
      })
      return true
    } catch (error) {
      console.error('공유 실패:', error)
      return false
    }
  } else {
    // Web Share API 미지원시 클립보드 복사
    return await copyToClipboard(text)
  }
}

/**
 * 이미지로 다운로드 (캡처)
 */
export async function downloadAsImage(elementId: string, filename: string = 'saju-result.png'): Promise<boolean> {
  try {
    // html2canvas 라이브러리가 필요 (추후 설치)
    // 지금은 기본 구조만 작성
    console.log('이미지 다운로드 기능은 추후 구현 예정')
    return false
  } catch (error) {
    console.error('이미지 다운로드 실패:', error)
    return false
  }
}
