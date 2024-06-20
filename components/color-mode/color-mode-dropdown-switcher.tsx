'use client'

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

export function ColorModeDropdownSwitcher({
  className,
}: {
  className?: string
}) {
  const { setColorMode, theme } = useSwitchColorMode()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn('focus-visible:outline-none', className)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                navigationMenuTriggerStyle(),
                'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
              )}
            >
              <SunIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <MoonIcon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle color mode</span>
            </span>
          </TooltipTrigger>
          <TooltipContent>Switch color mode</TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={10} alignOffset={-4}>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setColorMode('light')}
          className='flex flex-row items-center gap-2'
        >
          <SunIcon className='h-4 w-4' />
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setColorMode('dark')}
          className='flex flex-row items-center gap-2'
        >
          <MoonIcon className='h-4 w-4' />
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setColorMode('system')}
          className='flex flex-row items-center gap-2'
        >
          <ComputerDesktopIcon className='h-4 w-4' />
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
