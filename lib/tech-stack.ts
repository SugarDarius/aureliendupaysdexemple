import { HTML5Icon } from '@/components/icons/html5-icon'

type TechStackItem = {
  name: string
  Icon: React.FunctionComponent<
    React.PropsWithoutRef<React.HTMLAttributes<SVGElement>>
  >
  tag: string
}

export const languagesTechStackItems: TechStackItem[] = [
  { name: 'HTML 5', Icon: HTML5Icon, tag: 'frontend' },
]
