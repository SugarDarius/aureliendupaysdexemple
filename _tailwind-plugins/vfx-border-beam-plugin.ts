import type { PluginAPI, Config } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

export const vfxBorderBeamPlugin = plugin(
  ({ matchUtilities, theme }: PluginAPI): void => {
    matchUtilities(
      {
        'vfx-border-beam-duration': (value: string) => ({
          '--tw-vfx-border-beam-duration': value,
        }),
      },
      {
        values: theme('vfxBorderBeamDuration'),
      }
    )

    matchUtilities(
      {
        'vfx-border-beam-delay': (value: string) => ({
          '--tw-vfx-border-beam-delay': value,
        }),
      },
      {
        values: theme('vfxBorderBeamDelay'),
      }
    )

    const colors = flattenColorPalette(theme('colors'))
    console.log(colors)

    matchUtilities(
      {
        'vfx-border-beam-color-from': (value: string) => ({
          '--tw-vfx-border-beam-color-from': value,
        }),
      },
      {
        values: {
          ...colors,
          DEFAULT: colors['sky-50'],
        },
        type: 'color',
      }
    )

    matchUtilities(
      {
        'vfx-border-beam-color-to': (value: string) => ({
          '--tw-vfx-border-beam-color-to': value,
        }),
      },
      {
        values: {
          ...colors,
          DEFAULT: colors['sky-500'],
        },
        type: 'color',
      }
    )

    matchUtilities(
      {
        'vfx-border-beam-width': (value: string) => ({
          '--tw-vfx-border-beam-width': value,
        }),
      },
      {
        values: theme('vfxBorderBeamWidth'),
      }
    )

    matchUtilities(
      {
        'vfx-border-beam-anchor': (value: string) => ({
          '--tw-vfx-border-beam-anchor': value,
        }),
      },
      {
        values: theme('vfxBorderBeamAnchor'),
      }
    )

    matchUtilities(
      {
        'vfx-border-beam-size': (value: string) => ({
          '--tw-vfx-border-beam-size': value,
        }),
      },
      {
        values: theme('vfxBorderBeamSize'),
      }
    )
  },
  {
    theme: {
      extend: {
        vfxBorderBeamDelay: ({
          theme,
        }: {
          theme: (path: string) => Config['theme']
        }) => ({
          ...theme('animationDelay'),
          DEFAULT: '0',
        }),
        vfxBorderBeamWidth: ({
          theme,
        }: {
          theme: (path: string) => Config['theme']
        }) => ({
          ...theme('borderWidth'),
          DEFAULT: '1px',
        }),
        vfxBorderBeamDuration: ({
          theme,
        }: {
          theme: (path: string) => Config['theme']
        }) => ({
          ...theme('animationDuration'),
        }),
        vfxBorderBeamAnchor: () => ({
          DEFAULT: '90',
          0: '0',
          10: '10',
          20: '20',
          30: '30',
          40: '40',
          50: '50',
          60: '60',
          70: '70',
          80: '80',
          90: '90',
          100: '100',
        }),
        vfxBorderBeamSize: ({
          theme,
        }: {
          theme: (path: string) => Config['theme']
        }) => ({
          DEFAULT: '8',
          ...theme('spacing'),
        }),
        animation: {
          'vfx-border-beam':
            'vfx-border-beam var(--tw-vfx-border-beam-duration) infinite linear',
        },
        keyframes: {
          'vfx-border-beam': {
            '100%': {
              'offset-distance': '100%',
            },
          },
        },
      },
    },
  }
)
