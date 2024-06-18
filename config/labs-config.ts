const isProd = process.env.NODE_ENV === 'production'

export const labsConfig = {
  liveblocksDrawingOnScreen: {
    roomId: isProd
      ? 'aureliendupaysdexemple-lab-liveblocks-drawing-on-screen-MIGfMA0GCS-qGSIb3DQEBAQ'
      : 'aureliendupaysdexemple-lab-liveblocks-drawing-on-screen-dev',
  },
}
export type LabsConfig = typeof labsConfig
