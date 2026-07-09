import { SocialBentoItem } from '@/components/bento/social-bento-item'
import { LinkedInSquareIcon } from '@/components/icons/linkedin-square-icon'
import { LinkedInChatWidget } from '@/components/widgets/linkedin-chat-widget'
import { siteConfig } from '@/config/site-config'

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
