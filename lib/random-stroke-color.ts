import { pick, unique } from '@/lib/utils'

const strokeColors = [
  '#fb7185',
  '#a855f7',
  '#bfdbfe',
  '#a3e635',
  '#fde68a',
  '#ef4444',
  '#ec4899',
  '#6366f1',
  '#fb923c',
  '#f59e0b',
]

export function getRandomStrokeColor(
  excludedStrokeColors: string[] = []
): string {
  return pick(unique(strokeColors, excludedStrokeColors))
}
