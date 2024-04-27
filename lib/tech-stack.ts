import { HTML5Icon } from '@/components/icons/html5-icon'
import { CSS3Icon } from '@/components/icons/css3-icon'
import { TypescriptIcon } from '@/components/icons/typescript-icon'
import { GraphQLIcon } from '@/components/icons/graphql-icon'
import { PHPIcon } from '@/components/icons/php-icon'
import { SQLIcon } from '@/components/icons/sql-icon'

import { ChakraUIIcon } from '@/components/icons/chakra-ui-icon'
import { RadixUIIcon } from '@/components/icons/radix-ui-icon'
import { ShadcnUIIcon } from '@/components/icons/shadcn-ui-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'
import { ReactIcon } from '@/components/icons/react-icon'
import { TailwindCSSIcon } from '@/components/icons/tailwind-css-icon'
import { FramerMotionIcon } from '@/components/icons/framer-motion-icon'
import { ZodIcon } from '@/components/icons/zod-icon'
import { ZustandIcon } from '@/components/icons/zustand-icon'
import { XStateIcon } from '@/components/icons/xstate-icon'
import { ReduxIcon } from '@/components/icons/redux-icon'

type TechStackItem = {
  name: string
  Icon: React.FunctionComponent<
    React.PropsWithoutRef<React.HTMLAttributes<SVGElement>>
  >
  tag: string
  href?: string
}

export const languagesTechStackItems: TechStackItem[] = [
  { name: 'HTML 5', Icon: HTML5Icon, tag: 'frontend' },
  { name: 'CSS 3', Icon: CSS3Icon, tag: 'frontend' },
  {
    name: 'Typescript',
    Icon: TypescriptIcon,
    tag: 'frontend/backend',
    href: 'https://www.typescriptlang.org/',
  },
  {
    name: 'GraphQL',
    Icon: GraphQLIcon,
    tag: 'frontend/backend',
    href: 'https://graphql.org/',
  },
  { name: 'PHP', Icon: PHPIcon, tag: 'backend' },
  { name: 'SQL', Icon: SQLIcon, tag: 'backend' },
]

export const technologiesTechStackItems: TechStackItem[] = [
  {
    name: 'Chakra UI',
    Icon: ChakraUIIcon,
    tag: 'UI/UX',
    href: 'https://chakra-ui.com/',
  },
  {
    name: 'Radix UI',
    Icon: RadixUIIcon,
    tag: 'UI/UX',
    href: 'https://www.radix-ui.com/primitives',
  },
  {
    name: 'shadcn/ui',
    Icon: ShadcnUIIcon,
    tag: 'UI/UX',
    href: 'https://ui.shadcn.com/',
  },
  {
    name: 'Next.js',
    Icon: NextJSSquareIcon,
    tag: 'frontend',
    href: 'https://nextjs.org/',
  },
  {
    name: 'React',
    Icon: ReactIcon,
    tag: 'frontend',
    href: 'https://react.dev/',
  },
  {
    name: 'Tailwind CSS',
    Icon: TailwindCSSIcon,
    tag: 'frontend',
    href: 'https://tailwindcss.com/',
  },
  {
    name: 'Framer Motion',
    Icon: FramerMotionIcon,
    tag: 'animation',
    href: 'https://www.framer.com/motion/',
  },
  {
    name: 'Zod',
    Icon: ZodIcon,
    tag: 'validation',
    href: 'https://zod.dev/',
  },
  {
    name: 'Zustand',
    Icon: ZustandIcon,
    tag: 'state management',
    href: 'https://zustand-demo.pmnd.rs/',
  },
  {
    name: 'X State',
    Icon: XStateIcon,
    tag: 'state machine',
    href: 'https://xstate.js.org/',
  },
  {
    name: 'Redux',
    Icon: ReduxIcon,
    tag: 'state management',
    href: 'https://redux.js.org/',
  },
]
