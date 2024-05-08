import { MDXRemote } from 'next-mdx-remote/rsc'

import { cn } from '@/lib/utils'

const HeadingOne = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      'mt-2 scroll-m-20 text-4xl font-bold tracking-tighter first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingTwo = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      'mt-4 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const components = {
  h1: HeadingOne,
  h2: HeadingTwo,
}

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
