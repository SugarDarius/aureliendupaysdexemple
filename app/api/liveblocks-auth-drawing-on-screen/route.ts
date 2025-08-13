import { createSafeRouteHandler } from '@sugardarius/anzen'
import { Liveblocks } from '@liveblocks/node'
import { nanoid } from 'nanoid'

import { env } from '@/config/env'
import { labsConfig } from '@/config/labs-config'

import { getRandomUsername } from '@/lib/random-username'
import { getRandomAvatar } from '@/lib/random-avatar'
import { getRandomStrokeColor } from '@/lib/random-stroke-color'

const roomId = labsConfig.liveblocksDrawingOnScreen.roomId
const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY })

export const POST = createSafeRouteHandler(
  {
    id: 'api/liveblocks-auth-drawing-on-screen',
  },
  async () => {
    const userId = nanoid(16)
    const username = getRandomUsername()
    const avatarSrc = getRandomAvatar()
    const strokeColor = getRandomStrokeColor()

    const session = liveblocks.prepareSession(`calling-user-${userId}`, {
      userInfo: {
        username,
        avatarSrc,
        strokeColor,
      },
    })

    session.allow(roomId, ['room:read', 'room:presence:write'])
    const { body, status } = await session.authorize()

    return new Response(body, { status })
  }
)
