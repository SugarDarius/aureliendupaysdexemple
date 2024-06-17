import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

type UserMeta = {
  id: string
  info: {
    username: string
    avatarSrc: string
    strokeColor: string
  }
}

type RoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

type Presence = {
  isDrawing: boolean
}

declare global {
  interface Liveblocks {
    UserMeta: UserMeta
    RoomEvent: RoomEvent
    Presence: Presence
  }
}
