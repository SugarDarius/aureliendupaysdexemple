'use client'

import Link from 'next/link'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

type NavigationDockItemLinkProps = {
  href: string
  active?: boolean
  children: React.ReactNode
}

export const NavigationDockItemLink = forwardRef<
  HTMLAnchorElement,
  NavigationDockItemLinkProps
>(({ href, active = false, children }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        'flex flex-col items-center justify-center rounded-xl data-[active]:bg-accent'
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
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
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
  )
}
