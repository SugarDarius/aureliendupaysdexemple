import Image from 'next/image'
import { PageBentoItem } from '@/components/bento/page-bento-item'

export function TechStackBentoItem() {
  return (
    <PageBentoItem
      title='Tech Stack'
      description='Check my tech stack I use everyday'
      href='/tech-stack'
    >
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='relative flex size-[80%] flex-col'>
          <Image
            src='/tech-stack-preview.png'
            fill
            alt='logo'
            priority
            style={{ objectFit: 'contain' }}
            sizes='110px'
          />
        </div>
      </div>
    </PageBentoItem>
  )
}
