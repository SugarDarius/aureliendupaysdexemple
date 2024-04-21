'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  active?: boolean
  children: React.ReactNode
}

const NavigationDockItemLink = forwardRef<
  HTMLAnchorElement,
  NavigationDockItemLinkProps
>(({ href, active = false, children }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        'flex flex-col items-center justify-center rounded-xl data-[active]:bg-accent'
      )}
      data-active={active ? '' : undefined}
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
  pathname,
}: {
  href: string
  name: NavigationItemName
  label: string
  pathname: string
}) => {
  const isActive = href === pathname
  const Icon = navigationItemsIcons[name]

  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <NavigationMenuLink asChild>
            <NavigationDockItemLink href={href} active={isActive}>
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
  const pathname = usePathname()

  return (
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max rounded-xl border-2 p-2'>
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((navigationItem) => (
            <NavigationDockItem
              key={navigationItem.name}
              {...navigationItem}
              pathname={pathname}
            />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
