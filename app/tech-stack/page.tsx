import type { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
import { Hero } from '@/components/content/hero'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'Check my tech stack I use everyday',
}

export default function TechStackPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-5xl flex-col gap-6 px-12 py-12 max-sm:px-4 min-[1025px]:px-0'>
        <Hero
          title='Tech Stack'
          description='A look at the programming languages, libraries and dev tools I use and play with'
        />
        <Separator />
      </div>
    </div>
  )
}
