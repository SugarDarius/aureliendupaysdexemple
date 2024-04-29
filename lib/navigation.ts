import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { HeroiconsIcon } from '@/lib/heroicons'
import type { Keys } from 'react-hotkeys-hook'

export type NavigationItemName = 'home' | 'tech-stack' | 'work' | 'craft'
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
    shortcutLabel: 'G+H',
    shortcutKeys: 'g+h',
  },
  {
    href: '/tech-stack',
    name: 'tech-stack',
    label: 'tech stack',
    shortcutLabel: 'G+T',
    shortcutKeys: 'G+T',
  },
  {
    href: '/work',
    name: 'work',
    label: 'work',
    shortcutLabel: 'G+E',
    shortcutKeys: 'g+e',
  },
  {
    href: '/craft',
    name: 'craft',
    label: 'craft',
    shortcutLabel: 'G+C',
    shortcutKeys: 'g+c',
  },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  home: HomeIcon,
  'tech-stack': WrenchScrewdriverIcon,
  work: BriefcaseIcon,
  craft: LightBulbIcon,
}
