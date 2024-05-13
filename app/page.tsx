import { generateGitHubRandomContributionsColors } from '@/lib/github-widget'

import { PageContent } from '@/components/content/page-content'
import { BentoGrid } from '@/components/grids/bento-grid'

import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'
import { TechStackBentoItem } from '@/components/bento/tech-stack-bento-item'

export default function HomePage() {
  const contributionsColors = generateGitHubRandomContributionsColors()
  return (
    <PageContent className='gap-0'>
      <BentoGrid>
        <HeroBentoItem />
        <GitHubBentoItem contributionsColors={contributionsColors} />
        <TwitterBentoItem />
        <LinkedInBentoItem />
        <TechStackBentoItem />
      </BentoGrid>
    </PageContent>
  )
}
