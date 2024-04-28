import { siteConfig } from '@/config/site-config'

import { TwitterSquareIcon } from '@/components/icons/twitter-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'
import { TwitterPostWidget } from '@/components/widgets/twitter-post-widget'

export function TwitterBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.twitter.url}
      name='Twitter'
      accountName={siteConfig.socialLinks.twitter.name}
      icon={<TwitterSquareIcon className='size-6' />}
    >
      <TwitterPostWidget />
    </SocialBentoItem>
  )
}
