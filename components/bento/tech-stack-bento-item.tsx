import Image from 'next/image'
import { PageBentoItem } from '@/components/bento/page-bento-item'

export function TechStackBentoItem() {
  return (
    <PageBentoItem
      title='Tech Stack'
      description='Check my tech stack I use and play with'
      href='/tech-stack'
    >
      <div className='flex h-full w-full flex-col items-center justify-end'>
        <div className='relative flex size-4/5 flex-col'>
          <Image
            src='/medias/images/tech-stack-preview@4.webp'
            fill
            alt='tech stack preview'
            style={{ objectFit: 'contain' }}
            sizes='1024px'
            priority
          />
        </div>
      </div>
    </PageBentoItem>
  )
}
