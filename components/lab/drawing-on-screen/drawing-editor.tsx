'use client'

import { forwardRef, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import { clsx } from 'clsx'
import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'motion/react'
import { TrashIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { TimerIcon } from '@/components/icons/timer-icon'
import { Button } from '@/components/ui/button'

import {
  type DrawingCanvasRef,
  DrawingCanvas,
} from '@/components/lab/drawing-canvas/drawing-canvas'

type ControlButtonProps = {
  className?: string
  active?: boolean
  'data-state'?: boolean
  onClick: () => void
  children: React.ReactNode
}

const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(
  ({ className, active = false, onClick, children, ...rest }, ref) => (
    <Button
      ref={ref}
      size='icon'
      className={cn(
        'size-auto w-max rounded-full border border-neutral-200 bg-neutral-50 p-1.5 text-neutral-900 transition-colors ease-linear',
        'hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-200 dark:hover:bg-neutral-50 dark:hover:text-neutral-900',
        'data-[active=true]:border-neutral-700 data-[active=true]:bg-neutral-800 data-[active=true]:text-neutral-100',
        'dark:data-[active=true]:border-neutral-200 dark:data-[active=true]:bg-neutral-50 dark:data-[active=true]:text-neutral-900',
        className
      )}
      onClick={onClick}
      data-active={active}
      {...rest}
    >
      {children}
    </Button>
  )
)
ControlButton.displayName = 'ControlButton'

const ColorButton = ({
  active,
  color,
  onClick,
}: {
  active?: boolean
  color: string
  onClick: (color: string) => void
}) => {
  const handleClick = useEvent((): void => {
    onClick(color)
  })

  return (
    <ControlButton className='p-0' active={active} onClick={handleClick}>
      <div
        className='size-[26px] rounded-full'
        style={{ backgroundColor: color }}
      />
    </ControlButton>
  )
}

const ActivatableButton = ({
  active,
  onClick,
  children,
  tooltipContent,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  tooltipContent: React.ReactNode
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <ControlButton active={active} onClick={onClick}>
        {children}
      </ControlButton>
    </TooltipTrigger>
    <TooltipContent className='flex flex-row items-center gap-1' align='end'>
      {tooltipContent}
    </TooltipContent>
  </Tooltip>
)

const DrawButton = ({
  active,
  onClick,
}: {
  active: boolean
  onClick: () => void
}) => (
  <ActivatableButton
    active={active}
    onClick={onClick}
    tooltipContent={
      <>
        <span>{`${active ? 'Lock' : 'Unlock'} drawing mode`}</span>
        <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground'>
          SHIFT + D
        </span>
      </>
    }
  >
    <PencilIcon className='size-4 fill-none stroke-[1.5px]' />
  </ActivatableButton>
)

const DisappearingButton = ({
  active,
  onClick,
}: {
  active: boolean
  onClick: () => void
}) => (
  <ActivatableButton
    active={active}
    onClick={onClick}
    tooltipContent={
      <span>{`${active ? 'Disable' : 'Enabled'} path disappearing timer`}</span>
    }
  >
    <TimerIcon className='size-4 stroke-[1.5px]' />
  </ActivatableButton>
)

const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <ControlButton onClick={onClick}>
        <TrashIcon className='size-4 stroke-[1.5px]' />
      </ControlButton>
    </TooltipTrigger>
    <TooltipContent className='flex flex-row items-center gap-1' align='end'>
      <span>Clear canvas</span>
    </TooltipContent>
  </Tooltip>
)

const PencilCursor = ({
  x,
  y,
  color,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  color: string
}) => (
  <motion.div
    className='pointer-events-none absolute left-0 top-0'
    style={{ x, y }}
  >
    <PencilIcon
      className='size-5 rotate-90 stroke-neutral-800 dark:stroke-neutral-50'
      style={{ fill: color }}
    />
  </motion.div>
)

export function DrawingEditor({ className }: { className?: string }) {
  const canvasRef = useRef<DrawingCanvasRef>(null)

  const [isLocked, setIsLocked] = useState<boolean>(true)
  const [isPathDisappearingTimerActive, setIsPathDisappearingTimerActive] =
    useState<boolean>(true)
  const [isHoveringControls, setIsHoveringControls] = useState<boolean>(false)
  const [isCursorInside, setIsCursorInside] = useState<boolean>(false)

  const [strokeWidth] = useState<number>(10)
  const [strokeColor, setStrokeColor] = useState<string>('#48AEFF')

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseEnter = useEvent((): void => {
    setIsCursorInside(true)
  })
  const handleMouseLeave = useEvent((): void => {
    setIsCursorInside(false)
  })

  const handleControlsMouseEnter = useEvent((): void => {
    setIsHoveringControls(true)
  })

  const handleControlsMouseLeave = useEvent((): void => {
    setIsHoveringControls(false)
  })

  const handleColorButtonClick = useEvent((color): void => {
    setStrokeColor(color)
  })

  const handleDrawButtonClick = useEvent((): void => {
    setIsLocked(!isLocked)
  })

  const handleDisappearingButton = useEvent((): void => {
    setIsPathDisappearingTimerActive(!isPathDisappearingTimerActive)
  })

  const handleClearButton = useEvent((): void => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  })

  const handleMouseMove = useEvent(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      x.set(e.clientX + window.scrollX)
      y.set(e.clientY + window.scrollY)
    }
  )

  useHotkeys('shift+d', (): void => {
    setIsLocked(!isLocked)
  })

  const showCursor = !isLocked && !isHoveringControls && isCursorInside

  return (
    <div className={cn('relative flex size-full flex-col', className)}>
      <div
        className={cn(
          'relative flex size-full flex-col',
          clsx({
            'cursor-none!': !isLocked,
          })
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className='relative flex size-full flex-col'>
          <DrawingCanvas
            ref={canvasRef}
            backgroundColor='transparent'
            className='absolute left-0 top-0'
            isLocked={isLocked}
            width='100%'
            height='100%'
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            pathDisappearingTimeoutMs={
              isPathDisappearingTimerActive ? 5000 : null
            }
          />
          <AnimatePresence>
            {showCursor ? (
              <PencilCursor x={x} y={y} color={strokeColor} />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <div className='absolute bottom-0 right-4 top-0 z-10 my-auto flex flex-col items-center justify-center'>
        <div
          className='flex flex-col items-center justify-center gap-1.5 rounded-full border bg-background p-2'
          onMouseEnter={handleControlsMouseEnter}
          onMouseLeave={handleControlsMouseLeave}
        >
          <DrawButton active={!isLocked} onClick={handleDrawButtonClick} />
          <ColorButton
            active={strokeColor === '#48AEFF'}
            color='#48AEFF'
            onClick={handleColorButtonClick}
          />
          <ColorButton
            active={strokeColor === '#FF676D'}
            color='#FF676D'
            onClick={handleColorButtonClick}
          />
          <ColorButton
            active={strokeColor === '#FFA700'}
            color='#FFA700'
            onClick={handleColorButtonClick}
          />

          <DisappearingButton
            active={isPathDisappearingTimerActive}
            onClick={handleDisappearingButton}
          />
          <ClearButton onClick={handleClearButton} />
        </div>
      </div>
    </div>
  )
}
