'use client'

import { useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { useSwitchColorMode } from '@/hooks/use-switch-color-mode'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const ColorModeDrawerItem = ({
  className,
  selected,
  children,
  onClick,
}: {
  className?: string
  selected: boolean
  children?: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border px-4 py-2 shadow data-[selected=true]:bg-accent/50',
        className
      )}
      onClick={onClick}
      date-selected={`${selected}`}
    >
      {children}
    </div>
  )
}

export function ColorModeDrawerSwitcher({ className }: { className?: string }) {
  const { setColorMode, theme } = useSwitchColorMode()
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = useEvent((colorMode: string): void => {
    setOpen(false)
    setColorMode(colorMode)
  })

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            navigationMenuTriggerStyle(),
            'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0',
            className
          )}
        >
          <SunIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle color mode</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className='!outline-none' aria-describedby={undefined}>
        <div className='w-full px-4 pb-4'>
          <DrawerHeader className='sm:text-center'>
            <DrawerTitle>Color mode</DrawerTitle>
          </DrawerHeader>
          <div className='mx-auto grid w-full max-w-[496px] grid-cols-2 gap-4'>
            <ColorModeDrawerItem
              selected={theme === 'light'}
              onClick={() => {
                handleClick('light')
              }}
              className='col-span-1'
            >
              <SunIcon className='size-6' />
              Light
            </ColorModeDrawerItem>
            <ColorModeDrawerItem
              selected={theme === 'dark'}
              onClick={() => {
                handleClick('dark')
              }}
              className='col-span-1'
            >
              <MoonIcon className='size-6' />
              Dark
            </ColorModeDrawerItem>
            <ColorModeDrawerItem
              selected={theme === 'system'}
              onClick={() => {
                handleClick('system')
              }}
              className='col-span-2'
            >
              <ComputerDesktopIcon className='size-6' />
              System
            </ColorModeDrawerItem>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
