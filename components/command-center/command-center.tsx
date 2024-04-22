import { useRouter } from 'next/navigation'

import { useState } from 'react'
import useEvent from 'react-use-event-hook'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { NavigationItem } from '@/lib/navigation'

import { Button } from '@/components/ui/button'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { CommandIcon } from '@/components/icons/command-icon'

export function CommandCenter({
  navigationItems,
}: {
  navigationItems: NavigationItem[]
}) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const onButtonClick = useEvent((): void => {
    setOpen(true)
  })

  const handleSelectNavigationItem = useEvent((href: string): void => {
    setOpen(false)
    router.push(href)
  })

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              navigationMenuTriggerStyle(),
              'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent'
            )}
            onClick={onButtonClick}
          >
            <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Command center</TooltipContent>
      </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Navigation'>
            {navigationItems.map((navigationItem) => (
              <CommandItem
                key={navigationItem.name}
                value={navigationItem.name}
                onSelect={() => {
                  handleSelectNavigationItem(navigationItem.href)
                }}
              >
                <div className='flex h-full w-full flex-row items-center gap-2'>
                  <ArrowRightIcon className='h-4 w-4' />
                  {navigationItem.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
