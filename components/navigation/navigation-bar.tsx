'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  type NavigationItemName,
  navigationItems,
  navigationItemsIcons,
} from '@/lib/navigation'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const NavigationBarMenuItem = ({
  href,
  name,
  label,
}: {
  href: string
  name: NavigationItemName
  label: string
}) => {
  const Icon = navigationItemsIcons[name]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={href}
              className={cn(
                navigationMenuTriggerStyle(),
                'flex flex-col items-center justify-center rounded-xl'
              )}
            >
              <Icon className='h-4 w-4' />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function NavigationBar() {
  return (
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max rounded-xl border-2 p-2.5'>
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((navigationItem) => (
            <NavigationBarMenuItem
              key={navigationItem.name}
              {...navigationItem}
            />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
