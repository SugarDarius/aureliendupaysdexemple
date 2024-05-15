import { useState } from 'react'
import useEvent from 'react-use-event-hook'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = useEvent(async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)

      return true
    } catch {
      setCopiedText(null)
      return false
    }
  })

  return [copiedText, copy] as const
}
