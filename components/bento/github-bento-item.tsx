import { SocialBentoItem } from '@/components/bento/social-bento-item'
import { GitHubSquareIcon } from '@/components/icons/github-square-icon'
import { GitHubContributionsWidget } from '@/components/widgets/github-contributions-widget'
import { siteConfig } from '@/config/site-config'

export function GitHubBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.github.url}
      name='GitHub'
      accountName={siteConfig.socialLinks.github.name}
      icon={<GitHubSquareIcon className='size-6' />}
    >
      <GitHubContributionsWidget />
    </SocialBentoItem>
  )
}
