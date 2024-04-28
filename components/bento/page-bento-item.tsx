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
    <BentoCard className='col-span-2 row-span-1 max-sm:min-h-[180px]'>
      <Link href={href} className='h-full w-full'>
        <div className='relative flex h-full w-full flex-col overflow-hidden'>
          <div
            /* eslint-disable-next-line prettier/prettier */
            className='bg-dot-black/[0.2] dark:bg-dot-white/[0.2] absolute bottom-0 left-0 right-0 top-0 -z-10 m-auto h-[86%] w-[86%]'
          >
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
          </div>
          <div className='flex h-full flex-col justify-between p-4'>
            <div className='flex w-full flex-none flex-row items-center justify-between'>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-lg'>
                  {title}
                </h1>
                <p className='text-muted-foreground'>{description}</p>
              </div>
              <ArrowUpRightIcon className='size-6' />
            </div>
            <div className='flex-ol flex w-full flex-auto'>{children}</div>
          </div>
        </div>
      </Link>
    </BentoCard>
  )
}
