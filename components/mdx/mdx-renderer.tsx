import Link from 'next/link'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { cn } from '@/lib/utils'
import { TagLink } from '@/components/content/tag-link'
import { Callout } from '@/components/content/callout'

const Heading1 = ({
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

const Heading2 = ({
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

const Heading3 = ({
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

const Heading4 = ({
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

const Heading5 = ({
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

const Heading6 = ({
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
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('leading-6 [&:not(:first-child)]:mt-6', className)}
    {...props}
  />
)

const Blockquote = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <blockquote
    className={cn(
      'mt-6 border-l-2 pl-6 italic text-muted-foreground',
      className
    )}
    {...props}
  />
)

const Code = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}
    {...props}
  />
)

const InternalLink = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => (
  <Link
    className={cn('font-medium underline underline-offset-4', className)}
    {...props}
  />
)

const ExternalLink = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn('font-medium underline underline-offset-4', className)}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  />
)

const components: MDXRemoteProps['components'] = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: Paragraph,
  blockquote: Blockquote,
  code: Code,
  a: ExternalLink,
  InternalLink,
  TagLink,
  Callout,
}

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
