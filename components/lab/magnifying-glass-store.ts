import { create } from 'zustand'

type MagnifyingGlassStore = {
  isActive: boolean
  toggle: () => void
}

export const useMagnifyingGlassStore = create<MagnifyingGlassStore>(
  (set, get) => ({
    isActive: false,
    toggle: (): void => {
      const isActive = get().isActive
      set({ isActive: !isActive })
    },
  })
)

export function toggleMagnifyingGlass(): void {
  useMagnifyingGlassStore.getState().toggle()
}
