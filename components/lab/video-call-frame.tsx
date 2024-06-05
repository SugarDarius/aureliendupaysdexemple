import Image from 'next/image'

import { cn } from '@/lib/utils'
import { ImagePlaceholder } from '@/components/ui-helpers/image-placeholder'

const Participant = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => (
  <div
    className={cn(
      'relative flex size-[120px] rounded-lg bg-neutral-800',
      className
    )}
  >
    <div className='flex size-full flex-col items-center justify-center'>
      {children}
    </div>
  </div>
)

export function VideoCallFrame({
  className,
  shareScreenView,
  children,
}: {
  className?: string
  shareScreenView?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex h-full max-h-full w-full flex-col gap-6 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 p-4',
        className
      )}
    >
      <div className='relative flex w-full flex-auto flex-row gap-4'>
        <div className='relative flex h-full flex-auto flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-800'>
          <div className='flex aspect-video h-auto w-full flex-col items-center justify-center'>
            {shareScreenView ? (
              shareScreenView
            ) : (
              <ImagePlaceholder className='w-1/2' />
            )}
          </div>
        </div>
        <div className='flex h-full flex-none flex-col justify-between'>
          <Participant className='border-4 border-violet-700'>
            <Image
              src='/medias/images/aureliendupaysdexemple-logo.webp'
              width={80}
              height={80}
              alt='logo'
              priority
            />
          </Participant>
          <Participant>
            <Image
              src='/medias/images/memoji-female-zero.webp'
              width={80}
              height={80}
              alt='logo'
              priority
            />
          </Participant>
          <Participant>
            <Image
              src='/medias/images/memoji-male-zero.webp'
              width={80}
              height={80}
              alt='logo'
              priority
            />
          </Participant>
          <Participant>
            <Image
              src='/medias/images/memoji-male-one.webp'
              width={80}
              height={80}
              alt='logo'
              priority
            />
          </Participant>
        </div>
      </div>
      <div className='flex w-full flex-none flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-center gap-6'>
          {children}
        </div>
      </div>
    </div>
  )
}
