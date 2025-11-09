export const flattenColorPalette = (
  palette: Record<string, unknown> | undefined
): Record<string, string> => {
  const result: Record<string, string> = {}

  if (!palette) {
    return result
  }

  const traverse = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      const key = path.length > 0 ? path : 'DEFAULT'
      result[key] = value
      return
    }

    if (typeof value !== 'object' || value === null) {
      return
    }

    for (const [childKey, childValue] of Object.entries(
      value as Record<string, unknown>
    )) {
      const nextPath =
        childKey === 'DEFAULT'
          ? path
          : path.length > 0
            ? `${path}-${childKey}`
            : childKey
      traverse(childValue, nextPath)
    }
  }

  for (const [key, value] of Object.entries(palette)) {
    const initialPath = key === 'DEFAULT' ? '' : key
    traverse(value, initialPath)
  }

  return result
}
