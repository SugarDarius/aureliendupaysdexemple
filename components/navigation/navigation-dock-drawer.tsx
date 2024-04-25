'use client'

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
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant='ghost'
          className={cn(
            navigationMenuTriggerStyle(),
            'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent',
            className
          )}
        >
          <Bars3Icon className='size-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full px-4 pb-4'>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className='grid max-w-[496px] grid-cols-2 gap-4'>
            {navigationItems.map((navigationItem) => {
              const isActive = navigationItem.href === pathname
              const Icon = navigationItemsIcons[navigationItem.name]

              return (
                <div
                  key={navigationItem.href}
                  className='flex aspect-square flex-col'
                >
                  <NavigationDockItemLink
                    href={navigationItem.href}
                    active={isActive}
                    variant='drawer'
                    className='colspan-1'
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
