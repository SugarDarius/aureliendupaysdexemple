import { clsx } from 'clsx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import NextLink from 'next/link'
import React from 'react'
import { highlight } from 'sugar-high'

import { Callout } from '@/components/content/callout'
import { CopyCodeButton } from '@/components/content/copy-code-button'
import { TagLink } from '@/components/content/tag-link'
import { cn, slugify } from '@/lib/utils'

type MDXRendererComponents = Required<MDXRemoteProps['components']>

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
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
            className:
              'invisible absolute -ml-6 h-full w-full cursor-pointer pr-3 no-underline after:content-["#"] group-hover:visible max-lg:hidden',
            href: `#${slug}`,
            key: `anchor-${slug}`,
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
      children,
    )
  }
  Heading.displayName = `Heading${level}`

  return Heading
}

const Link = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) => {
  const href = props.href ?? ''

  if (href.startsWith('/')) {
    return (
      <NextLink
        href={href}
        aria-label='internal-link'
        {...props}
        transitionTypes={['fade']}
      />
    )
  }

  if (href.startsWith('#')) {
    return <a aria-label='anchor-link' {...props} />
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const CodeBlock = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const highlightedCodeHTML = highlight(children as string)

  return (
    <>
      <code
        {...props}
        dangerouslySetInnerHTML={{ __html: highlightedCodeHTML }}
      />
      <CopyCodeButton
        className='absolute top-2.5 right-2.5'
        code={children as string}
      />
    </>
  )
}

const InlineCode = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      'bg-muted relative w-max rounded px-[0.3rem] py-[0.2rem] font-mono text-sm before:hidden after:hidden',
      className,
    )}
    {...props}
  />
)

const RoundedImage = ({ className, alt, ...props }: ImageProps) => (
  <Image alt={alt} {...props} className={cn('z-2 rounded-lg', className)} />
)

const RoundedVideo = ({ src }: { src: string }) => (
  <div className='relative flex h-auto w-full flex-col overflow-hidden rounded-xl border'>
    <div className='absolute top-0 left-0 h-full w-full overflow-hidden bg-neutral-700 dark:bg-neutral-800'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-900 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]' />
    </div>
    <video
      className='z-2 my-0! aspect-video w-full'
      playsInline
      muted
      autoPlay
      preload='none'
      loop
    >
      <source src={src} type='video/webm' />
    </video>
  </div>
)

const components: MDXRendererComponents = {
  Callout,
  InlineCode,
  RoundedImage,
  RoundedVideo,
  TagLink,
  a: Link,
  code: CodeBlock,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
}

export function MDXContentRenderer({ source }: { source: string }) {
  return (
    <article className='prose dark:prose-invert prose-a:underline-offset-4 prose-pre:relative prose-pre:bg-[#1B293D] max-w-none'>
      <MDXRemote source={source} components={components} />
    </article>
  )
}
