'use client'

import { useRef, useState } from 'react'
import {
  ReactSketchCanvas as SketchCanvas,
  type ReactSketchCanvasRef as SketchCanvasRef,
} from 'react-sketch-canvas'

import { cn } from '@/lib/utils'
import clsx from 'clsx'

const initialStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 'none',
}

export function DrawingCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<SketchCanvasRef>(null)

  const [isLocked] = useState<boolean>(true)
  const [strokeWidth] = useState<number>(10)

  return (
    <div
      className={cn(
        'relative flex size-full flex-col',
        className,
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
      />
    </div>
  )
}
