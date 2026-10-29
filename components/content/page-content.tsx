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
          'flex h-auto min-h-full w-full max-w-5xl flex-col gap-8 px-6 pt-10 pb-32 sm:px-10 lg:px-12',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
