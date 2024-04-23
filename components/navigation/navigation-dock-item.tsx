'use client'

import { toUpperFirst } from '@/lib/utils'
import { type NavigationItemName, navigationItemsIcons } from '@/lib/navigation'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { NavigationDockItemLink } from '@/components/navigation/navigation-dock-item-link'

export const NavigationDockItem = ({
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
        <TooltipContent>{toUpperFirst(label)}</TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  )
}
