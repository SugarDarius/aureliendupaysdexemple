import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { BentoCard } from '@/components/grids/bento-card'

type SocialBentoItemProps = {
  href: string
  name: string
  accountName: string
  icon: React.ReactNode
  gradientClassName?: string
}

export function SocialBentoItem({
  href,
  name,
  accountName,
  icon,
}: SocialBentoItemProps) {
  return (
    <BentoCard className='col-span-1 row-span-1'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <div className=' lex aspect-square flex-col'>
          <div className={'flex size-full flex-col justify-between p-4'}>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='text-xl font-extrabold tracking-tighter'>
                {name}
              </h1>
              {icon}
            </div>
            <div className='flex flex-col'>
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
