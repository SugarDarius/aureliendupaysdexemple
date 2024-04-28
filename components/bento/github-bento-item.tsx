import { siteConfig } from '@/config/site-config'

import { GitHubSquareIcon } from '@/components/icons/github-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'
import { GitHubContributionsWidget } from '@/components/widgets/github-contributions-widget'

export function GitHubBentoItem({
  contributionsColors,
}: {
  contributionsColors: string[]
}) {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.github.url}
      name='GitHub'
      accountName={siteConfig.socialLinks.github.name}
      icon={<GitHubSquareIcon className='size-6' />}
    >
      <GitHubContributionsWidget contributionsColors={contributionsColors} />
    </SocialBentoItem>
  )
}
