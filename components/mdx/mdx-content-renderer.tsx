import React from 'react'

import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { clsx } from 'clsx'
import { highlight } from 'sugar-high'

import { cn, slugify } from '@/lib/utils'

import { VFXBackgroundDot } from '@/components/ui-vfx/vfx-background-dot'
import { TagLink } from '@/components/content/tag-link'
import { Callout } from '@/components/content/callout'

type MDXRendererComponents = Required<MDXRemoteProps['components']>

const createHeading = ({ level }: { level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const Heading = ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const slug = typeof children === 'string' ? slugify(children) : null

    const headingProps = slug ? { ...props, id: slug } : { ...props }
    const anchor = slug
      ? [
          React.createElement('a', {
            href: `#${slug}`,
            key: `anchor-${slug}`,
            className:
              'invisible absolute -ml-6 h-full w-[calc(100%+24px)] cursor-pointer pr-3 no-underline after:content-["#"] group-hover:visible',
          }),
        ]
      : []

    return React.createElement(
      `h${level}`,
      {
        ...headingProps,
        className: cn('relative', clsx({ group: slug !== null }), className),
      },
      anchor,
      children
    )
  }
  Heading.displayName = `Heading${level}`

  return Heading
}

const Heading1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 1 })
  return (
    <Heading
      className={cn(
        'mt-8 scroll-m-20 text-4xl font-extrabold tracking-tighter',
        className
      )}
      {...props}
    />
  )
}

const Heading2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 2 })
  return (
    <Heading
      className={cn(
        'mt-4 scroll-m-20 text-3xl font-bold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
}

const Heading3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 3 })
  return (
    <Heading
      className={cn(
        'mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
}

const Heading4 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 4 })

  return (
    <Heading
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
}

const Heading5 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 5 })
  return (
    <Heading
      className={cn(
        'mt-10 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
}

const Heading6 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const Heading = createHeading({ level: 6 })

  return (
    <Heading
      className={cn(
        'mt-12 scroll-m-20 text-base font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  )
}

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
        'relative mt-2 block w-full rounded-md bg-[#1a1b26] px-4 py-2 font-mono text-sm font-semibold',
        className
      )}
      {...props}
      dangerouslySetInnerHTML={{ __html: highlightedCodeHTML }}
    />
  )
}

const InlineCode = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      'relative w-max rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm',
      className
    )}
    {...props}
  />
)

const RoundedImage = ({ className, alt, ...props }: ImageProps) => (
  <div className='relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 p-8 dark:border-neutral-800 dark:bg-stone-900'>
    <VFXBackgroundDot />
    <Image alt={alt} {...props} className={cn('z-[2] rounded-lg', className)} />
  </div>
)

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
  RoundedImage,
  InlineCode,
}

export function MDXContentRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
