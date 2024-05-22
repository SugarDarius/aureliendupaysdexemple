'use client'

import { getTimezoneOffset } from '@/lib/clock'
import { useClock } from '@/hooks/use-clock'
import { useFitFontSizeToContainerWidth } from '@/hooks/use-fit-font-size-to-container-width'
import { useEffect } from 'react'

const timezoneOffset = getTimezoneOffset()

export function ClockWidget() {
  const [time, meridiem] = useClock()
  const { containerRef, fontSize } = useFitFontSizeToContainerWidth(time)

  useEffect(() => {
    return () => {
      console.log('unmount')
    }
  }, [])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <div className='relative flex w-full flex-col gap-1'>
        <div className='flex w-full flex-row items-center justify-between px-1 text-sm leading-none text-muted-foreground'>
          <span>{meridiem}</span>
          <span>{timezoneOffset}</span>
        </div>
        <div ref={containerRef} className='flex w-full flex-col items-end'>
          {fontSize > 0 ? (
            <span
              className='font-mono font-medium'
              style={{ fontSize, lineHeight: `${fontSize + 2}px` }}
            >
              {time}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
