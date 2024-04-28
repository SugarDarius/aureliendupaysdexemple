import { siteConfig } from '@/config/site-config'
import { LinkedInSquareIcon } from '@/components/icons/linkedin-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'

export function LinkedInBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.linkedin.url}
      name='LinkedIn'
      accountName='Aurélien'
      icon={<LinkedInSquareIcon className='size-6' />}
    />
  )
}
