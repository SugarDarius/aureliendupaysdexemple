import { flushSync } from 'react-dom'

import { useTheme } from 'next-themes'
import useEvent from 'react-use-event-hook'

const getClipPathKeyframes = (colorMode: string): string[] => {
  switch (colorMode) {
    case 'system': {
      const [x, y] = [window.innerWidth / 2, window.innerHeight / 2]
      const radius = Math.hypot(x, y)

      return [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ]
    }
    case 'light':
      return [
        'polygon(0 100%, 0 100%, 0 100%, 0 100%)',
        'polygon(0 100%, 0 0, 100% 0, 100% 100%)',
      ]
    case 'dark':
      return [
        'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
        'polygon(100% 100%, 100% 0, 0 0, 0 100%)',
      ]
    default:
      return []
  }
}

type UseThemeReturnType = ReturnType<typeof useTheme>

type UseSwitchColorModeReturnType = {
  theme: UseThemeReturnType['theme']
  resolvedTheme: UseThemeReturnType['resolvedTheme']
  setColorMode: (colorMode: string) => Promise<void>
}
export function useSwitchColorMode(): UseSwitchColorModeReturnType {
  const { theme, resolvedTheme, setTheme, systemTheme } = useTheme()

  const setColorMode = useEvent(async (colorMode: string): Promise<void> => {
    if (
      !document.startViewTransition ||
      colorMode === theme ||
      (colorMode === 'system' && theme === systemTheme) ||
      (theme === 'system' && colorMode === resolvedTheme)
    ) {
      setTheme(colorMode)
      return
    }

    try {
      await document.startViewTransition((): void => {
        flushSync((): void => {
          setTheme(colorMode)
        })
      }).ready

      const keyframes = getClipPathKeyframes(colorMode)
      document.documentElement.animate(
        {
          clipPath: keyframes,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    } catch {
      setTheme(colorMode)
    }
  })

  return { theme, resolvedTheme, setColorMode } as const
}
