import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ボキまる先生 - 簿記3級を最短合格するための学習アプリ",
  description: "現役税理士が完全監修した、AI搭載の次世代型簿記3級学習アプリ「ボキまる先生」の紹介LP。スマホ1台で最短合格を目指せます。",
  metadataBase: new URL("https://bokimarusenseiboki3.com"),
  icons: {
    icon: [
      { url: "/splash.jpg", type: "image/jpeg" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" },
      { url: "/splash.jpg", type: "image/jpeg" },
    ],
    shortcut: ["/splash.jpg"],
  },
  openGraph: {
    title: "ボキまる先生 - 簿記3級を最短合格するための学習アプリ",
    description: "現役税理士が完全監修した、AI搭載の次世代型簿記3級学習アプリ「ボキまる先生」の紹介LP。スマホ1台で最短合格を目指せます。",
    url: "https://bokimarusenseiboki3.com/",
    siteName: "ボキまる先生",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://bokimarusenseiboki3.com/splash.jpg",
        width: 800,
        height: 1000,
        alt: "ボキまる先生 簿記3級アイコン",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ボキまる先生 - 簿記3級を最短合格するための学習アプリ",
    description: "現役税理士が完全監修した、AI搭載の次世代型簿記3級学習アプリ「ボキまる先生」。スマホ1台で最短合格を目指せます。",
    images: ["https://bokimarusenseiboki3.com/splash.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* スマホホーム画面用・ブラウザ用アイコン & OGPタグ */}
        <link rel="icon" href="/splash.jpg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png" />
        <meta property="og:image" content="https://bokimarusenseiboki3.com/splash.jpg" />
        <meta name="twitter:image" content="https://bokimarusenseiboki3.com/splash.jpg" />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-544Q8MPVY4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-544Q8MPVY4');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
