import { toast } from 'sonner'
import { create } from 'zustand'

interface MagnifyingGlassStore {
  isActive: boolean
  toggle: () => void
}

export const useMagnifyingGlassStore = create<MagnifyingGlassStore>(
  (set, get) => ({
    isActive: false,
    toggle: (): void => {
      const nextIsActive = !get().isActive
      set({ isActive: nextIsActive })
    },
  }),
)

export function toggleMagnifyingGlass(): void {
  useMagnifyingGlassStore.getState().toggle()
}

useMagnifyingGlassStore.subscribe(({ isActive }): void => {
  toast.info(`Magnifying glass ${isActive ? 'activated' : 'deactivated'}!`, {
    closeButton: true,
    duration: 1000 * 2,
  })
})
