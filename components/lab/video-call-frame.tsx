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
        'relative flex h-full max-h-full w-full flex-col gap-6 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 p-4',
        className
      )}
    >
      <div className='relative flex w-full flex-auto flex-row gap-4'>
        <div className='relative flex h-full flex-auto flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-800'>
          <div className='flex aspect-video h-auto w-full flex-col items-center justify-center'>
            {children ? children : <ImagePlaceholder className='w-1/2' />}
          </div>
        </div>
        <div className='flex h-full flex-none flex-col justify-between'>
          <Participant></Participant>
          <Participant></Participant>
          <Participant></Participant>
          <Participant></Participant>
        </div>
      </div>
      <div className='flex w-full flex-none flex-col gap-4'>
        <div className='flex w-full flex-row items-center justify-center gap-6'></div>
      </div>
    </div>
  )
}
