import type { Metadata, Viewport } from 'next'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { env } from '@/config/env'
import { siteConfig } from '@/config/site-config'
import { baseUrl } from '@/app/sitemap'

import { Toaster } from '@/components/ui/sonner'
import { ProvidersTree } from '@/components/providers/providers-tree'
import { NavigationDock } from '@/components/navigation/navigation-dock'
import { TailwindIndicator } from '@/components/ui-helpers/tailwind-indicator'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.socialLinks.twitter.name,
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
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'font-sans antialiased'
        )}
      >
        <ProvidersTree>
          <main className='flex h-screen w-screen flex-none flex-col overflow-hidden'>
            <div className='flex h-full w-full flex-col overflow-y-auto'>
              <div className='flex w-full flex-1 flex-col'>{children}</div>
            </div>
            <NavigationDock />
          </main>
          <Toaster />
          <TailwindIndicator />
        </ProvidersTree>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
