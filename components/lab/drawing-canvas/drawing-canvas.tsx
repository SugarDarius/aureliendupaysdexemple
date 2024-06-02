'use client'

import { useRef, useState } from 'react'
import {
  ReactSketchCanvas as SketchCanvas,
  type ReactSketchCanvasRef as SketchCanvasRef,
} from 'react-sketch-canvas'
import useEvent from 'react-use-event-hook'

import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'

const ColorButton = ({
  color,
  onClick,
}: {
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
      className='size-auto rounded-full p-1.5'
      onClick={handleClick}
    >
      <div className='size-4 rounded-full' style={{ backgroundColor: color }} />
    </Button>
  )
}

const initialStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 'none',
}

export function DrawingCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<SketchCanvasRef>(null)

  const [isLocked] = useState<boolean>(true)

  const [strokeWidth] = useState<number>(10)
  const [strokeColor, setStrokeColor] = useState<string>('#FF676D')

  const handleColorButtonClick = useEvent((color): void => {
    setStrokeColor(color)
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
          <ColorButton color='#FF676D' onClick={handleColorButtonClick} />
          <ColorButton color='#FFA700' onClick={handleColorButtonClick} />
          <ColorButton color='#48AEFF' onClick={handleColorButtonClick} />
        </div>
      </div>
    </div>
  )
}
