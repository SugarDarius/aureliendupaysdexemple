import { Liveblocks } from '@liveblocks/node'
import { nanoid } from 'nanoid'

import { env } from '@/config/env'
import { labsConfig } from '@/config/labs-config'

import { getRandomUsername } from '@/lib/random-username'
import { getRandomAvatar } from '@/lib/random-avatar'
import { getRandomStrokeColor } from '@/lib/random-stroke-color'

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY })

export async function POST(): Promise<Response> {
  let isRoomExists = true

  let pickedAvatars: string[] = []
  let pickedStrokeColors: string[] = []

  try {
    const room = await liveblocks.getRoom(
      labsConfig.liveblocksDrawingOnScreen.roomId
    )
    const activeUsers = await liveblocks.getActiveUsers(room.id)

    const pickedItems = activeUsers.data.reduce<[string[], string[]]>(
      (acc, current) => {
        acc[0].push(current.info.avatarSrc)
        acc[1].push(current.info.strokeColor)

        return acc
      },
      [[], []]
    )

    pickedAvatars = pickedItems[0]
    pickedStrokeColors = pickedItems[1]
  } catch {
    isRoomExists = false
  }

  if (!isRoomExists) {
    await liveblocks.createRoom(labsConfig.liveblocksDrawingOnScreen.roomId, {
      defaultAccesses: ['room:read', 'room:presence:write'],
    })
  }

  const userId = nanoid(16)
  const username = getRandomUsername()
  const avatarSrc = getRandomAvatar(pickedAvatars)
  const strokeColor = getRandomStrokeColor(pickedStrokeColors)

  const { body, status } = await liveblocks.identifyUser(userId, {
    userInfo: {
      username,
      avatarSrc,
      strokeColor,
    },
  })

  return new Response(body, { status })
}
