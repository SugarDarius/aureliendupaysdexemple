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
    <BentoCard className='col-span-1 row-span-1' variant='grid'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <div className='relative flex aspect-square flex-col'>
          <div className='flex size-full flex-col gap-1 p-4 max-sm:p-3'>
            <div className='flex flex-none flex-row items-center justify-between'>
              <h1 className='text-2xl font-semibold tracking-tighter max-sm:text-lg'>
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
                <p className='text-xs text-muted-foreground underline'>
                  Check my {name} profile
                </p>
                <ArrowTopRightOnSquareIcon className='inline-flex h-3.5 w-3.5' />
              </div>
            </div>
          </div>
        </div>
      </a>
    </BentoCard>
  )
}
