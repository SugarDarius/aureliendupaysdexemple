'use client'

import Link from 'next/link'
import { forwardRef } from 'react'

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

type NavigationDockItemLinkProps = {
  href: string
  children: React.ReactNode
}

const NavigationDockItemLink = forwardRef<
  HTMLAnchorElement,
  NavigationDockItemLinkProps
>(({ href, children }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        'flex flex-col items-center justify-center rounded-xl'
      )}
    >
      {children}
    </Link>
  )
})
NavigationDockItemLink.displayName = 'NavigationDockItemLink'

const NavigationDockItem = ({
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
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <NavigationMenuLink asChild>
            <NavigationDockItemLink href={href}>
              <Icon className='h-4 w-4' />
            </NavigationDockItemLink>
          </NavigationMenuLink>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  )
}

export function NavigationDock() {
  return (
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max rounded-xl border-2 p-2.5'>
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((navigationItem) => (
            <NavigationDockItem key={navigationItem.name} {...navigationItem} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
