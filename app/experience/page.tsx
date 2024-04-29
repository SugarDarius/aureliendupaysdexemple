import type { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { Hero } from '@/components/content/hero'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Check my work experience',
}

export default function ExperiencePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 pb-24 pt-12 max-sm:px-4 min-[1025px]:px-0'>
        <Hero
          title='Experience'
          description='A look at my professional work experience.'
        />
        <Separator />
      </div>
    </div>
  )
}
