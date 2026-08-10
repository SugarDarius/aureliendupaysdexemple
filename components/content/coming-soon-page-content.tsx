'use client'

import { ParticlesPageContent } from '@/components/particles/particles-page-content'

export function ComingSoonPageContent() {
  return (
    <ParticlesPageContent title='Coming soon'>
      <p className='text-muted-foreground text-xl font-bold tracking-tight max-sm:text-sm'>
        This page will be live soon.
      </p>
    </ParticlesPageContent>
  )
}
