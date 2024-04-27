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

import { NestJSIcon } from '@/components/icons/nestjs-icon'
import { MongoDBIcon } from '@/components/icons/mongodb-icon'
import { SupabaseIcon } from '@/components/icons/supabase-icon'

import { VercelIcon } from '@/components/icons/vercel-icon'

import { VSCodeIcon } from '@/components/icons/vscode-icon'
import { NodeJSIcon } from '@/components/icons/nodejs-icon'

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

export const frontendTechnologiesTechStackItems: TechStackItem[] = [
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
    name: 'Chakra UI',
    Icon: ChakraUIIcon,
    tag: 'UI/UX',
    href: 'https://chakra-ui.com/',
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

export const backendTechnologiesTechStackItems: TechStackItem[] = [
  {
    name: 'NestJS',
    Icon: NestJSIcon,
    tag: 'server framework',
    href: 'https://nestjs.com/',
  },
  {
    name: 'MongoDB',
    Icon: MongoDBIcon,
    tag: 'database',
    href: 'https://www.mongodb.com/',
  },
  {
    name: 'Supabase',
    Icon: SupabaseIcon,
    tag: 'database',
    href: 'https://supabase.com/',
  },
]

export const hoistingTechStackItems: TechStackItem[] = [
  {
    name: 'Vercel',
    Icon: VercelIcon,
    tag: 'hoisting/deployment',
    href: 'https://vercel.com/',
  },
]

export const toolsAndSoftwaresTechStackItems: TechStackItem[] = [
  {
    name: 'VSCode',
    Icon: VSCodeIcon,
    tag: 'code editor',
    href: 'https://code.visualstudio.com/',
  },
  {
    name: 'Node.JS',
    Icon: NodeJSIcon,
    tag: 'runtime',
    href: 'https://nodejs.org/',
  },
]
