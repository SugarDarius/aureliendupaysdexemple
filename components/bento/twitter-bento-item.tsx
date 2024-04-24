import { siteConfig } from '@/config/site-config'
import { TwitterSquareIcon } from '@/components/icons/twitter-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'

export function TwitterBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.twitter.url}
      imgSrc='/tokyo.jpg'
      name='Twitter'
      accountName={siteConfig.socialLinks.twitter.name}
      icon={<TwitterSquareIcon className='size-6' />}
      variant='twitter'
    />
  )
}
