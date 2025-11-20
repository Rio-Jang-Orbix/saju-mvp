import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "사주팔자 분석 - AI 기반 운세 해석 | 무료 사주 보기",
    template: "%s | 사주팔자 분석"
  },
  description: "🔮 AI가 해석하는 나의 사주팔자. 무료로 생년월일시를 입력하고 천간지지 분석, 오행 분석, 운세를 확인하세요. 정확한 사주 계산과 AI 기반 상세 해석을 제공합니다.",
  keywords: [
    "사주",
    "사주팔자",
    "운세",
    "천간지지",
    "AI 사주",
    "사주 분석",
    "사주 해석",
    "무료 사주",
    "오행 분석",
    "사주 보기",
    "온라인 사주",
    "사주 상담",
    "운명 분석",
    "팔자 풀이",
    "명리학",
    "음양오행",
    "십간십이지",
    "년월일시",
    "사주 계산",
    "AI 운세"
  ],
  authors: [{ name: "Saju MVP Team", url: "https://github.com/Rio-Jang-Orbix/saju-mvp" }],
  creator: "Saju MVP",
  publisher: "Saju MVP",
  applicationName: "사주팔자 분석",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://saju-bjv4gvv95-orbix-service-teams-projects.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "사주팔자 분석 - AI 기반 운세 해석",
    description: "🔮 AI가 해석하는 나의 사주팔자. 무료로 생년월일시를 입력하고 천간지지 분석, 오행 분석, 운세를 확인하세요.",
    url: '/',
    siteName: '사주팔자 분석',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '사주팔자 분석 - AI 기반 운세 해석',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '사주팔자 분석 - AI 기반 운세 해석',
    description: '🔮 무료로 AI가 분석하는 나의 사주팔자와 운세를 확인하세요.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 인증 시 추가
    // google: 'your-google-verification-code',
    // Naver 웹마스터 인증 시 추가
    // other: {
    //   'naver-site-verification': 'your-naver-verification-code',
    // },
  },
  category: '운세, 사주, 역학',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light" style={{ colorScheme: 'light' }}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/#webapp`,
                  "name": "사주팔자 분석",
                  "alternateName": "AI 사주 분석",
                  "description": "AI가 해석하는 나의 사주팔자. 생년월일시를 입력하고 천간지지 분석과 운세를 확인하세요.",
                  "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                  "applicationCategory": "LifestyleApplication",
                  "operatingSystem": "Web Browser",
                  "browserRequirements": "Requires JavaScript. Requires HTML5.",
                  "inLanguage": "ko-KR",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "KRW",
                    "availability": "https://schema.org/InStock",
                    "priceValidUntil": "2025-12-31"
                  },
                  "creator": {
                    "@type": "Organization",
                    "name": "Saju MVP Team",
                    "url": "https://github.com/Rio-Jang-Orbix/saju-mvp"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "150",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "featureList": [
                    "무료 사주팔자 계산",
                    "양력/음력 변환",
                    "천간지지 분석",
                    "오행 분석 및 시각화",
                    "AI 기반 운세 해석",
                    "결과 공유 기능"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/#website`,
                  "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                  "name": "사주팔자 분석",
                  "description": "AI가 해석하는 무료 사주팔자 분석 서비스",
                  "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/#organization`
                  },
                  "inLanguage": "ko-KR"
                },
                {
                  "@type": "Organization",
                  "@id": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/#organization`,
                  "name": "Saju MVP Team",
                  "url": "https://github.com/Rio-Jang-Orbix/saju-mvp",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/og-image.png`
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "사주팔자 분석은 무료인가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "네, 사주팔자 분석은 완전 무료입니다. 생년월일시만 입력하면 AI 기반의 상세한 사주 해석을 받으실 수 있습니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "음력 생일도 가능한가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "네, 양력과 음력 모두 지원합니다. 입력 폼에서 음력을 선택하시면 자동으로 양력으로 변환하여 정확한 사주를 계산합니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "AI는 어떻게 사주를 해석하나요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "OpenAI GPT-4를 활용하여 천간지지와 오행 분석을 바탕으로 성격, 적성, 대인관계, 재물운, 건강운 등을 종합적으로 해석합니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "사주 결과를 공유할 수 있나요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "네, 분석 결과 페이지에서 클립보드 복사 또는 네이티브 공유 기능을 통해 손쉽게 결과를 공유하실 수 있습니다."
                      }
                    }
                  ]
                },
                {
                  "@type": "HowTo",
                  "name": "사주팔자 분석 방법",
                  "description": "생년월일시를 입력하여 무료로 사주팔자를 분석하는 방법",
                  "step": [
                    {
                      "@type": "HowToStep",
                      "position": 1,
                      "name": "생년월일 입력",
                      "text": "메인 페이지에서 생년, 월, 일을 입력합니다. 양력 또는 음력을 선택할 수 있습니다."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 2,
                      "name": "출생 시간 입력",
                      "text": "태어난 시각(시, 분)을 입력합니다. 정확한 시간을 모르는 경우 대략적인 시간을 입력해도 됩니다."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 3,
                      "name": "성별 선택",
                      "text": "성별을 선택합니다. 사주 해석에 영향을 줍니다."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 4,
                      "name": "분석 시작",
                      "text": "'운명 분석하기' 버튼을 클릭하면 사주팔자 계산과 AI 해석이 시작됩니다."
                    },
                    {
                      "@type": "HowToStep",
                      "position": 5,
                      "name": "결과 확인",
                      "text": "년월일시주, 오행 분석, AI 운세 해석을 확인하고 필요시 공유합니다."
                    }
                  ],
                  "totalTime": "PT2M"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${notoSerifKR.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
