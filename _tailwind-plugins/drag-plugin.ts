import plugin from 'tailwindcss/plugin'

const dragPlugin = plugin(({ addUtilities }): void => {
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

export default dragPlugin
