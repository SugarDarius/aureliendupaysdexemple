'use client'

import { ParticlesPage } from '@/components/particles/particles-page'

export function NotFoundPageContent() {
  return (
    <ParticlesPage title='404'>
      <p className='text-xl font-bold tracking-tight text-muted-foreground'>
        The page you are looking for does not exist.
      </p>
    </ParticlesPage>
  )
}
