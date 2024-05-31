import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

type Browser = 'Firefox' | 'Safari' | 'undetermined'

const getBrowser = (): Browser => {
  if (typeof window === 'undefined') {
    return 'undetermined'
  }

  const userAgent = navigator.userAgent
  const vendor = navigator.vendor

  if (/Firefox\/d+\.\d+$/.test(userAgent)) {
    return 'Firefox'
  } else if (/Safari/.test(userAgent) && /Apple Computer/.test(vendor)) {
    return 'Safari'
  }

  return 'undetermined'
}

type UseUserAgentReturnType = {
  isSafari: boolean
  isFirefox: boolean
}

export function useUserAgent(): UseUserAgentReturnType {
  const [browser, setBrowser] = useState<Browser>('undetermined')

  useIsomorphicLayoutEffect(() => {
    const browser = getBrowser()
    setBrowser(browser)
  }, [])

  const isSafari = browser === 'Safari'
  const isFirefox = browser === 'Firefox'

  return { isSafari, isFirefox } as const
}
