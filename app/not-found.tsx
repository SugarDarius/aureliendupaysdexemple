import { ParticlesScene } from '@/components/particles/particles-scene'

export default function NotFoundPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center gap-0.5'>
      <div className='absolute left-0 top-0 z-0 h-full w-full overflow-hidden'>
        <ParticlesScene />
      </div>
      <div className='z-10 flex flex-col items-center'>
        <div className='text-8xl font-extrabold tracking-tighter opacity-75'>
          <h1 className='bg-gradient-to-r from-sky-200 to-sky-500 bg-clip-text text-transparent'>
            404
          </h1>
        </div>
        <p className='text-xl font-bold tracking-tight text-muted-foreground'>
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}
