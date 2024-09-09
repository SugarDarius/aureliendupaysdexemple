const isProd = process.env.NODE_ENV === 'production'
const roomIdBase = 'aureliendupaysdexemple-lab-liveblocks-drawing-on-screen-'

export const labsConfig = {
  liveblocksDrawingOnScreen: {
    roomId: roomIdBase + (isProd ? 'MIGfMA0GCS-qGSIb3DQEBAQ' : 'dev'),
  },
}
export type LabsConfig = typeof labsConfig
