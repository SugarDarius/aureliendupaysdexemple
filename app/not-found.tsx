export default function NotFoundPage() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-0.5'>
      <div className='text-8xl font-extrabold tracking-tighter'>
        <h1 className='bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>
          404
        </h1>
      </div>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}
