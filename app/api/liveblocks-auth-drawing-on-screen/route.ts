import { Liveblocks } from '@liveblocks/node'
import { createSafeRouteHandler } from '@sugardarius/anzen'
import { nanoid } from 'nanoid'

import { env } from '@/config/env'
import { labsConfig } from '@/config/labs-config'
import { getRandomAvatar } from '@/lib/random-avatar'
import { getRandomStrokeColor } from '@/lib/random-stroke-color'
import { getRandomUsername } from '@/lib/random-username'

const { roomId } = labsConfig.liveblocksDrawingOnScreen
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
        avatarSrc,
        strokeColor,
        username,
      },
    })

    session.allow(roomId, ['room:read', 'room:presence:write'])
    const { body, status } = await session.authorize()

    return new Response(body, { status })
  },
)
