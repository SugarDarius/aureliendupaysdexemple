import { cn } from '@/lib/utils'

export const InlineLink = ({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={cn('font-bold underline-offset-2 hover:underline', className)}
    {...props}
  >
    {children}
  </a>
)
