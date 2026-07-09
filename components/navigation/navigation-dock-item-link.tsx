'use client'

import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { forwardRef } from 'react'

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const variants = cva(
  'flex flex-col items-center justify-center data-[active]:bg-accent',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'rounded-xl',
        drawer: 'h-full w-full gap-1 rounded-xl border shadow',
      },
    },
  },
)

type NavigationDockItemLinkProps = {
  href: string
  name: string
  active?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
} & VariantProps<typeof variants>

export const NavigationDockItemLink = forwardRef<
  HTMLAnchorElement,
  NavigationDockItemLinkProps
>(
  (
    { href, name, active = false, className, variant, onClick, children },
    ref,
  ) => (
    <Link
      ref={ref}
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        variants({ variant }),
        'size-auto',
        className,
      )}
      data-active={active ? '' : undefined}
      onClick={onClick}
      aria-label={name}
      transitionTypes={['fade']}
    >
      {children}
    </Link>
  ),
)
NavigationDockItemLink.displayName = 'NavigationDockItemLink'

export const NavigationDockItemExternalLink = ({
  href,
  name,
  tooltipLabel,
  children,
}: {
  href: string
  name: string
  tooltipLabel: string
  children: React.ReactNode
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          navigationMenuTriggerStyle(),
          'data-active:bg-accent flex h-9 w-9 flex-col items-center justify-center rounded-full p-0',
        )}
        aria-label={name}
      >
        {children}
      </a>
    </TooltipTrigger>
    <TooltipContent sideOffset={8}>{tooltipLabel}</TooltipContent>
  </Tooltip>
)
