import { pick } from '@/lib/utils'

const strokeColors = [
  '#E57373',
  '#9575CD',
  '#4FC3F7',
  '#81C784',
  '#FFF176',
  '#FF8A65',
  '#F06292',
  '#7986CB',
]

export function getRandomStrokeColor(): string {
  return pick(strokeColors)
}
