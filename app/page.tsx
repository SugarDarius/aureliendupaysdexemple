import { BentoGrid } from '@/components/grids/bento-grid'

import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'
import { TwitterBentoItem } from '@/components/bento/twitter-bento-item'
import { LinkedInBentoItem } from '@/components/bento/linkedin-bento-item'

export default function HomePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center overflow-auto p-6'>
      <BentoGrid>
        <HeroBentoItem />
        <GitHubBentoItem />
        <TwitterBentoItem />
        <LinkedInBentoItem />
      </BentoGrid>
    </div>
  )
}
