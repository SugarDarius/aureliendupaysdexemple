'use client'

import { useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
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
  children,
  onClick,
}: {
  className?: string
  children?: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl border px-4 py-2 shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function ColorModeDrawerSwitcher({ className }: { className?: string }) {
  const { setTheme } = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = useEvent(
    (colorMode: 'light' | 'dark' | 'system'): void => {
      setOpen(false)
      setTheme(colorMode)
    }
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            navigationMenuTriggerStyle(),
            'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent',
            className
          )}
        >
          <SunIcon className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle color mode</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full px-4 pb-4'>
          <DrawerHeader>
            <DrawerTitle>Color mode</DrawerTitle>
          </DrawerHeader>
          <div className='grid max-w-[496px] grid-cols-2 gap-4'>
            <ColorModeDrawerItem
              onClick={() => {
                handleClick('light')
              }}
              className='col-span-1'
            >
              <SunIcon className='size-6' />
              Light
            </ColorModeDrawerItem>
            <ColorModeDrawerItem
              onClick={() => {
                handleClick('dark')
              }}
              className='col-span-1'
            >
              <MoonIcon className='size-6' />
              Dark
            </ColorModeDrawerItem>
            <ColorModeDrawerItem
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
