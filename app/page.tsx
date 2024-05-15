import { generateGitHubRandomContributionsColors } from '@/lib/github-widget'

import { PageContent } from '@/components/content/page-content'
import { BentoGrid } from '@/components/grids/bento-grid'

import { SmartStack } from '@/components/labs/smart-stack'

import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'
import { TechStackBentoItem } from '@/components/bento/tech-stack-bento-item'
import { WorkBentoItem } from '@/components/bento/work-bento-item'

export default function HomePage() {
  const contributionsColors = generateGitHubRandomContributionsColors()
  return (
    <PageContent className='justify-center gap-0'>
      <BentoGrid>
        <HeroBentoItem />
        <GitHubBentoItem contributionsColors={contributionsColors} />
        <TwitterBentoItem />
        <LinkedInBentoItem />
        <SmartStack className='col-span-2 row-span-1 min-h-full max-lg:min-h-[220px] max-md:min-h-[180px]'>
          <TechStackBentoItem />
          <WorkBentoItem />
        </SmartStack>
      </BentoGrid>
    </PageContent>
  )
}
