import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LOCAL_STORAGE_KEY = 'commands-suggestions-store'

type CommandsSuggestionsStore = {
  scores: Map<string, number>
  increaseScore: (commandName: string) => void
}

export const useCommandsSuggestionsStore = create<CommandsSuggestionsStore>()(
  persist(
    (set, get) => ({
      scores: new Map(),
      increaseScore: (commandName: string): void => {
        const { scores } = get()
        const score = scores.get(commandName)
        if (score) {
          scores.set(commandName, score + 1)
        }
        scores.set(commandName, 0)

        const unsortedScores = Array.from(scores.entries())
        const sortedScores = unsortedScores.sort((a, b) => b[1] - a[1])

        set({ scores: new Map(sortedScores) })
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

  const keys = Array.from(scores.keys())
  const commands = keys.slice(0, size - 1)

  return commands
}
