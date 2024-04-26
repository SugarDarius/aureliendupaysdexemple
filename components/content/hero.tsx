export function Hero({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <h1 className='text-6xl font-extrabold tracking-tighter'>{title}</h1>
      <p className='text-muted-foreground'>{description}</p>
    </div>
  )
}
