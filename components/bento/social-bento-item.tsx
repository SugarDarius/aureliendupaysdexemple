import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { BentoCard } from '@/components/grids/bento-card'

type SocialBentoItemProps = {
  href: string
  name: string
  accountName: string
  icon: React.ReactNode
  children?: React.ReactNode
}

export function SocialBentoItem({
  href,
  name,
  accountName,
  icon,
  children,
}: SocialBentoItemProps) {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <div className='relative flex aspect-square flex-col'>
          <div
            /* eslint-disable-next-line prettier/prettier */
            className='bg-dot-black/[0.2] dark:bg-dot-white/[0.2] absolute bottom-0 left-0 right-0 top-0 m-auto h-[86%] w-[86%]'
          >
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-stone-900'></div>
          </div>
          <div className='z-10 flex size-full flex-col gap-1 p-3'>
            <div className='flex flex-none flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                {name}
              </h1>
              {icon}
            </div>
            <div className='flex w-full flex-auto flex-col'>{children}</div>
            <div className='flex flex-none flex-col'>
              <h1 className='text-md font-bold tracking-tighter'>
                {accountName}
              </h1>
              <div className='flex flex-row items-center gap-1 max-sm:hidden'>
                <p className='text-xs underline'>Check my {name} profile</p>
                <ArrowTopRightOnSquareIcon className='inline-flex h-3.5 w-3.5' />
              </div>
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
