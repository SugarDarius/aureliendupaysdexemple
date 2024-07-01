'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const variants = cva(
  'flex flex-col items-center justify-center data-[active]:bg-accent',
  {
    variants: {
      variant: {
        default: 'rounded-xl',
        drawer: 'h-full w-full gap-1 rounded-xl border shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
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
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          variants({ variant, className })
        )}
        data-active={active ? '' : undefined}
        onClick={onClick}
        aria-label={name}
      >
        {children}
      </Link>
    )
  }
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
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            navigationMenuTriggerStyle(),
            'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
          )}
          aria-label={name}
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>{tooltipLabel}</TooltipContent>
    </Tooltip>
  )
}
