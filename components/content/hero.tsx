export function Hero({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <h1 className='bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-6xl font-extrabold tracking-tighter text-transparent'>
        {title}
      </h1>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  )
}
