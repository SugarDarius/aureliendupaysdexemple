'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'

import { cn, toUpperFirst } from '@/lib/utils'
import type { NavigationItem } from '@/lib/navigation'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

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
        <div className='w-full p-2'>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
