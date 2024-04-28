import { siteConfig } from '@/config/site-config'
import { GitHubSquareIcon } from '@/components/icons/github-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'

export function GitHubBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.github.url}
      name='GitHub'
      accountName={siteConfig.socialLinks.github.name}
      icon={<GitHubSquareIcon className='size-6' />}
    ></SocialBentoItem>
  )
}
