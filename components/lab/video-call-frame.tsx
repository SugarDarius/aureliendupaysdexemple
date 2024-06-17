import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  Cog6ToothIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
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
      'relative flex aspect-square rounded-lg bg-neutral-800',
      className
    )}
  >
    <div className='flex size-full flex-col items-center justify-center'>
      {children}
    </div>
  </div>
)

const StaticParticipants = () => (
  <>
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
        alt='memoji'
        priority
      />
    </Participant>
    <Participant>
      <Image
        src='/medias/images/memoji-male-zero.webp'
        width={80}
        height={80}
        alt='memoji'
        priority
      />
    </Participant>
    <Participant>
      <Image
        src='/medias/images/memoji-male-one.webp'
        width={80}
        height={80}
        alt='memoji'
        priority
      />
    </Participant>
  </>
)

export const ControlButton = ({
  className,
  active = false,
  disabled = false,
  tooltipContent,
  children,
  onClick,
}: {
  className?: string
  active?: boolean
  disabled?: boolean
  tooltipContent?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Tooltip open={!!tooltipContent && open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
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
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  )
}

export function VideoCallFrame({
  className,
  additionalControls,
  participants = <StaticParticipants />,
  children,
}: {
  className?: string
  participants?: React.ReactNode
  additionalControls?: React.ReactNode
  children?: React.ReactNode
}) {
  const router = useRouter()
  const handleLeaveButtonClick = useEvent((): void => {
    router.push('/')
  })
  return (
    <div
      className={cn(
        'relative flex h-full max-h-full w-full flex-col gap-4 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 p-4',
        className
      )}
    >
      <div className='relative flex w-full flex-auto flex-row gap-4'>
        <div className='relative flex h-full flex-auto flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-800/10'>
          <div className='flex aspect-video h-auto w-full flex-col items-center justify-center'>
            {children ? children : <ImagePlaceholder className='w-1/2' />}
          </div>
        </div>
        <div className='grid h-full flex-none grid-cols-1 grid-rows-4 justify-between gap-2'>
          {participants}
        </div>
      </div>
      <div className='flex w-full flex-none flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-center gap-2'>
          <ControlButton disabled>
            <MicrophoneIcon className='size-5' />
          </ControlButton>
          <ControlButton disabled>
            <VideoCameraIcon className='size-5' />
          </ControlButton>
          <ControlButton active tooltipContent={<>Someone is presenting 🚀</>}>
            <PresentationIcon className='size-5 stroke-[1.5px]' />
          </ControlButton>
          <ControlButton disabled>
            <FaceSmileIcon className='size-5' />
          </ControlButton>
          {additionalControls}
          <ControlButton disabled>
            <Cog6ToothIcon className='size-5' />
          </ControlButton>
          <Button variant='destructive' onClick={handleLeaveButtonClick}>
            Leave
          </Button>
        </div>
      </div>
    </div>
  )
}
