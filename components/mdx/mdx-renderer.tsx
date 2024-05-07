import { MDXRemote } from 'next-mdx-remote/rsc'

import { cn } from '@/lib/utils'

const HeadingOne = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      'mt-2 scroll-mb-20 text-4xl font-bold tracking-tighter',
      className
    )}
    {...props}
  />
)

const components = {
  h1: HeadingOne,
}

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
