'use client'

import { ParticlesPageContent } from '@/components/particles/particles-page-content'

export function NotFoundPageContent() {
  return (
    <ParticlesPageContent title='404'>
      <p className='text-xl font-bold tracking-tight text-muted-foreground'>
        The page you are looking for does not exist.
      </p>
    </ParticlesPageContent>
  )
}
