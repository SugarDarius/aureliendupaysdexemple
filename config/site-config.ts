import { env } from '@/config/env'

export const baseUrl = env.NEXT_PUBLIC_PROJECT_BASE_URL
export const siteConfig = {
  authors: [
    {
      name: 'SugarDarius',
      url: baseUrl,
    },
  ],
  creator: 'SugarDarius',
  description: 'Creative software engineer crafting interfaces and products.',
  socialLinks: {
    bluesky: {
      name: '@aureliendupaysdexemple.com',
      url: 'https://bsky.app/profile/aureliendupaysdexemple.com',
    },
    github: {
      name: 'SugarDarius',
      url: 'https://github.com/SugarDarius',
    },
    linkedin: {
      name: 'Aurélien Dupays Dexemple',
      url: 'https://www.linkedin.com/in/aureliendupaysdexemple/',
    },
    twitter: {
      name: '@azeldvin',
      url: 'https://twitter.com/azeldvin',
    },
  },
  title: 'Aurélien Dupays Dexemple',
}
export type SiteConfig = typeof siteConfig
