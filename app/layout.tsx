import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site-config'
import { ProvidersTree } from '@/components/providers/providers-tree'
import { baseUrl } from '@/app/sitemap'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: siteConfig.title,
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
          'bg-background font-sans antialiased',
          GeistSans.variable
        )}
      >
        <ProvidersTree>
          <main className='flex h-screen w-screen flex-col overflow-hidden'>
            {children}
          </main>
        </ProvidersTree>
      </body>
    </html>
  )
}
