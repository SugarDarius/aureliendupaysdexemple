import { cn } from '@/lib/utils'

export const TagLink = ({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={cn(
      'inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100',
      className
    )}
    {...props}
  >
    {children}
  </a>
)
