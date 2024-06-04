import { cn } from '@/lib/utils'

function Header({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('flex w-full max-w-4xl flex-col gap-4', className)}>
      {children}
    </div>
  )
}

function Content({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex h-auto min-h-full w-full flex-col items-center gap-10 px-8 pb-24 pt-12 max-sm:px-4',
        className
      )}
    >
      {children}
    </div>
  )
}

function Root({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex h-auto min-h-full w-full flex-col items-center',
        className
      )}
    >
      {children}
    </div>
  )
}

export { Root as LabPage, Content as LabPageContent, Header as LabPageHeader }
