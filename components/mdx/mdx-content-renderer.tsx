import React from 'react'

import NextLink from 'next/link'
import Image, { type ImageProps } from 'next/image'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { clsx } from 'clsx'
import { highlight } from 'sugar-high'

import { cn, slugify } from '@/lib/utils'

import { TagLink } from '@/components/content/tag-link'
import { Callout } from '@/components/content/callout'
import { CopyCodeButton } from '@/components/content/copy-code-button'

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
            href: `#${slug}`,
            key: `anchor-${slug}`,
            className:
              'invisible absolute -ml-6 h-full w-full cursor-pointer pr-3 no-underline after:content-["#"] group-hover:visible max-lg:hidden',
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

const Link = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const href = props.href ?? ''

  if (href.startsWith('/')) {
    return <NextLink href={href} aria-label='internal-link' {...props} />
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
    <React.Fragment>
      <code
        {...props}
        dangerouslySetInnerHTML={{ __html: highlightedCodeHTML }}
      />
      <CopyCodeButton
        className='absolute right-2.5 top-2.5'
        code={children as string}
      />
    </React.Fragment>
  )
}

const InlineCode = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      'relative w-max rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm before:hidden after:hidden',
      className
    )}
    {...props}
  />
)

const RoundedImage = ({ className, alt, ...props }: ImageProps) => (
  <Image alt={alt} {...props} className={cn('z-[2] rounded-lg', className)} />
)

const RoundedVideo = ({ src }: { src: string }) => (
  <div className='relative flex h-auto w-full flex-col overflow-hidden rounded-xl border'>
    <div className='absolute left-0 top-0 h-full w-full overflow-hidden bg-neutral-700 dark:bg-neutral-800'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />
    </div>
    <video
      className='z-[2] !my-0 aspect-video w-full'
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
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: CodeBlock,
  a: Link,
  TagLink,
  Callout,
  InlineCode,
  RoundedImage,
  RoundedVideo,
}

export function MDXContentRenderer({ source }: { source: string }) {
  return (
    <article className='prose max-w-none dark:prose-invert prose-a:underline-offset-4 prose-pre:relative prose-pre:bg-[#1B293D]'>
      <MDXRemote source={source} components={components} />
    </article>
  )
}
