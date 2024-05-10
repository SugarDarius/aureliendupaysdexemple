import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_PROJECT_BASE_URL: z.string().url(),
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PROJECT_BASE_URL: process.env.NEXT_PUBLIC_PROJECT_BASE_URL,
    NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_TOKEN,
  },
})
