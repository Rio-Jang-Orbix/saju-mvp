export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://saju-bjv4gvv95-orbix-service-teams-projects.vercel.app'

  const images = [
    {
      loc: `${baseUrl}/og-image.png`,
      title: '사주팔자 분석 - AI 기반 운세 해석',
      caption: 'Open Graph 이미지 - 사주팔자 분석 서비스 메인 이미지',
    },
    {
      loc: `${baseUrl}/og-image.svg`,
      title: '사주팔자 분석 벡터 이미지',
      caption: 'SVG 포맷 Open Graph 이미지',
    },
    {
      loc: `${baseUrl}/favicon.svg`,
      title: '사주팔자 분석 파비콘',
      caption: '사이트 아이콘',
    },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images
  .map(
    (img) => `  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
