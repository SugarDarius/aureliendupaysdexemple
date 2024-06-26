import Image from 'next/image'
import { PageBentoItem } from '@/components/bento/page-bento-item'

export function WorkBentoItem() {
  return (
    <PageBentoItem
      title='Work'
      description='Check my work and contributions'
      href='/work'
    >
      <div className='flex h-full w-full flex-col items-center justify-end'>
        <div className='relative flex size-4/5 flex-col'>
          <Image
            src='/medias/images/work-preview@4.webp'
            fill
            alt='work preview'
            style={{ objectFit: 'contain' }}
            sizes='330px'
            priority
          />
        </div>
      </div>
    </PageBentoItem>
  )
}
