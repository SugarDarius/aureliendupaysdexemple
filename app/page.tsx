import { generateGitHubRandomContributionsColors } from '@/lib/github-widget'

import { BentoGrid } from '@/components/grids/bento-grid'

import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'
import { TechStackBentoItem } from '@/components/bento/tech-stack-bento-item'

export default function HomePage() {
  const contributionsColors = generateGitHubRandomContributionsColors()
  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col justify-center gap-10 px-12 pb-24 pt-12 max-sm:px-4 min-[1025px]:px-0'>
        <BentoGrid>
          <HeroBentoItem />
          <GitHubBentoItem contributionsColors={contributionsColors} />
          <TwitterBentoItem />
          <LinkedInBentoItem />
          <TechStackBentoItem />
        </BentoGrid>
      </div>
    </div>
  )
}
