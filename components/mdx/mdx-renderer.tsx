import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { cn } from '@/lib/utils'

const HeadingOne = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      'mt-2 scroll-m-20 text-4xl font-extrabold tracking-tighter first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingTwo = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      'mt-4 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingThree = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingFour = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className={cn(
      'mt-8 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingFive = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={cn(
      'mt-10 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const HeadingSix = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h6
    className={cn(
      'mt-12 scroll-m-20 text-base font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
)

const Paragraph = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <p
    className={cn('leading-6 [&:not(:first-child)]:mt-6', className)}
    {...props}
  />
)

const components: MDXRemoteProps['components'] = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h4: HeadingFour,
  h5: HeadingFive,
  h6: HeadingSix,
  p: Paragraph,
}

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
