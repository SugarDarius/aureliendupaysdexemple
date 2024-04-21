import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import type { HeroiconsIcon } from '@/lib/heroicons'

export type NavigationItemName = 'home' | 'tech-stack' | 'experience' | 'craft'
type NavigationItem = { href: string; name: NavigationItemName }

export const navigationItems: NavigationItem[] = [
  { href: '/', name: 'home' },
  { href: '/tech-stack', name: 'tech-stack' },
  { href: '/experience', name: 'experience' },
  { href: '/craft', name: 'craft' },
]

export const navigationItemsIcons: Record<NavigationItemName, HeroiconsIcon> = {
  home: HomeIcon,
  'tech-stack': WrenchScrewdriverIcon,
  experience: BriefcaseIcon,
  craft: LightBulbIcon,
}
