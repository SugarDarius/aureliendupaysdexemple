'use-client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Note: Following https://github.com/pacocoursey/next-themes/issues/322
// Props to be updated if they are exported again
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
