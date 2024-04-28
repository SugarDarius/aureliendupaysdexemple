import Image from 'next/image'

export function LinkedInChatWidget() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-[80%] flex-col gap-1 max-sm:w-full'>
        <div className='itesm-center flex flex-row'>
          <div className='flex w-auto flex-row items-center gap-1 rounded-full bg-neutral-600 py-1.5 pl-1.5 pr-2'>
            <Image
              src='/linkedin-contact-photo.png'
              width={16}
              height={16}
              alt='logo'
              priority
            />
            <span className='text-xs font-semibold  text-background dark:text-foreground'>
              Let&apos;s connect?
            </span>
          </div>
        </div>
        <div className='flex flex-row items-center justify-end'>
          <div className='flex w-auto flex-row items-center gap-1 rounded-full bg-sky-500 py-1.5 pl-1.5 pr-2'>
            <Image
              src='/aureliendupaysdexemple-logo.png'
              width={16}
              height={16}
              alt='logo'
              priority
            />
            <span className='text-xs font-semibold text-background dark:text-foreground'>
              Sure!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
