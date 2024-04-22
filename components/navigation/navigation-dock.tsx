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
import { ColorModeSwitcher } from '@/components/color-mode/color-mode-switcher'
import { CommandCenter } from '@/components/command-center/command-center'

import { NavigationDockItem } from '@/components/navigation/navigation-dock-item'
import { NavigationDockItemExternalLink } from '@/components/navigation/navigation-dock-item-link'

export function NavigationDock() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-6 left-0 right-0 mx-auto my-0 w-max'>
      <div className='relative flex flex-row items-center gap-2 rounded-xl border-2 bg-background p-2'>
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
            href={siteConfig.socialLinks.linkedin.url}
            tooltipLabel='Linked In'
          >
            <LinkedInLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.github.url}
            tooltipLabel='GitHub'
          >
            <GitHubLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
          <NavigationDockItemExternalLink
            href={siteConfig.socialLinks.twitter.url}
            tooltipLabel='Twitter'
          >
            <TwitterLogoIcon className='h-4 w-4' />
          </NavigationDockItemExternalLink>
        </div>
        <Separator orientation='vertical' className='h-[26px]' />
        <div className='flex flex-row items-center gap-1'>
          <CommandCenter navigationItems={navigationItems} />
          <ColorModeSwitcher />
        </div>
      </div>
    </div>
  )
}
