'use client'

import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'

import type { HeroiconsIcon } from '@/lib/heroicons'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

type NavigationBarMenuItemKey = 'home'

const icons: Record<NavigationBarMenuItemKey, HeroiconsIcon> = {
  home: HomeIcon,
}

const NavigationBarMenuItem = ({
  href,
  itemKey,
}: {
  href: string
  itemKey: NavigationBarMenuItemKey
}) => {
  const Icon = icons[itemKey]
  return (
    <NavigationMenuItem>
      <Link
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          'flex flex-col items-center justify-center rounded-xl'
        )}
      >
        <Icon className='h-4 w-4' />
      </Link>
    </NavigationMenuItem>
  )
}

export function NavigationBar() {
  return (
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max rounded-xl border-2 px-4 py-2.5'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationBarMenuItem href='/' itemKey='home' />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
