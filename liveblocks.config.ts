import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

type DrawingOnScreenRoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

type DrawingOnScreenPresence = {
  isDrawing: boolean
}

declare global {
  interface Liveblocks {
    RoomEvent: DrawingOnScreenRoomEvent
    Presence: DrawingOnScreenPresence
  }
}
