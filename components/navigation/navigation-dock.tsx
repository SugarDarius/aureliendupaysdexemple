'use client'

import { usePathname } from 'next/navigation'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

import { siteConfig } from '@/config/site-config'
import { navigationItems } from '@/lib/navigation'

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'

import { TwitterLogoIcon } from '@/components/icons/twitter-logo-icon'
import { ColorModeDropdownSwitcher } from '@/components/color-mode/color-mode-dropdown-switcher'
import { ColorModeDrawerSwitcher } from '@/components/color-mode/color-mode-drawer-switcher'
import { CommandCenter } from '@/components/command-center/command-center'

import { NavigationDockDrawer } from '@/components/navigation/navigation-dock-drawer'
import { NavigationDockItem } from '@/components/navigation/navigation-dock-item'
import { NavigationDockItemExternalLink } from '@/components/navigation/navigation-dock-item-link'

export function NavigationDock() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-6 left-0 right-0 z-10 mx-auto my-0 w-max'>
      <div className='relative flex flex-row items-center gap-2 rounded-xl border bg-popover p-1'>
        <NavigationMenu className='max-lg:hidden'>
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
        <NavigationDockDrawer
          className='lg:hidden'
          pathname={pathname}
          navigationItems={navigationItems}
        />
        <Separator orientation='vertical' className='h-[26px]' />
        <div className='flex flex-row items-center gap-1'>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.linkedin.url}
            tooltipLabel='LinkedIn'
            name='LinkedIn'
          >
            <LinkedInLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.github.url}
            tooltipLabel='GitHub'
            name='GitHub'
          >
            <GitHubLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.twitter.url}
            tooltipLabel='Twitter (X)'
            name='Twitter (X)'
          >
            <TwitterLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
        </div>
        <Separator orientation='vertical' className='h-[26px]' />
        <div className='flex flex-row items-center gap-1'>
          <CommandCenter
            navigationItems={navigationItems}
            className='max-lg:hidden'
          />
          <ColorModeDropdownSwitcher className='max-lg:hidden' />
          <ColorModeDrawerSwitcher className='lg:hidden' />
        </div>
      </div>
    </div>
  )
}
