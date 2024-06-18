import { Liveblocks, type RoomUser } from '@liveblocks/node'
import { nanoid } from 'nanoid'

import { env } from '@/config/env'
import { labsConfig } from '@/config/labs-config'

import { getRandomUsername } from '@/lib/random-username'
import { getRandomAvatar } from '@/lib/random-avatar'
import { getRandomStrokeColor } from '@/lib/random-stroke-color'

const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY })

export async function POST(): Promise<Response> {
  const userId = nanoid(16)

  let users: RoomUser[] = []
  let roomExists = true

  try {
    const activeUsers = await liveblocks.getActiveUsers(
      labsConfig.liveblocksDrawingOnScreen.roomId
    )
    users = activeUsers.data
  } catch (err) {
    console.error(err)
    roomExists = false
  }

  if (!roomExists) {
    await liveblocks.createRoom(labsConfig.liveblocksDrawingOnScreen.roomId, {
      defaultAccesses: ['room:read', 'room:presence:write'],
    })
  }

  const [pickedAvatars, pickedStrokeColors] = users.reduce<
    [string[], string[]]
  >(
    (acc, current) => {
      acc[0].push(current.info.avatarSrc)
      acc[1].push(current.info.strokeColor)

      return acc
    },
    [[], []]
  )

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
