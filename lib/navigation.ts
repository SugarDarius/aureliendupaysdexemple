import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { Keys } from 'react-hotkeys-hook'

import type { HeroiconsIcon } from '@/lib/heroicons'

export type NavigationItemName = 'home' | 'tech-stack' | 'work' | 'craft'
export interface NavigationItem {
  href: string
  name: NavigationItemName
  label: string
  shortcutLabel: string
  shortcutKeys: Keys
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'home',
    name: 'home',
    shortcutKeys: 'g+h',
    shortcutLabel: 'G+H',
  },
  {
    href: '/tech-stack',
    label: 'tech stack',
    name: 'tech-stack',
    shortcutKeys: 'G+T',
    shortcutLabel: 'G+T',
  },
  {
    href: '/work',
    label: 'work',
    name: 'work',
    shortcutKeys: 'g+w',
    shortcutLabel: 'G+W',
  },
  {
    href: '/craft',
    label: 'craft',
    name: 'craft',
    shortcutKeys: 'g+c',
    shortcutLabel: 'G+C',
  },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  craft: LightBulbIcon,
  home: HomeIcon,
  'tech-stack': WrenchScrewdriverIcon,
  work: BriefcaseIcon,
}
