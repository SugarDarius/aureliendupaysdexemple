import { cn } from '@/lib/utils'

export const InlineLink = ({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={cn('font-bold underline-offset-2 hover:underline', className)}
  >
    {children}
  </a>
)
