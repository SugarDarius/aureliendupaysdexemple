import { useEffect, useState } from 'react'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    // oxlint-disable-next-line react/react-compiler react/set-state-in-effect
    setMounted(true)
  }, [])

  return mounted
}
