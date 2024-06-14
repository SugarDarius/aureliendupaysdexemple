import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

type DrawingOnScreenRoomEvent = {
  type: 'ADD_SVG_PATHS'
  svgPaths: SVGPath[]
}

declare global {
  interface Liveblocks {
    RoomEvent: DrawingOnScreenRoomEvent
  }
}
