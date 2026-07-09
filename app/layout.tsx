import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import { ViewTransition } from 'react'

import { MagnifyingGlass } from '@/components/lab/magnifying-glass/magnifying-glass'
import { NavigationDock } from '@/components/navigation/navigation-dock'
import { ProvidersTree } from '@/components/providers/providers-tree'
import { TailwindIndicator } from '@/components/ui-helpers/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/env'
import { baseUrl, siteConfig } from '@/config/site-config'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    description: siteConfig.description,
    locale: 'en_US',
    siteName: siteConfig.title,
    title: siteConfig.title,
    type: 'website',
    url: baseUrl,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.socialLinks.twitter.name,
    description: siteConfig.description,
    title: siteConfig.title,
  },
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { color: 'white', media: '(prefers-color-scheme: light)' },
    { color: 'black', media: '(prefers-color-scheme: dark)' },
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
          'font-sans antialiased',
        )}
      >
        <ProvidersTree>
          <ViewTransition
            default={{
              default: 'none',
              fade: 'fade',
            }}
          >
            <main className='flex h-dvh w-screen flex-col overflow-hidden'>
              <div className='flex h-full w-full flex-col overflow-y-auto'>
                <div className='flex w-full flex-1 flex-col'>{children}</div>
              </div>
              <NavigationDock />
            </main>
          </ViewTransition>
          <Toaster />
          <MagnifyingGlass />
          <TailwindIndicator />
        </ProvidersTree>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
