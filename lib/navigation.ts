import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { HeroiconsIcon } from '@/lib/heroicons'
import type { Keys } from 'react-hotkeys-hook'

export type NavigationItemName = 'home' | 'tech-stack' | 'experience' | 'craft'
export type NavigationItem = {
  href: string
  name: NavigationItemName
  label: string
  shortcutLabel: string
  shortcutKeys: Keys
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    name: 'home',
    label: 'home',
    shortcutLabel: '⌘1',
    shortcutKeys: 'meta+1',
  },
  {
    href: '/tech-stack',
    name: 'tech-stack',
    label: 'tech stack',
    shortcutLabel: '⌘2',
    shortcutKeys: 'meta+2',
  },
  {
    href: '/experience',
    name: 'experience',
    label: 'experience',
    shortcutLabel: '⌘3',
    shortcutKeys: 'meta+3',
  },
  {
    href: '/craft',
    name: 'craft',
    label: 'craft',
    shortcutLabel: '⌘4',
    shortcutKeys: 'meta+4',
  },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  home: HomeIcon,
  'tech-stack': WrenchScrewdriverIcon,
  experience: BriefcaseIcon,
  craft: LightBulbIcon,
}
