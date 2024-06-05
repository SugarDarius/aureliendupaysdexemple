import { cn } from '@/lib/utils'
import { ImagePlaceholder } from '@/components/ui-helpers/image-placeholder'

const Participant = ({ children }: { children?: React.ReactNode }) => (
  <div className='relative flex size-[120px] rounded-lg bg-neutral-800'>
    <div className='absolute left-0 top-0 flex size-full flex-col items-center justify-center'>
      {children}
    </div>
    <div className='flex size-full flex-col'></div>
  </div>
)

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
        'relative flex h-full max-h-full w-full flex-col gap-6 bg-gradient-to-r from-indigo-500 to-blue-500 p-4',
        className
      )}
    >
      <div className='relative flex w-full flex-auto flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-800'>
        <div className='flex w-full flex-col'>
          {children ? children : <ImagePlaceholder className='aspect-video' />}
        </div>
      </div>
      <div className='flex w-full flex-none flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-center gap-6'>
          <Participant></Participant>
          <Participant></Participant>
          <Participant></Participant>
          <Participant></Participant>
        </div>
      </div>
    </div>
  )
}
