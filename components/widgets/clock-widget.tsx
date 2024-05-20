'use client'

import { useClock } from '@/hooks/use-clock'

export function ClockWidget() {
  const [time, meridiem] = useClock()
  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='flex flex-col'>
        <span className='ml-1 text-sm'>{meridiem}</span>
        <span className='font-mono text-6xl font-medium'>{time}</span>
      </div>
    </div>
  )
}
