'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'

export function ProvidersTree({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
