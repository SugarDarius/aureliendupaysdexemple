import { cn } from '@/lib/utils'

export function PageContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className='relative flex h-auto min-h-full w-full flex-col items-center'>
      <div
        className={cn(
          'flex h-auto min-h-full w-full max-w-4xl flex-col gap-10 px-12 pb-24 pt-12 max-sm:px-4 min-[1025px]:px-0',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
