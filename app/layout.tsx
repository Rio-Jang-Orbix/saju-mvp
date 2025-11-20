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
  title: "사주팔자 분석 - AI 기반 운세 해석",
  description: "AI가 해석하는 나의 사주팔자. 생년월일시를 입력하고 천간지지 분석과 운세를 확인하세요.",
  keywords: "사주, 사주팔자, 운세, 천간지지, AI 사주, 사주 분석, 사주 해석",
  authors: [{ name: "Saju MVP Team" }],
  creator: "Saju MVP",
  publisher: "Saju MVP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "사주팔자 분석 - AI 기반 운세 해석",
    description: "AI가 해석하는 나의 사주팔자. 생년월일시를 입력하고 천간지지 분석과 운세를 확인하세요.",
    url: '/',
    siteName: 'Saju MVP',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
              "@type": "WebApplication",
              "name": "사주팔자 분석",
              "description": "AI가 해석하는 나의 사주팔자. 생년월일시를 입력하고 천간지지 분석과 운세를 확인하세요.",
              "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "creator": {
                "@type": "Organization",
                "name": "Saju MVP Team"
              }
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
