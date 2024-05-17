import { useEffect, useState } from 'react'

export function useStore<S, D>(
  store: (callback: (state: S) => D) => D,
  callback: (state: S) => D
): D | null {
  const result = store(callback)
  const [data, setData] = useState<D | null>(null)

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
