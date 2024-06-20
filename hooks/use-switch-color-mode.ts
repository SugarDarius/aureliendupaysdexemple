import { flushSync } from 'react-dom'

import { useTheme } from 'next-themes'
import useEvent from 'react-use-event-hook'

type UseThemeReturnType = ReturnType<typeof useTheme>

type UseSwitchColorModeReturnType = {
  theme: UseThemeReturnType['theme']
  resolvedTheme: UseThemeReturnType['resolvedTheme']
  setColorMode: (colorMode: string) => Promise<void>
}
export function useSwitchColorMode(): UseSwitchColorModeReturnType {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const setColorMode = useEvent(async (colorMode: string): Promise<void> => {
    if (colorMode === theme) {
      return
    }

    if (!document.startViewTransition) {
      setTheme(colorMode)
      return
    }

    await document.startViewTransition((): void => {
      flushSync((): void => {
        setTheme(colorMode)
      })
    }).ready

    const [x, y] = [window.innerWidth / 2, window.innerHeight / 2]
    const radius = Math.hypot(x, y)

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  })

  return { theme, resolvedTheme, setColorMode } as const
}
