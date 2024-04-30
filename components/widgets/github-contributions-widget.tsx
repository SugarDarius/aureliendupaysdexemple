export function GitHubContributionsWidget({
  contributionsColors,
}: {
  contributionsColors: string[]
}) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='grid size-20 grid-cols-7 grid-rows-7 gap-0.5 rounded-xl border bg-foreground p-2 shadow-sm max-sm:size-14'>
        {contributionsColors.map((contributionColor, index) => (
          <div
            key={index}
            className='h-full w-full rounded-[1px]'
            style={{ backgroundColor: contributionColor }}
          />
        ))}
      </div>
    </div>
  )
}
