'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'

import { GitHubLogoIcon } from '@radix-ui/react-icons'

import { siteConfig } from '@/config/site-config'
import { cn } from '@/lib/utils'
import {
  type NavigationItemName,
  navigationItems,
  navigationItemsIcons,
} from '@/lib/navigation'

import { TwitterLogoIcon } from '@/components/icons/twitter-logo'
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
import { Separator } from '@/components/ui/separator'

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

const NavigationDockItemExternalLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        navigationMenuTriggerStyle(),
        'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
      )}
    >
      {children}
    </a>
  )
}

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
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max'>
      <div className='relative flex flex-row items-center gap-2 rounded-xl border-2 p-2'>
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
        <Separator orientation='vertical' className='h-[26px]' />
        <div className='flex flex-row items-center gap-1'>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.github.url}
          >
            <GitHubLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.twitter.url}
          >
            <TwitterLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
        </div>
      </div>
    </div>
  )
}
