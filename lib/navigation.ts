import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { HeroiconsIcon } from '@/lib/heroicons'

export type NavigationItemName = 'home' | 'tech-stack' | 'experience' | 'craft'
export type NavigationItem = {
  href: string
  name: NavigationItemName
  label: string
}

export const navigationItems: NavigationItem[] = [
  { href: '/', name: 'home', label: 'home' },
  { href: '/tech-stack', name: 'tech-stack', label: 'tech stack' },
  { href: '/experience', name: 'experience', label: 'experience' },
  { href: '/craft', name: 'craft', label: 'craft' },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  home: HomeIcon,
  'tech-stack': WrenchScrewdriverIcon,
  experience: BriefcaseIcon,
  craft: LightBulbIcon,
}
