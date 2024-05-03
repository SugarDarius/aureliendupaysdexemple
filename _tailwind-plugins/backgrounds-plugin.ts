import type { PluginAPI } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

import svgToDataUri from 'mini-svg-data-uri'

export const backgroundsPlugin = plugin(
  ({ matchUtilities, theme }: PluginAPI): void => {
    matchUtilities(
      {
        'bg-dot': (value: string) => ({
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
  }
)
