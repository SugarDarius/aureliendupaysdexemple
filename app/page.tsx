import { BentoGrid } from '@/components/grids/bento-grid'
import { BentoCard } from '@/components/grids/bento-card'

export default function HomePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <BentoGrid>
        <BentoCard className='col-span-2' />
      </BentoGrid>
    </div>
  )
}
