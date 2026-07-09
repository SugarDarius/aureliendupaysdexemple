'use client'

import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import type { Keys } from 'react-hotkeys-hook'

import { NavigationDockItemLink } from '@/components/navigation/navigation-dock-item-link'
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { navigationItemsIcons } from '@/lib/navigation'
import type { NavigationItemName } from '@/lib/navigation'
import { toUpperFirst } from '@/lib/utils'

export const NavigationDockItem = ({
  href,
  name,
  label,
  pathname,
  shortcutLabel,
  shortcutKeys,
}: {
  href: string
  name: NavigationItemName
  label: string
  pathname: string
  shortcutLabel: string
  shortcutKeys: Keys
}) => {
  const router = useRouter()
  useHotkeys(
    shortcutKeys,
    (e): void => {
      e.preventDefault()
      router.push(href)
    },
    [href],
  )
  const isActive =
    href === '/craft' ? pathname.startsWith(href) : href === pathname
  const Icon = navigationItemsIcons[name]

  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger aria-label={name}>
          <NavigationMenuLink asChild>
            <NavigationDockItemLink href={href} name={name} active={isActive}>
              <Icon className='size-4' />
            </NavigationDockItemLink>
          </NavigationMenuLink>
        </TooltipTrigger>
        <TooltipContent
          className='flex flex-row items-center gap-1'
          sideOffset={8}
        >
          <span>{toUpperFirst(label)}</span>
          <span className='bg-muted text-muted-foreground pointer-events-none flex items-center gap-1 rounded border px-1.5 text-[10px] font-medium tracking-[2px] select-none'>
            {shortcutLabel}
          </span>
        </TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  )
}
