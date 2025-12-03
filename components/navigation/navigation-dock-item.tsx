'use client'

import { useRouter } from 'next/navigation'
import { type Keys, useHotkeys } from 'react-hotkeys-hook'

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
    [href]
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
