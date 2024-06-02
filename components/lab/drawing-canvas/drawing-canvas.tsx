'use client'

import { useRef } from 'react'

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className='relative flex size-full flex-col'>
      <canvas ref={canvasRef} className='absolute left-0 top-0 size-full' />
    </div>
  )
}
