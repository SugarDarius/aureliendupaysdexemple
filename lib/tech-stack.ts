import { ApolloGraphQLIcon } from '@/components/icons/apollo-graphql-icon'
import { ChakraUIIcon } from '@/components/icons/chakra-ui-icon'
import { ClerkIcon } from '@/components/icons/clerk-icon'
import { CSS3Icon } from '@/components/icons/css3-icon'
import { CursorIcon } from '@/components/icons/cursor-icon'
import { ElectronIcon } from '@/components/icons/electron-icon'
import { FigmaIcon } from '@/components/icons/figma-icon'
import { GitHubSquareIcon } from '@/components/icons/github-square-icon'
import { GraphQLIcon } from '@/components/icons/graphql-icon'
import { HTML5Icon } from '@/components/icons/html5-icon'
import { MongoDBIcon } from '@/components/icons/mongodb-icon'
import { MotionIcon } from '@/components/icons/motion-icon'
import { NestJSIcon } from '@/components/icons/nestjs-icon'
import { NextJSSquareIcon } from '@/components/icons/nextjs-square-icon'
import { NodeJSIcon } from '@/components/icons/nodejs-icon'
import { PhotoshopIcon } from '@/components/icons/photoshop-icon'
import { PHPIcon } from '@/components/icons/php-icon'
import { RadixUIIcon } from '@/components/icons/radix-ui-icon'
import { ReactIcon } from '@/components/icons/react-icon'
import { ReduxIcon } from '@/components/icons/redux-icon'
import { ShadcnUIIcon } from '@/components/icons/shadcn-ui-icon'
import { SQLIcon } from '@/components/icons/sql-icon'
import { SupabaseIcon } from '@/components/icons/supabase-icon'
import { TailwindCSSIcon } from '@/components/icons/tailwind-css-icon'
import { TurboRepoIcon } from '@/components/icons/turbo-repo-icon'
import { TypescriptIcon } from '@/components/icons/typescript-icon'
import { VercelIcon } from '@/components/icons/vercel-icon'
import { VSCodeIcon } from '@/components/icons/vscode-icon'
import { XStateIcon } from '@/components/icons/xstate-icon'
import { ZodIcon } from '@/components/icons/zod-icon'
import { ZustandIcon } from '@/components/icons/zustand-icon'

export interface TechStackItem {
  name: string
  Icon: React.FunctionComponent<
    React.PropsWithoutRef<React.HTMLAttributes<SVGElement>>
  >
  tag: string
  href?: string
}

export const languagesTechStackItems: TechStackItem[] = [
  { Icon: HTML5Icon, name: 'HTML 5', tag: 'frontend' },
  { Icon: CSS3Icon, name: 'CSS 3', tag: 'frontend' },
  {
    Icon: TypescriptIcon,
    href: 'https://www.typescriptlang.org/',
    name: 'Typescript',
    tag: 'frontend/backend',
  },
  {
    Icon: GraphQLIcon,
    href: 'https://graphql.org/',
    name: 'GraphQL',
    tag: 'frontend/backend',
  },
  { Icon: PHPIcon, name: 'PHP', tag: 'backend' },
  { Icon: SQLIcon, name: 'SQL', tag: 'backend' },
]

export const frontendTechnologiesTechStackItems: TechStackItem[] = [
  {
    Icon: RadixUIIcon,
    href: 'https://www.radix-ui.com/primitives',
    name: 'Radix UI',
    tag: 'UI/UX',
  },
  {
    Icon: ShadcnUIIcon,
    href: 'https://ui.shadcn.com/',
    name: 'shadcn/ui',
    tag: 'UI/UX',
  },
  {
    Icon: ChakraUIIcon,
    href: 'https://chakra-ui.com/',
    name: 'Chakra UI',
    tag: 'UI/UX',
  },
  {
    Icon: NextJSSquareIcon,
    href: 'https://nextjs.org/',
    name: 'Next.js',
    tag: 'frontend',
  },
  {
    Icon: ReactIcon,
    href: 'https://react.dev/',
    name: 'React',
    tag: 'frontend',
  },
  {
    Icon: TailwindCSSIcon,
    href: 'https://tailwindcss.com/',
    name: 'Tailwind CSS',
    tag: 'frontend',
  },
  {
    Icon: MotionIcon,
    href: 'https://motion.dev/',
    name: 'Motion',
    tag: 'animation',
  },
  {
    Icon: ZodIcon,
    href: 'https://zod.dev/',
    name: 'Zod',
    tag: 'validation',
  },
  {
    Icon: XStateIcon,
    href: 'https://xstate.js.org/',
    name: 'X State',
    tag: 'state machine',
  },
  {
    Icon: ZustandIcon,
    href: 'https://zustand-demo.pmnd.rs/',
    name: 'Zustand',
    tag: 'state management',
  },
  {
    Icon: ReduxIcon,
    href: 'https://redux.js.org/',
    name: 'Redux',
    tag: 'state management',
  },
  {
    Icon: ApolloGraphQLIcon,
    href: 'https://www.apollographql.com/',
    name: 'Apollo',
    tag: 'state management',
  },
  {
    Icon: ClerkIcon,
    href: 'https://clerk.com/',
    name: 'Clerk',
    tag: 'authentication',
  },
  {
    Icon: ElectronIcon,
    href: 'https://www.electronjs.org/',
    name: 'Electron',
    tag: 'desktop',
  },
]

export const backendTechnologiesTechStackItems: TechStackItem[] = [
  {
    Icon: NestJSIcon,
    href: 'https://nestjs.com/',
    name: 'NestJS',
    tag: 'server framework',
  },
  {
    Icon: MongoDBIcon,
    href: 'https://www.mongodb.com/',
    name: 'MongoDB',
    tag: 'database',
  },
  {
    Icon: SupabaseIcon,
    href: 'https://supabase.com/',
    name: 'Supabase',
    tag: 'database',
  },
]

export const hoistingAndDeploymentTechStackItems: TechStackItem[] = [
  {
    Icon: VercelIcon,
    href: 'https://vercel.com/',
    name: 'Vercel',
    tag: 'hoisting/deployment',
  },
]

export const toolsAndSoftwaresBaseTechStackItems: TechStackItem[] = [
  {
    Icon: CursorIcon,
    href: 'https://www.cursor.com/',
    name: 'Cursor',
    tag: 'code editor',
  },
  {
    Icon: VSCodeIcon,
    href: 'https://code.visualstudio.com/',
    name: 'VSCode',
    tag: 'code editor',
  },
  {
    Icon: NodeJSIcon,
    href: 'https://nodejs.org/',
    name: 'Node.JS',
    tag: 'runtime',
  },
]

export const toolsAndSoftwaresRepoTechStackItems: TechStackItem[] = [
  {
    Icon: TurboRepoIcon,
    href: 'https://turbo.build/',
    name: 'Turborepo',
    tag: 'monorepo',
  },
  {
    Icon: GitHubSquareIcon,
    href: 'https://github.com/',
    name: 'GitHub',
    tag: 'git',
  },
]

export const toolsAndSoftwaresDesignTechStackItems: TechStackItem[] = [
  {
    Icon: FigmaIcon,
    href: 'https://www.figma.com/',
    name: 'Figma',
    tag: 'design',
  },
  {
    Icon: PhotoshopIcon,
    href: 'https://www.adobe.com/products/photoshop.html',
    name: 'Photoshop',
    tag: 'design',
  },
]
