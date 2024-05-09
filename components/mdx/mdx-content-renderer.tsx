import Link from 'next/link'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { highlight } from 'sugar-high'

import { cn } from '@/lib/utils'
import { TagLink } from '@/components/content/tag-link'
import { Callout } from '@/components/content/callout'

type MDXRendererComponents = Required<MDXRemoteProps['components']>

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

const CodeBlock = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const highlightedCodeHTML = highlight(children as string)

  return (
    <code
      className={cn(
        'relative block w-full rounded-xl bg-[#1a1b26] p-4 font-mono text-sm font-semibold',
        className
      )}
      {...props}
      dangerouslySetInnerHTML={{ __html: highlightedCodeHTML }}
    />
  )
}

const components: MDXRendererComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: Paragraph,
  blockquote: Blockquote,
  code: CodeBlock,
  a: ExternalLink,
  InternalLink,
  TagLink,
  Callout,
}

export function MDXContentRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
