import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = '사주팔자 분석 - AI 기반 운세 해석'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #312e81 0%, #7e22ce 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: 100,
            fontSize: 100,
            opacity: 0.3,
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            top: 100,
            right: 150,
            fontSize: 80,
            opacity: 0.3,
          }}
        >
          🌙
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 150,
            fontSize: 90,
            opacity: 0.3,
          }}
        >
          ⭐
        </div>

        {/* 메인 콘텐츠 */}
        <div
          style={{
            fontSize: 180,
            marginBottom: 20,
          }}
        >
          🔮
        </div>
        <div
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #fef3c7, #fde68a, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          사주팔자 분석
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#fde68a',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          AI가 해석하는 나의 운명
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#fcd34d',
            display: 'flex',
            gap: 20,
          }}
        >
          <span>무료 사주 보기</span>
          <span>·</span>
          <span>오행 분석</span>
          <span>·</span>
          <span>AI 운세</span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
