import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

import { CommandIcon } from '@/components/icons/command-icon'

export function CommandCenter() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        variant='ghost'
        className={cn(
          navigationMenuTriggerStyle(),
          'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
        )}
      >
        <CommandIcon className='h-4 w-4' />
      </Button>
    </>
  )
}
