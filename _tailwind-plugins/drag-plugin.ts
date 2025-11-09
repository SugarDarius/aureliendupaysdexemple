import plugin from 'tailwindcss/plugin'

export const dragPlugin = plugin(({ addUtilities }): void => {
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
