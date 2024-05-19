import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PROJECT_BASE_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN: z.string(),
  },
  server: {
    GITHUB_GRAPHQL_API_URL: z.string().url(),
    GITHUB_CONTRIBUTIONS_READER_TOKEN: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PROJECT_BASE_URL: process.env.NEXT_PUBLIC_PROJECT_BASE_URL,
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
    GITHUB_GRAPHQL_API_URL: process.env.GITHUB_GRAPHQL_API_URL,
    GITHUB_CONTRIBUTIONS_READER_TOKEN:
      process.env.GITHUB_CONTRIBUTIONS_READER_TOKEN,
  },
})
