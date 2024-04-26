import type { Metadata } from 'next'

import {
  languagesTechStackItems,
  technologiesTechStackItems,
} from '@/lib/tech-stack'

import { Separator } from '@/components/ui/separator'
import { Hero } from '@/components/content/hero'
import { TechStackGrid } from '@/components/grids/tech-stack-grid'
import { TechStackCard } from '@/components/grids/tech-stack-card'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'Check my tech stack I use everyday',
}

export default function TechStackPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 pb-24 pt-12 max-sm:px-4 min-[1025px]:px-0'>
        <Hero
          title='Tech Stack'
          description='A look at the programming languages, technologies, libraries and dev tools I use and play with.'
        />
        <Separator />
        <TechStackGrid title='Technologies'>
          {technologiesTechStackItems.map(({ name, Icon, tag }) => (
            <TechStackCard key={name} name={name} tag={tag}>
              <Icon className='size-20' />
            </TechStackCard>
          ))}
        </TechStackGrid>
        <TechStackGrid title='Languages'>
          {languagesTechStackItems.map(({ name, Icon, tag }) => (
            <TechStackCard key={name} name={name} tag={tag}>
              <Icon className='size-20' />
            </TechStackCard>
          ))}
        </TechStackGrid>
      </div>
    </div>
  )
}
