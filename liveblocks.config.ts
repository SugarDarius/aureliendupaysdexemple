import type { SVGPath } from '@/components/lab/drawing-canvas/svg-canvas-path'

type RoomEvent = {
  type: 'ADD_SVG_PATHS'
  paths: SVGPath[]
}

declare global {
  interface Liveblocks {
    RoomEvent: RoomEvent
  }
}
