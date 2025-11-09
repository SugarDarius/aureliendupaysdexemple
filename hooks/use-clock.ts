import { useEffect, useRef, useState } from 'react'

import { formatClock } from '@/lib/clock'
import { useInterval } from '@/hooks/use-interval'

// check for every seconds to be realistic
const REFRESH_DELAY_MS = 1000

type UseClockReturnType = [
  // hours
  string,
  // minutes
  string,
  // meridiem
  string,
]

export function useClock(): UseClockReturnType {
  const [clock, setClock] = useState<string>(formatClock())
  const [refreshDelayMs, setRefreshDelay] = useState<number | null>(null)

  // eslint-disable-next-line react-hooks/purity
  const renderTimeRef = useRef<number>(Date.now())

  useInterval((): void => {
    setClock(formatClock())
  }, refreshDelayMs)

  // clock drift
  useEffect(() => {
    const nextTick = new Date(renderTimeRef.current)

    nextTick.setMilliseconds(0)
    nextTick.setSeconds(nextTick.getSeconds() + 1)

    const clockDriftDelay = nextTick.getTime() - renderTimeRef.current

    const timeoutId = setTimeout((): void => {
      setClock(formatClock())
      setRefreshDelay(REFRESH_DELAY_MS)
    }, clockDriftDelay)

    return (): void => {
      clearTimeout(timeoutId)
    }
  }, [])

  const [hours, minutes, meridiem] = clock.split('-')

  return [hours, minutes, meridiem] as const
}
