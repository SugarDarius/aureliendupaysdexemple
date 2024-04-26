import type { Metadata, Viewport } from 'next'

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/react'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site-config'
import { baseUrl } from '@/app/sitemap'

import { Toaster } from '@/components/ui/sonner'
import { ProvidersTree } from '@/components/providers/providers-tree'
import { NavigationDock } from '@/components/navigation/navigation-dock'

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
    locale: 'en_EN',
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
          'bg-background font-sans antialiased'
        )}
      >
        <ProvidersTree>
          <main className='flex h-screen w-screen flex-none flex-col overflow-hidden'>
            <div className='flex min-h-full w-full flex-col overflow-auto'>
              <div className='flex w-full flex-1 flex-col'>{children}</div>
            </div>
            <NavigationDock />
          </main>
          <Toaster />
        </ProvidersTree>
        <Analytics />
      </body>
    </html>
  )
}
