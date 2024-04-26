import { HTML5Icon } from '@/components/icons/html5-icon'
import { CSS3Icon } from '@/components/icons/css3-icon'

type TechStackItem = {
  name: string
  Icon: React.FunctionComponent<
    React.PropsWithoutRef<React.HTMLAttributes<SVGElement>>
  >
  tag: string
}

export const languagesTechStackItems: TechStackItem[] = [
  { name: 'HTML 5', Icon: HTML5Icon, tag: 'frontend' },
  { name: 'CSS 3', Icon: CSS3Icon, tag: 'frontend' },
]
