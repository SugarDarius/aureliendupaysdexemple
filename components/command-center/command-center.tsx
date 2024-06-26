'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useEvent from 'react-use-event-hook'
import { useHotkeys } from 'react-hotkeys-hook'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { VFXConfettiSurface } from '@/components/ui-vfx/vfx-confetti-surface'
import { CommandIcon } from '@/components/icons/command-icon'

import { CommandCenterDialog } from '@/components/command-center/command-center-dialog'
import { QRCodeDialog } from '@/components/command-center/qrcode-dialog'
import { KeyboardShortcutsDialog } from '@/components/command-center/keyboard-shortcuts-dialog'

export function CommandCenter({ className }: { className?: string }) {
  const pathname = usePathname()

  const [commandDialogOpen, setCommandDialogOpen] = useState<boolean>(false)

  const [qrcodeDialogOpen, setQRCodeDialogOpen] = useState<boolean>(false)
  const [qrcodeValue, setQRCodeValue] = useState<string>('')

  const [keyboardShortcutsDialogOpen, setKeyboardShortcutsDialogOpen] =
    useState<boolean>(false)

  useEffect(() => {
    setQRCodeDialogOpen(false)
  }, [pathname])

  useHotkeys(
    'meta+k',
    (): void => {
      setCommandDialogOpen(true)
    },
    {
      enabled:
        !commandDialogOpen && !qrcodeDialogOpen && !keyboardShortcutsDialogOpen,
    }
  )

  const handleButtonClick = useEvent((): void => {
    setCommandDialogOpen(true)
  })

  const handleExecCommand = useEvent((): void => {
    setCommandDialogOpen(false)
  })

  const handleCreateQRCode = useEvent((currentURL): void => {
    setQRCodeValue(currentURL)
    setQRCodeDialogOpen(true)
  })

  const handleOpenKeyboardShortcutsDialog = useEvent((): void => {
    setKeyboardShortcutsDialogOpen(true)
  })

  return (
    <div className='flex flex-col'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            className={cn(
              navigationMenuTriggerStyle(),
              'flex h-9 w-9 flex-col items-center justify-center rounded-full p-0 data-[active]:bg-accent',
              className
            )}
            onClick={handleButtonClick}
            aria-label='Command Center'
          >
            <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className='flex flex-row items-center gap-1'
          sideOffset={8}
        >
          <span>Command center</span>
          <span className='pointer-events-none flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium tracking-[2px] text-muted-foreground'>
            ⌘K
          </span>
        </TooltipContent>
      </Tooltip>
      <CommandCenterDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
        onExecCommand={handleExecCommand}
        createQRCode={handleCreateQRCode}
        openKeyboardShortcutsDialog={handleOpenKeyboardShortcutsDialog}
      />
      <QRCodeDialog
        open={qrcodeDialogOpen}
        value={qrcodeValue}
        onOpenChange={setQRCodeDialogOpen}
      />
      <KeyboardShortcutsDialog
        open={keyboardShortcutsDialogOpen}
        onOpenChange={setKeyboardShortcutsDialogOpen}
      />
      <VFXConfettiSurface />
    </div>
  )
}
