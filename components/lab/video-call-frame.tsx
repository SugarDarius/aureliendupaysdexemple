import { cn } from '@/lib/utils'
import { ImagePlaceholder } from '@/components/ui-helpers/image-placeholder'
export function VideoCallFrame({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col gap-6 bg-gradient-to-r from-violet-200 to-pink-200 p-4',
        className
      )}
    >
      <div className='flex w-full flex-auto flex-col items-center justify-center'>
        <div className='flex aspect-video w-full flex-col overflow-hidden rounded-md bg-stone-700'>
          {children ? children : <ImagePlaceholder className='size-full' />}
        </div>
      </div>
      <div className='flex w-full flex-none flex-col'></div>
    </div>
  )
}
