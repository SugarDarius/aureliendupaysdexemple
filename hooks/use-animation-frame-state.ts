import { useEffect, useRef, useState } from 'react'
import useEvent from 'react-use-event-hook'

type UseAnimationFrameStateReturnType<S> = [
  S,
  React.Dispatch<React.SetStateAction<S>>,
]

export function useAnimationFrameState<S>(
  initialState: S | (() => S)
): UseAnimationFrameStateReturnType<S> {
  const frameRequestId = useRef<number>(0)
  const [state, setState] = useState<S>(initialState)

  const setAnimationFrameState = useEvent(
    (value: S | ((prevState: S) => S)): void => {
      cancelAnimationFrame(frameRequestId.current)

      frameRequestId.current = requestAnimationFrame((): void => {
        setState(value)
      })
    }
  )

  useEffect(() => {
    return (): void => {
      cancelAnimationFrame(frameRequestId.current)
    }
  })

  return [state, setAnimationFrameState] as const
}
