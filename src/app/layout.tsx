import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { siteDetails } from '@/data/siteDetails';

import "./globals.css";
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  metadataBase: new URL(siteDetails.siteUrl),
  generator: 'Next.js',
  applicationName: siteDetails.siteName,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'environment variables',
    'secret sharing',
    'secure secrets',
    'developer tools',
    'Next.js',
    'Tailwind CSS',
    'Envolt',
  ],
  authors: [{ name: 'Envolt', url: siteDetails.siteUrl }],
  creator: 'Envolt',
  publisher: 'Envolt',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteDetails.siteUrl,
    languages: {
      'en-US': siteDetails.siteUrl,
    },
  },
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    type: 'website',
    locale: siteDetails.locale,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/twitter-image.jpg'],
    creator: '@envolt', // Replace if you have a real Twitter account
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}

        <main>
          {children}
          <Toaster />

        </main>

      </body>
    </html>
  );
}
