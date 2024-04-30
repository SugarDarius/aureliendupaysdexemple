import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import { BentoCard } from '@/components/grids/bento-card'

export function PageBentoItem({
  href,
  title,
  description,
  children,
}: {
  href: string
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <BentoCard
      className='col-span-2 row-span-1 max-sm:min-h-[180px]'
      variant='grid'
    >
      <Link href={href} className='h-full w-full'>
        <div className='relative flex h-full w-full flex-col'>
          <div className='nax-sm:gap-3 flex h-full flex-col justify-between p-4'>
            <div className='flex w-full flex-none flex-row items-start justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-lg'>
                  {title}
                </h1>
                <p className='text-sm text-muted-foreground'>{description}</p>
              </div>
              <ArrowUpRightIcon className='size-6 max-sm:size-4' />
            </div>
            <div className='flex-ol flex w-full flex-auto'>{children}</div>
          </div>
        </div>
      </Link>
    </BentoCard>
  )
}
