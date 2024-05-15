import type { PluginAPI } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'

export const dragPlugin = plugin(({ addUtilities }: PluginAPI): void => {
  addUtilities({
    '.user-drag-none': {
      '-webkit-user-drag': 'none',
      '-khtml-user-drag': 'none',
      '-moz-user-drag': 'none',
      '-o-user-drag': 'none',
      'user-drag': 'none',
    },
  })
})
