import { Liveblocks } from '@liveblocks/node'
import { nanoid } from 'nanoid'

import { env } from '@/config/env'

import { getRandomUsername } from '@/lib/random-username'
import { getRandomAvatar } from '@/lib/random-avatar'
import { getRandomStrokeColor } from '@/lib/random-stroke-color'

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY })

export async function POST(): Promise<Response> {
  const userId = nanoid(16)

  const username = getRandomUsername()
  const avatarSrc = getRandomAvatar()
  const strokeColor = getRandomStrokeColor()

  const { body, status } = await liveblocks.identifyUser(userId, {
    userInfo: {
      username,
      avatarSrc,
      strokeColor,
    },
  })

  return new Response(body, { status })
}
