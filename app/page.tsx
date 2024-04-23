import { BentoGrid } from '@/components/grids/bento-grid'

import { GitHubBentoItem } from '@/components/bento/github-bento-item'
import { HeroBentoItem } from '@/components/bento/hero-bento-item'

export default function HomePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <BentoGrid>
        <GitHubBentoItem />
        <HeroBentoItem />
      </BentoGrid>
    </div>
  )
}
