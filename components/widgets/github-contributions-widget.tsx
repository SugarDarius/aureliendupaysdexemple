'use server'

import { siteConfig } from '@/config/site-config'
import { getGitHubContributions } from '@/lib/github-widget'

export async function GitHubContributionsWidget() {
  const { contributionsPerDays } = await getGitHubContributions(
    siteConfig.socialLinks.github.name
  )
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='grid size-20 grid-cols-7 grid-rows-7 gap-0.5 rounded-xl border bg-stone-50 p-2 shadow-sm max-sm:size-14'>
        {contributionsPerDays.map((contributionsPerDay) => (
          <div
            key={contributionsPerDay.date}
            className='h-full w-full rounded-[1px]'
            style={{ backgroundColor: contributionsPerDay.color }}
          />
        ))}
      </div>
    </div>
  )
}
