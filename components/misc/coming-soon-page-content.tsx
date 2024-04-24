'use client'

import { ParticlesPageContent } from '@/components/particles/particles-page-content'

export function ComingSoonPageContent() {
  return (
    <ParticlesPageContent title='Coming soon'>
      <p className='text-xl font-bold tracking-tight text-muted-foreground'>
        This page will be live soon.
      </p>
    </ParticlesPageContent>
  )
}
