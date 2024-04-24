'use client'

import { ParticlesScene } from '@/components/particles/particles-scene'

export function ParticlesPageContent({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center'>
      <div className='absolute left-0 top-0 z-0 h-full w-full overflow-hidden'>
        <ParticlesScene />
      </div>
      <div className='z-10 flex flex-col items-center'>
        <div className='text-8xl font-extrabold tracking-tighter opacity-75 max-sm:text-5xl'>
          <h1 className='bg-gradient-to-r from-sky-200 to-sky-500 bg-clip-text text-transparent'>
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}
