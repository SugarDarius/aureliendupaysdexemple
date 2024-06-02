'use client'

import { useRef, useState } from 'react'
import {
  ReactSketchCanvas as SketchCanvas,
  type ReactSketchCanvasRef as SketchCanvasRef,
} from 'react-sketch-canvas'

export function DrawingCanvas() {
  const canvasRef = useRef<SketchCanvasRef>(null)
  const [strokeWidth] = useState<number>(10)

  return (
    <div className='relative flex size-full flex-col'>
      <SketchCanvas
        ref={canvasRef}
        canvasColor='transparent'
        width='100%'
        height='100%'
        strokeWidth={strokeWidth}
      />
    </div>
  )
}
