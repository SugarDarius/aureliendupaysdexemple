import { VFXBackgroundRetroGrid } from '@/components/ui-vfx/vfx-background-retro-grid'

export function PageHero({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className='relative flex w-full flex-col gap-1'>
      <h1 className='bg-gradient-to-b from-sky-200 to-sky-500 bg-clip-text text-6xl font-extrabold tracking-tighter text-transparent opacity-75'>
        {title}
      </h1>
      <p className='text-muted-foreground'>{description}</p>
      <VFXBackgroundRetroGrid />
    </div>
  )
}
