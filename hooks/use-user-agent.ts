import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

type Browser = 'Firefox' | 'Safari' | 'undetermined'

const getBrowser = (): Browser => {
  if (typeof window === 'undefined') {
    return 'undetermined'
  }

  const { userAgent } = navigator
  const { vendor } = navigator

  if (/Firefox\/d+\.\d+$/.test(userAgent)) {
    return 'Firefox'
  } else if (/Safari/.test(userAgent) && /Apple Computer/.test(vendor)) {
    return 'Safari'
  }

  return 'undetermined'
}

type DeviceType = 'tablet' | 'smartphone' | 'desktop' | 'undetermined'

const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') {
    return 'undetermined'
  }

  const { userAgent } = navigator

  if (/(tablet)|(iPad)|(Nexus 9)/i.test(userAgent)) {
    return 'tablet'
  } else if (/(mobi)/i.test(userAgent)) {
    return 'smartphone'
  }

  return 'desktop'
}

interface UseUserAgentReturnType {
  isSafari: boolean
  isFirefox: boolean
  isMobile: boolean
}

export function useUserAgent(): UseUserAgentReturnType {
  const [browser, setBrowser] = useState<Browser>('undetermined')
  const [deviceType, setDeviceType] = useState<DeviceType>('undetermined')

  useIsomorphicLayoutEffect(() => {
    const detectedBrowser = getBrowser()
    const detectedDeviceType = getDeviceType()

    setBrowser(detectedBrowser)
    setDeviceType(detectedDeviceType)
  }, [])

  const isSafari = browser === 'Safari'
  const isFirefox = browser === 'Firefox'

  const isTablet = deviceType === 'tablet'
  const isSmartphone = deviceType === 'smartphone'

  const isMobile = isTablet || isSmartphone

  return { isFirefox, isMobile, isSafari } as const
}
