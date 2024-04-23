'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTheme } from 'next-themes'

import {
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

import { cn, toUpperFirst } from '@/lib/utils'
import { NavigationItem } from '@/lib/navigation'

import { Button } from '@/components/ui/button'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { CommandIcon } from '@/components/icons/command-icon'

export function CommandCenter({
  navigationItems,
}: {
  navigationItems: NavigationItem[]
}) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const [open, setOpen] = useState<boolean>(false)

  useHotkeys(
    'meta+k',
    (): void => {
      setOpen(true)
    },
    { enabled: !open }
  )

  const onButtonClick = useEvent((): void => {
    setOpen(true)
  })

  const handleSelectNavigationItem = useEvent((href: string): void => {
    setOpen(false)
    router.push(href)
  })

  const handleSelectColorModeItem = useEvent(
    (colorMode: 'light' | 'dark' | 'system'): void => {
      setOpen(false)
      setTheme(colorMode)
    }
  )

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              navigationMenuTriggerStyle(),
              'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
            )}
            onClick={onButtonClick}
          >
            <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
          </Button>
        </TooltipTrigger>
        <TooltipContent className='flex flex-row items-center gap-1'>
          Command center
          <kbd className='pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>⌘</span>K
          </kbd>
        </TooltipContent>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Navigation'>
            {navigationItems.map((navigationItem) => (
              <CommandItem
                key={navigationItem.name}
                value={navigationItem.name}
                onSelect={() => {
                  handleSelectNavigationItem(navigationItem.href)
                }}
                className='items-center gap-2'
              >
                <ArrowRightIcon className='h-4 w-4' />
                {toUpperFirst(navigationItem.label)}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Color mode'>
            <CommandItem
              value='light'
              onSelect={() => {
                handleSelectColorModeItem('light')
              }}
            >
              <div className='flex h-full w-full flex-row items-center gap-2'>
                <SunIcon className='h-4 w-4' />
                Light
              </div>
            </CommandItem>
            <CommandItem
              value='dark'
              onSelect={() => {
                handleSelectColorModeItem('dark')
              }}
            >
              <div className='flex h-full w-full flex-row items-center gap-2'>
                <MoonIcon className='h-4 w-4' />
                Dark
              </div>
            </CommandItem>
            <CommandItem
              value='system'
              onSelect={() => {
                handleSelectColorModeItem('system')
              }}
            >
              <div className='flex h-full w-full flex-row items-center gap-2'>
                <ComputerDesktopIcon className='h-4 w-4' />
                System
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
