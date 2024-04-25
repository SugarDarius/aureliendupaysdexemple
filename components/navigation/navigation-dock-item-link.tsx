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

const itemLinkVariants = cva(
  'flex flex-col items-center justify-center data-[active]:bg-accent',
  {
    variants: {
      variant: {
        default: 'rounded-xl',
        drawer: 'rounded-xl border shadow gap-2 w-full h-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

type NavigationDockItemLinkProps = {
  href: string
  active?: boolean
  className?: string
  children: React.ReactNode
} & VariantProps<typeof itemLinkVariants>

export const NavigationDockItemLink = forwardRef<
  HTMLAnchorElement,
  NavigationDockItemLinkProps
>(({ href, active = false, className, variant, children }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        itemLinkVariants({ variant }),
        className
      )}
      data-active={active ? '' : undefined}
    >
      {children}
    </Link>
  )
})
NavigationDockItemLink.displayName = 'NavigationDockItemLink'

export const NavigationDockItemExternalLink = ({
  href,
  tooltipLabel,
  children,
}: {
  href: string
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
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent>{tooltipLabel}</TooltipContent>
    </Tooltip>
  )
}
