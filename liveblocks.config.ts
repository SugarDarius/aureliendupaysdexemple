import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

type DrawingOnScreenUserMeta = {
  id: string
  info: {
    username: string
    avatarSrc: string
    strokeColor: string
  }
}

type DrawingOnScreenRoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

type DrawingOnScreenPresence = {
  isDrawing: boolean
}

declare global {
  interface Liveblocks {
    UserMeta: DrawingOnScreenUserMeta
    RoomEvent: DrawingOnScreenRoomEvent
    Presence: DrawingOnScreenPresence
  }
}
