'use client'

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

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
import { useMagnifyingGlassStore } from '@/components/lab/magnifying-glass/magnifying-glass-store'
import { useState } from 'react'

export function ColorModeDropdownSwitcher({
  className,
}: {
  className?: string
}) {
  const { setColorMode, theme } = useSwitchColorMode()
  const isMagnifyingGlassActive = useMagnifyingGlassStore(
    (state) => state.isActive
  )

  const [open, setOpen] = useState<boolean>(false)

  const handleEscapeKeyDown = useEvent((e: KeyboardEvent): void => {
    if (isMagnifyingGlassActive) {
      e.preventDefault()
    }
  })

  useHotkeys('s+c', (): void => {
    setOpen(!open)
  })

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn('focus-visible:outline-none', className)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                navigationMenuTriggerStyle(),
                'data-active:bg-accent flex h-9 w-9 flex-col items-center justify-center rounded-full p-0',
                'cursor-pointer'
              )}
            >
              <SunIcon className='h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
              <MoonIcon className='absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
              <span className='sr-only'>Toggle color mode</span>
            </span>
          </TooltipTrigger>
          <TooltipContent
            className='flex flex-row items-center gap-1'
            sideOffset={8}
          >
            Switch color mode
            <span className='bg-muted text-muted-foreground pointer-events-none flex items-center gap-1 rounded border px-1.5 text-[10px] font-medium tracking-[2px] select-none'>
              S+C
            </span>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={10}
        alignOffset={-4}
        onEscapeKeyDown={handleEscapeKeyDown}
      >
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
