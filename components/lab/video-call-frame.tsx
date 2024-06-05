import Image from 'next/image'
import {
  Cog6ToothIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { ImagePlaceholder } from '@/components/ui-helpers/image-placeholder'

import { PresentationIcon } from '@/components/icons/presentation-icon'

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

export const ControlButton = ({
  className,
  active = false,
  children,
  onClick,
}: {
  className?: string
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) => (
  <Button
    className={cn(
      'size-[36px] border border-neutral-200 bg-neutral-50 p-0 text-neutral-900 transition-colors ease-linear',
      'hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-900',
      'data-[active=true]:border-neutral-700 data-[active=true]:bg-neutral-800 data-[active=true]:text-neutral-100',
      'dark:data-[active=true]:border-neutral-200 dark:data-[active=true]:bg-neutral-50 dark:data-[active=true]:text-neutral-900',
      className
    )}
    data-active={active}
    onClick={onClick}
  >
    {children}
  </Button>
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
        'relative flex h-full max-h-full w-full flex-col gap-4 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 p-4',
        className
      )}
    >
      <div className='relative flex w-full flex-auto flex-row gap-4'>
        <div className='relative flex h-full flex-auto flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-800/20'>
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
        <div className='flex w-full flex-row items-center justify-center gap-2'>
          <ControlButton>
            <MicrophoneIcon className='size-5' />
          </ControlButton>
          <ControlButton>
            <VideoCameraIcon className='size-5' />
          </ControlButton>
          <ControlButton active>
            <PresentationIcon className='size-5 stroke-[1.5px]' />
          </ControlButton>
          <ControlButton>
            <FaceSmileIcon className='size-5' />
          </ControlButton>
          <ControlButton>
            <Cog6ToothIcon className='size-5' />
          </ControlButton>
          <Button variant='destructive'>Leave</Button>
          {children}
        </div>
      </div>
    </div>
  )
}
