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
    <BentoCard className='h-full'>
      <Link href={href} className='h-full w-full' aria-label={title}>
        <div className='relative flex h-full w-full flex-col'>
          <div className='flex h-full flex-col justify-between p-4 max-sm:gap-3'>
            <div className='flex w-full flex-none flex-row items-start justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-lg'>
                  {title}
                </h1>
                <p className='text-sm text-muted-foreground'>{description}</p>
              </div>
              <ArrowUpRightIcon className='size-6 max-sm:size-4' />
            </div>
            <div className='flex w-full flex-auto flex-col'>{children}</div>
          </div>
        </div>
      </Link>
    </BentoCard>
  )
}
