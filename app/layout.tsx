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
          <main className='flex h-screen w-screen flex-none flex-col overflow-hidden'>
            <div className='flex min-h-full w-full flex-col overflow-auto'>
              <div className='flex w-full flex-1 flex-col'>{children}</div>
            </div>
          </main>
        </ProvidersTree>
      </body>
    </html>
  )
}
