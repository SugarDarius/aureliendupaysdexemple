import type { PluginAPI } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

import svgToDataUri from 'mini-svg-data-uri'

export const vfxBackgroundsPlugin = plugin(
  ({ addUtilities, matchUtilities, theme }: PluginAPI): void => {
    matchUtilities(
      {
        'vfx-bg-dot': (value: string) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
          )}")`,
        }),
      },
      {
        values: flattenColorPalette(theme('backgroundColor')),
        type: 'color',
      }
    )

    addUtilities({
      '.vfx-bg-retro-grid-light': {
        backgroundImage:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.28) 1px, transparent 0), linear-gradient(180deg, rgba(0, 0, 0, 0.28) 1px, transparent 0)',
      },
      '.vfx-bg-retro-grid-dark': {
        backgroundImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 0), linear-gradient(180deg, rgba(255, 255, 255, 0.28) 1px, transparent 0)',
      },
    })
  },
  {
    theme: {
      extend: {
        animation: {
          'vfx-retro-grid': 'vfx-retro-grid 35s infinite linear',
        },
        keyframes: {
          'vfx-retro-grid': {
            '0%': { transform: 'translateY(-50%)' },
            '100%': { transform: 'translateY(0)' },
          },
        },
      },
    },
  }
)
