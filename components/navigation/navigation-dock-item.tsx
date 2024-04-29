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
  shortcutLabel,
}: {
  href: string
  name: NavigationItemName
  label: string
  pathname: string
  shortcutLabel: string
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
        <TooltipContent className='flex flex-row items-center gap-1'>
          <span>{toUpperFirst(label)}</span>
          <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
            {shortcutLabel}
          </span>
        </TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  )
}
