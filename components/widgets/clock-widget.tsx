'use client'

import { useClock } from '@/hooks/use-clock'

export function ClockWidget() {
  const [clock] = useClock()
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <span className='font-mono text-6xl font-medium'>{clock}</span>
    </div>
  )
}
