import { create } from 'zustand'

type MagnifyingGlassStore = {
  isActive: boolean
  setActiveState: (isActive: boolean) => void
}

export const useMagnifyingGlassStore = create<MagnifyingGlassStore>((set) => ({
  isActive: false,
  setActiveState: (isActive: boolean): void => {
    set({ isActive })
  },
}))

export function enableMagnifyingGlass(): void {
  useMagnifyingGlassStore.getState().setActiveState(true)
}

export function disableMagnifyingGlass(): void {
  useMagnifyingGlassStore.getInitialState().setActiveState(false)
}
