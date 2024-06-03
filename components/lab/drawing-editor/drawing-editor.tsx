'use client'

import { useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import { clsx } from 'clsx'
import {
  type MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
import { TrashIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { Button } from '@/components/ui/button'

import {
  type DrawingCanvasRef,
  DrawingCanvas,
} from '@/components/lab/drawing-editor/drawing-canvas'

const ColorButton = ({
  active = false,
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
    <Button
      size='icon'
      variant='secondary'
      className='size-auto rounded-full p-1.5 data-[active=true]:bg-muted-foreground'
      onClick={handleClick}
      data-active={active}
    >
      <div className='size-4 rounded-full' style={{ backgroundColor: color }} />
    </Button>
  )
}

const DrawButton = ({
  active = false,
  onClick,
}: {
  active?: boolean
  onClick: () => void
}) => (
  <Button
    size='icon'
    variant='secondary'
    className='size-auto rounded-full p-1.5 data-[active=true]:bg-muted-foreground data-[active=true]:text-background'
    data-active={active}
    onClick={onClick}
  >
    <PencilIcon className='size-4 stroke-[1.5px]' />
  </Button>
)

const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size='icon'
    variant='secondary'
    className='size-auto rounded-full p-1.5'
    onClick={onClick}
  >
    <TrashIcon className='size-4 stroke-[1.5px]' />
  </Button>
)

const PencilCursor = ({
  x,
  y,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
}) => (
  <motion.div
    className='pointer-events-none absolute left-0 top-0'
    style={{ x, y }}
  >
    <PencilIcon className='size-5 rotate-90' />
  </motion.div>
)

export function DrawingEditor({ className }: { className?: string }) {
  const canvasRef = useRef<DrawingCanvasRef>(null)

  const [isLocked, setIsLocked] = useState<boolean>(true)
  const [isHoveringControls, setIsHoveringControls] = useState<boolean>(false)

  const [strokeWidth] = useState<number>(10)
  const [strokeColor, setStrokeColor] = useState<string>('#FF676D')

  const x = useMotionValue(0)
  const y = useMotionValue(0)

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

  const showCursor = !isLocked && !isHoveringControls

  return (
    <div className={cn('relative flex size-full flex-col', className)}>
      <div
        className={cn(
          'relative flex size-full flex-col',
          clsx({
            '!cursor-none': !isLocked,
          })
        )}
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
          />
          <AnimatePresence>
            {showCursor ? <PencilCursor x={x} y={y} /> : null}
          </AnimatePresence>
        </div>
      </div>
      <div className='absolute bottom-0 right-4 top-0 z-10 my-auto flex flex-col items-center justify-center'>
        <div
          className='flex flex-col gap-1.5 rounded-full border bg-background p-2'
          onMouseEnter={handleControlsMouseEnter}
          onMouseLeave={handleControlsMouseLeave}
        >
          <DrawButton active={!isLocked} onClick={handleDrawButtonClick} />
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
          <ColorButton
            active={strokeColor === '#48AEFF'}
            color='#48AEFF'
            onClick={handleColorButtonClick}
          />
          <ClearButton onClick={handleClearButton} />
        </div>
      </div>
    </div>
  )
}
