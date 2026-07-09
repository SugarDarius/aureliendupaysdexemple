import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN: z.string(),
    NEXT_PUBLIC_PROJECT_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    GITHUB_CONTRIBUTIONS_READER_TOKEN:
      process.env.GITHUB_CONTRIBUTIONS_READER_TOKEN,
    GITHUB_GRAPHQL_API_URL: process.env.GITHUB_GRAPHQL_API_URL,
    LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY,
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
    NEXT_PUBLIC_PROJECT_BASE_URL: process.env.NEXT_PUBLIC_PROJECT_BASE_URL,
  },
  server: {
    GITHUB_CONTRIBUTIONS_READER_TOKEN: z.string(),
    GITHUB_GRAPHQL_API_URL: z.string().url(),
    LIVEBLOCKS_SECRET_KEY: z.string(),
  },
})
