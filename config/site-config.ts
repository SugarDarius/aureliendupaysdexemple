import { baseUrl } from '@/app/sitemap'
export const siteConfig = {
  title: 'Aurélien Dupays Dexemple',
  description:
    "Hello, I'm Aurélien Dupays Dexemple and this is my personal website.",
  socialLinks: {
    twitter: {
      url: 'https://twitter.com/azeldvin',
      name: '@azeldvin',
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
