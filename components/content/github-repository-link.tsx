'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

export function GitHubRepositoryLink({
  href,
  className,
}: {
  href: string
  className?: string
}) {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      className={cn(
        'relative flex h-[30px] cursor-pointer flex-row items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1.5 pl-1.5 pr-2 text-xs font-semibold text-neutral-900 transition-colors ease-linear hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 max-md:py-1 max-md:pl-1 max-md:pr-1.5 max-md:text-[10px]',
        className
      )}
      aria-label='GitHub repository link'
    >
      <GitHubLogoIcon className='size-4' />
      See repository
    </a>
  )
}
