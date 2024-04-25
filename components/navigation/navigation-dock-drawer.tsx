'use client'

import { Bars2Icon } from '@heroicons/react/24/outline'

import { cn, toUpperFirst } from '@/lib/utils'
import { siteConfig } from '@/config/site-config'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export function NavigationDockDrawer({
  pathname,
  className,
}: {
  pathname: string
  className?: string
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
          <Bars2Icon className='size-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
