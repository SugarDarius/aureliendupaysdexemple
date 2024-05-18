import Image from 'next/image'
import { PageBentoItem } from '@/components/bento/page-bento-item'

export function CraftBentoItem() {
  return (
    <PageBentoItem
      title='Craft'
      description='Check my personal work I craft'
      href='/craft'
    >
      <div className='flex h-full w-full flex-col items-center justify-end'>
        <div className='relative flex size-4/5 flex-col'>
          <Image
            src='/medias/images/craft-preview@4.webp'
            fill
            alt='craft preview'
            style={{ objectFit: 'contain' }}
            sizes='1024px'
            priority
          />
        </div>
      </div>
    </PageBentoItem>
  )
}
