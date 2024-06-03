import { useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

type Callback = () => void

export function useTimeout(callback: Callback, delay: number | null): void {
  const savedCallback = useRef<Callback>(callback)

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null && delay > 0) {
      const timeoutId = setTimeout((): void => {
        savedCallback.current()
      }, delay)

      return (): void => {
        clearTimeout(timeoutId)
      }
    }
  }, [delay])
}
