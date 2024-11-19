import { env } from '@/config/env'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL
export const siteConfig = {
  title: 'Aurélien Dupays Dexemple',
  description: 'Creative software engineer crafting interfaces and products.',
  socialLinks: {
    twitter: {
      url: 'https://twitter.com/azeldvin',
      name: '@azeldvin',
    },
    bluesky: {
      url: 'https://bsky.app/profile/aureliendupaysdexemple.com',
      name: '@aureliendupaysdexemple.com',
    },
    github: {
      url: 'https://github.com/SugarDarius',
      name: 'SugarDarius',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/aureliendupaysdexemple/',
      name: 'Aurélien Dupays Dexemple',
    },
  },
  authors: [
    {
      name: 'SugarDarius',
      url: baseUrl,
    },
  ],
  creator: 'SugarDarius',
}
export type SiteConfig = typeof siteConfig
