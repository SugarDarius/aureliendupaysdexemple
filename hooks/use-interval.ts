import { useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

type Callback = () => void

export function useInterval(callback: Callback, delay: number | null): void {
  const savedCallback = useRef<Callback>(callback)

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval((): void => {
        savedCallback.current()
      }, delay)

      return (): void => {
        clearInterval(intervalId)
      }
    }
  }, [delay])
}
