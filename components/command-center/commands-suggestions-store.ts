import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LOCAL_STORAGE_KEY = 'commands-ranking-store'

type CommandsRankingStore = {
  scores: Record<string, number>
  increaseScore: (commandName: string) => void
}

const useCommandsRanking = create<CommandsRankingStore>()(
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

export function increaseCommandScore(commandName: string): void {
  useCommandsRanking.getState().increaseScore(commandName)
}

type CommandsSuggestionsStore = {
  commands: Map<string, JSX.Element>
  addCommand: (name: string, command: JSX.Element) => void
}

const useCommandsSuggestionsStore = create<CommandsSuggestionsStore>(
  (set, get) => ({
    commands: new Map<string, JSX.Element>(),
    addCommand: (name: string, command: JSX.Element): void => {
      const commands = get().commands
      commands.set(name, command)

      set({ commands })
    },
  })
)

export function addSuggestionCommand(name: string, command: JSX.Element): void {
  useCommandsSuggestionsStore.getState().addCommand(name, command)
}

export function getSuggestionsCommands(size: number): JSX.Element[] {
  const scores = useCommandsRanking.getState().scores
  const commands = useCommandsSuggestionsStore.getState().commands

  const keys = Array.from(Object.keys(scores))
  const topRankedCommandsNames = keys.slice(0, size)

  const suggestionsCommands: JSX.Element[] = []

  for (const commandName of topRankedCommandsNames) {
    const command = commands.get(commandName)
    if (command) {
      suggestionsCommands.push(command)
    }
  }

  return suggestionsCommands
}
