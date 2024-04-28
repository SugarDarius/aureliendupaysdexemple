import { siteConfig } from '@/config/site-config'

import { LinkedInSquareIcon } from '@/components/icons/linkedin-square-icon'
import { SocialBentoItem } from '@/components/bento/social-bento-item'
import { LinkedInChatWidget } from '@/components/widgets/linkedin-chat-widget'

export function LinkedInBentoItem() {
  return (
    <SocialBentoItem
      href={siteConfig.socialLinks.linkedin.url}
      name='LinkedIn'
      accountName='Aurélien'
      icon={<LinkedInSquareIcon className='size-6' />}
    >
      <LinkedInChatWidget />
    </SocialBentoItem>
  )
}
