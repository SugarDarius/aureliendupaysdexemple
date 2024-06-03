'use client'

import { useRef, useState } from 'react'
import {
  ReactSketchCanvas as SketchCanvas,
  type ReactSketchCanvasRef as SketchCanvasRef,
} from 'react-sketch-canvas'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import clsx from 'clsx'

import { cn } from '@/lib/utils'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { Button } from '@/components/ui/button'

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
}) => {
  return (
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
}

const initialStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 'none',
}

export function DrawingCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<SketchCanvasRef>(null)

  const [isLocked, setIsLocked] = useState<boolean>(true)

  const [strokeWidth] = useState<number>(10)
  const [strokeColor, setStrokeColor] = useState<string>('#FF676D')

  const handleColorButtonClick = useEvent((color): void => {
    setStrokeColor(color)
  })

  const handleDrawButtonClick = useEvent((): void => {
    setIsLocked(!isLocked)
  })

  useHotkeys('shift+d', (): void => {
    setIsLocked(!isLocked)
  })

  return (
    <div className={cn('relative flex size-full flex-col', className)}>
      <div
        className={cn(
          'relative flex size-full flex-col',
          clsx({
            '!pointer-events-none': isLocked,
            'pointer-events-auto': !isLocked,
          })
        )}
      >
        <SketchCanvas
          ref={canvasRef}
          canvasColor='transparent'
          style={initialStyle}
          className='absolute left-0 top-0'
          width='100%'
          height='100%'
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
        />
      </div>
      <div className='absolute bottom-0 right-4 top-0 my-auto flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-1.5 rounded-full border p-2'>
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
        </div>
      </div>
    </div>
  )
}
