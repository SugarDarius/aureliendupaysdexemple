import { useEffect, useState } from 'react'

export function useMounted(): boolean {
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => {
    // oxlint-disable-next-line react/react-compiler
    setMounted(true)
  }, [])

  return mounted
}
