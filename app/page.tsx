import { CraftBentoItem } from '@/components/bento/craft-bento-item'
import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'
import { StandByBentoItem } from '@/components/bento/stand-by-bento-item'
import { TechStackBentoItem } from '@/components/bento/tech-stack-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { WorkBentoItem } from '@/components/bento/work-bento-item'
import { PageContent } from '@/components/content/page-content'
import { BentoGrid } from '@/components/grids/bento-grid'
import { SmartStack } from '@/components/lab/smart-stack'

export default async function HomePage() {
  return (
    <PageContent className='justify-center gap-0'>
      <div className='flex w-full items-end justify-between border-b border-stone-200/80 pb-5 dark:border-stone-800/80'>
        <p className='text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground'>Selected work · 2026</p>
        <p className='text-xs text-muted-foreground'>France / Remote</p>
      </div>
      <BentoGrid>
        <HeroBentoItem />
        <GitHubBentoItem />
        <TwitterBentoItem />
        <LinkedInBentoItem />
        <SmartStack
          className='col-span-2 row-span-1 min-h-full max-lg:min-h-55 max-md:min-h-45'
          roundedValuePx={16}
        >
          <StandByBentoItem />
          <TechStackBentoItem />
          <WorkBentoItem />
          <CraftBentoItem />
        </SmartStack>
      </BentoGrid>
    </PageContent>
  )
}
