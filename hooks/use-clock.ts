import { useState } from 'react'
import { format } from 'date-fns'

import { useInterval } from '@/hooks/use-interval'

// check for every seconds to be realistic
const REFRESH_DELAY_MS = 1000

const formatClock = (): string => {
  return format(new Date(), 'h-mm-aaaa')
}

export function useClock(): [string, string] {
  const [clock, setClock] = useState<string>(formatClock())

  useInterval((): void => {
    setClock(formatClock())
  }, REFRESH_DELAY_MS)

  const [hours, minutes, meridiem] = clock.split('-')

  return [`${hours}:${minutes}`, meridiem] as const
}
