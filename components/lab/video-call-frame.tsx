import { cn } from '@/lib/utils'
export function VideoCallFrame({
  className,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex min-h-full w-full flex-col bg-gradient-to-r from-violet-200 to-pink-200 p-2',
        className
      )}
    ></div>
  )
}
