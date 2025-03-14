import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useMemo, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  Cog6ToothIcon,
  FaceSmileIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'

import { type Variants, motion, AnimatePresence } from 'motion/react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { VFXBorderBeam } from '@/components/ui-vfx/vfx-border-beam'
import { ImagePlaceholder } from '@/components/ui-helpers/image-placeholder'

import { PresentationIcon } from '@/components/icons/presentation-icon'

const participantGradients: Record<string, string> = {
  '#fb7185': 'bg-gradient-to-r from-rose-400 to-red-500',
  '#a855f7': 'bg-gradient-to-r from-purple-500 to-purple-900',
  '#bfdbfe': 'bg-gradient-to-r from-blue-200 to-cyan-200',
  '#a3e635': 'bg-gradient-to-r from-lime-400 to-lime-500',
  '#fde68a': 'bg-gradient-to-r from-amber-200 to-yellow-400',
  '#ef4444': 'bg-gradient-to-r from-red-500 to-orange-500',
  '#ec4899': 'bg-gradient-to-r from-pink-500 to-rose-500',
  '#6366f1': 'bg-gradient-to-r from-indigo-500 to-blue-500',
  '#fb923c': 'bg-gradient-to-r from-orange-400 to-red-500',
  '#f59e0b': 'bg-gradient-to-r from-amber-500 to-amber-700',
}

const variants: Variants = {
  enter: {
    y: 40,
    scale: 0.85,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    y: 40,
    scale: 0.85,
    opacity: 0,
  },
}

export type Participant = {
  id: string
  isActive: boolean
  isCurrentUser: boolean
  avatarSrc: string
  strokeColor?: string
  username: string
}

type ParticipantItemProps = Participant & {
  className?: string
}

const ParticipantItem = ({
  id,
  isActive,
  isCurrentUser,
  avatarSrc,
  className,
  strokeColor = 'unknown',
  username,
}: ParticipantItemProps) => {
  const gradient = useMemo(() => {
    if (isCurrentUser) {
      return 'bg-gradient-to-r from-indigo-400 to-cyan-400'
    }

    return (
      participantGradients[strokeColor] ??
      'bg-gradient-to-r from-teal-200 to-teal-500'
    )
  }, [isCurrentUser, strokeColor])
  return (
    <motion.div
      className={cn(
        'relative flex aspect-square rounded-lg bg-neutral-800/90 p-2',
        className
      )}
      variants={variants}
      initial='enter'
      animate='visible'
      exit='exit'
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.15,
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex size-[86px] flex-col items-center justify-center overflow-hidden rounded-full',
              gradient
            )}
          >
            <Image
              src={avatarSrc}
              width={80}
              height={80}
              alt={'participant avatar ' + id}
              priority
              style={{ width: 80, height: 80 }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>{username}</TooltipContent>
      </Tooltip>
      {isActive && !isCurrentUser ? (
        <VFXBorderBeam className='vfx-border-beam-duration-[6s] vfx-border-beam-color-from-cyan-300 vfx-border-beam-color-to-sky-600 vfx-border-beam-width-[3px] vfx-border-beam-size-[80px]' />
      ) : null}
    </motion.div>
  )
}

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
            'border-neutral-700 hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-900',
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
  participants = [],
  children,
}: {
  className?: string
  participants?: Participant[]
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
        <div className='relative flex h-full flex-none flex-col overflow-y-auto'>
          <div className='grid w-max grid-flow-row auto-rows-fr gap-2'>
            <AnimatePresence initial={false}>
              {participants.map((participant) => (
                <ParticipantItem key={participant.id} {...participant} />
              ))}
            </AnimatePresence>
          </div>
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
