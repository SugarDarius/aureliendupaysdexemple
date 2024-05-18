import Image from 'next/image'
import { cn } from '@/lib/utils'

const ChatBubble = ({
  src,
  alt,
  className,
  children,
}: {
  src: string
  alt: string
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn(
      'flex h-7 w-auto flex-row items-center gap-1.5 rounded-full bg-neutral-600 pl-1.5 pr-2',
      className
    )}
  >
    <Image src={src} width={16} height={16} alt={alt} priority />
    <span className='mt-px text-xs font-semibold  text-background dark:text-foreground'>
      {children}
    </span>
  </div>
)

export function LinkedInChatWidget() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-4/5 flex-col gap-2 max-sm:w-full max-sm:scale-[0.85]'>
        <div className='flex flex-row items-center'>
          <ChatBubble
            src='/medias/images/memoji-avatar.webp'
            alt='linkedin memoji'
          >
            Let&apos;s connect?
          </ChatBubble>
        </div>
        <div className='flex flex-row items-center justify-end'>
          <ChatBubble
            src='/medias/images/aureliendupaysdexemple-logo.webp'
            alt='logo'
            className='bg-sky-700'
          >
            Sure! 🙂
          </ChatBubble>
        </div>
      </div>
    </div>
  )
}
