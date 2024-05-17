import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LOCAL_STORAGE_KEY = 'commands-suggestions-store'

type CommandsSuggestionsStore = {
  scores: Record<string, number>
  increaseScore: (commandName: string) => void
}

const useCommandsSuggestionsStore = create<CommandsSuggestionsStore>()(
  persist(
    (set, get) => ({
      scores: {},
      increaseScore: (commandName: string): void => {
        const scores = get().scores

        const score = scores[commandName]
        scores[commandName] = (score ?? 0) + 1

        const unsortedScores = Array.from(Object.entries(scores))
        const sortedScores = unsortedScores.sort((a, b) => b[1] - a[1])

        set({ scores: Object.fromEntries(sortedScores) })
      },
    }),
    { name: LOCAL_STORAGE_KEY }
  )
)

export function increaseScore(commandName: string): void {
  useCommandsSuggestionsStore.getState().increaseScore(commandName)
}

export function getHighestScoredCommands(size: number): string[] {
  const scores = useCommandsSuggestionsStore.getState().scores

  const keys = Array.from(Object.keys(scores))
  const commands = keys.slice(0, size)

  return commands
}
