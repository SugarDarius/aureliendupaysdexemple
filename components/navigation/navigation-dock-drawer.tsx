'use client'

import { useState } from 'react'
import useEvent from 'react-use-event-hook'
import { Bars3Icon } from '@heroicons/react/24/outline'

import { cn, toUpperFirst } from '@/lib/utils'
import { type NavigationItem, navigationItemsIcons } from '@/lib/navigation'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

import { NavigationDockItemLink } from '@/components/navigation/navigation-dock-item-link'

export function NavigationDockDrawer({
  className,
  pathname,
  navigationItems,
}: {
  className?: string
  pathname: string
  navigationItems: NavigationItem[]
}) {
  const [open, setOpen] = useState<boolean>(false)
  const handleLinkClick = useEvent((): void => {
    setOpen(false)
  })

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
          aria-label='burger menu'
        >
          <Bars3Icon className='size-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='flex w-full flex-col px-4 pb-4'>
          <DrawerHeader className='sm:text-center'>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className='mx-auto grid w-full max-w-[496px] grid-cols-2 gap-4'>
            {navigationItems.map((navigationItem) => {
              const isActive = navigationItem.href === pathname
              const Icon = navigationItemsIcons[navigationItem.name]

              return (
                <div key={navigationItem.href} className='flex flex-col'>
                  <NavigationDockItemLink
                    href={navigationItem.href}
                    name={navigationItem.name}
                    active={isActive}
                    variant='drawer'
                    className='col-span-1'
                    onClick={handleLinkClick}
                  >
                    <Icon className='size-6' />
                    {toUpperFirst(navigationItem.label)}
                  </NavigationDockItemLink>
                </div>
              )
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
