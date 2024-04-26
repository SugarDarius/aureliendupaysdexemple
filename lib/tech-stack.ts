import { HTML5Icon } from '@/components/icons/html5-icon'
import { CSS3Icon } from '@/components/icons/css3-icon'
import { TypescriptIcon } from '@/components/icons/typescript-icon'
import { GraphQLIcon } from '@/components/icons/graphql-icon'
import { PHPIcon } from '@/components/icons/php-icon'
import { SQLIcon } from '@/components/icons/sql-icon'

import { ChakraUIIcon } from '@/components/icons/chakra-ui-icon'
import { RadixUIIcon } from '@/components/icons/radix-ui-icon'
import { TailwindCSSIcon } from '@/components/icons/tailwind-css-icon'

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
  { name: 'Typescript', Icon: TypescriptIcon, tag: 'frontend/backend' },
  { name: 'GraphQL', Icon: GraphQLIcon, tag: 'frontend/backend' },
  { name: 'PHP', Icon: PHPIcon, tag: 'backend' },
  { name: 'SQL', Icon: SQLIcon, tag: 'backend' },
]

export const technologiesTechStackItems: TechStackItem[] = [
  { name: 'Chakra UI', Icon: ChakraUIIcon, tag: 'UI/UX' },
  { name: 'Radix UI', Icon: RadixUIIcon, tag: 'UI/UX' },
  { name: 'Tailwind CSS', Icon: TailwindCSSIcon, tag: 'UI/UX' },
]
