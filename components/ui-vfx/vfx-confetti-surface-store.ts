import { create } from 'zustand'
import type {
  TCanvasConfettiInstance,
  TCanvasConfettiAnimationOptions,
} from 'react-canvas-confetti/dist/types'

type VFXConfettiSurfaceStore = {
  confettiInstance: TCanvasConfettiInstance | null
  setInstance: (confetti: TCanvasConfettiInstance) => void
}

const useVFXConfettiSurfaceStore = create<VFXConfettiSurfaceStore>((set) => ({
  confettiInstance: null,
  setInstance: (confettiInstance: TCanvasConfettiInstance): void => {
    set({ confettiInstance })
  },
}))

export function setVFXConfettiSurfaceInstance(
  confetti: TCanvasConfettiInstance
): void {
  useVFXConfettiSurfaceStore.getState().setInstance(confetti)
}

const BASE_CONFETTI_COUNT = 200
const defaultOptions: TCanvasConfettiAnimationOptions = {
  origin: { y: 0.7 },
}

const makeShot = (
  confettiInstance: TCanvasConfettiInstance,
  particlesRatio: number,
  options: TCanvasConfettiAnimationOptions
): void => {
  confettiInstance({
    ...defaultOptions,
    ...options,
    particleCount: Math.floor(BASE_CONFETTI_COUNT * particlesRatio),
  })
}

export function fireVFXConfettiSurface(): void {
  const confettiInstance =
    useVFXConfettiSurfaceStore.getState().confettiInstance

  if (confettiInstance) {
    makeShot(confettiInstance, 0.25, {
      spread: 26,
      startVelocity: 55,
    })
    makeShot(confettiInstance, 0.2, {
      spread: 60,
    })
    makeShot(confettiInstance, 0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    makeShot(confettiInstance, 0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    makeShot(confettiInstance, 0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }
}
