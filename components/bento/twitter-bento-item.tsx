import { siteConfig } from '@/config/site-config'
import { BentoCard } from '@/components/grids/bento-card'

export function TwitterBentoItem() {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a
        href={siteConfig.socialLinks.twitter.url}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='flex aspect-square size-full flex-col bg-sky-400'>
          <div className='flex size-full flex-col justify-between p-4 text-background dark:text-foreground'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                Twitter (X)
              </h1>
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
