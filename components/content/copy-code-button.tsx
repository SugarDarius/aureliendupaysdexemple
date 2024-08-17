'use client'

import { CopyIcon } from '@radix-ui/react-icons'
import useEvent from 'react-use-event-hook'

import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

export const CopyCodeButton = ({
  className,
  code,
}: {
  className?: string
  code: string
}) => {
  const [, copy] = useCopyToClipboard()
  const handleClick = useEvent((): void => {
    copy(code)
      .then((): void => {
        toast.success('Code copied to the clipboard!', {
          duration: 1000 * 2,
        })
      })
      .catch((): void => {
        toast.error(
          'Uh oh! Something went wrong while copying the code to the clipboard',
          {
            closeButton: true,
            duration: 1000 * 2,
          }
        )
      })
  })
  return (
    <Button
      className={cn('size-7', className)}
      size='icon'
      variant='ghost'
      onClick={handleClick}
    >
      <CopyIcon className='size-4' />
    </Button>
  )
}
