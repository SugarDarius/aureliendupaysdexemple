import Image from 'next/image'

import { BentoGrid } from '@/components/grids/bento-grid'
import { BentoCard } from '@/components/grids/bento-card'

export default function HomePage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <BentoGrid>
        <BentoCard className='col-span-1'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-2 p-4'>
            <Image
              src='/aureliendupaysdexemple-logo.png'
              width={200}
              height={200}
              alt='logo'
            />
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  )
}
