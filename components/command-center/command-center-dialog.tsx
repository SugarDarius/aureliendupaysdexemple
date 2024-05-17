'use client'

import { useRouter } from 'next/navigation'

import useEvent from 'react-use-event-hook'
import { useTheme } from 'next-themes'

import {
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  CopyIcon,
} from '@radix-ui/react-icons'

import { toast } from 'sonner'

import { siteConfig } from '@/config/site-config'

import { cn, toUpperFirst } from '@/lib/utils'
import { navigationItems } from '@/lib/navigation'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { TwitterLogoIcon } from '@/components/icons/twitter-logo-icon'
import { CommandIcon } from '@/components/icons/command-icon'
import { ReturnIcon } from '@/components/icons/return-icon'
import { useMemo } from 'react'

type CommandCenterDialogItemProps = {
  searchValue?: string
  value: string
  onSelect: (value: string) => void
  className?: string
  children: React.ReactNode
}

const CommandCenterDialogItem = ({
  searchValue,
  value,
  onSelect,
  className,
  children,
}: CommandCenterDialogItemProps) => {
  const handleSelect = useEvent((): void => {
    onSelect(value)
  })

  return (
    <CommandItem
      value={searchValue ?? value}
      onSelect={handleSelect}
      className={cn('items-center, gap-2', className)}
    >
      {children}
    </CommandItem>
  )
}

const commands = new Map<string, ReturnType<typeof CommandCenterDialogItem>>()

const createCommand = (
  name: string,
  { key, ...props }: CommandCenterDialogItemProps & { key?: string }
): ReturnType<typeof CommandCenterDialogItem> => {
  const command = <CommandCenterDialogItem key={key ?? name} {...props} />
  commands.set(name, command)

  return command
}

export function CommandCenterDialog({
  open,
  onOpenChange,
  onExecCommand,
  onCreateQRCode,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExecCommand: () => void
  onCreateQRCode: (currentURL: string) => void
}) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const [, copy] = useCopyToClipboard()

  const execCommand = useEvent((command: () => void): void => {
    onExecCommand()
    command()
  })

  const handleSelectNavigation = useEvent((href: string): void => {
    execCommand((): void => {
      router.push(href)
    })
  })

  const handleSelectSocialLink = useEvent((url: string): void => {
    execCommand((): void => {
      window.open(url, '_blank')
    })
  })

  const handleSelectColorMode = useEvent((colorMode: string): void => {
    execCommand((): void => {
      setTheme(colorMode)
    })
  })

  const handleSelectCopyCurrentURL = useEvent((): void => {
    execCommand((): void => {
      const currentURL = window.location.href

      copy(currentURL)
        .then((): void => {
          toast.success('Current URL copied!', {
            duration: 1000 * 2,
          })
        })
        .catch((): void => {
          toast.error(
            'Uh oh! Something went wrong while copying the current URL.',
            {
              closeButton: true,
              duration: 1000 * 2,
            }
          )
        })
    })
  })

  const handleSelectCreateQRCode = useEvent((): void => {
    execCommand((): void => {
      const currentURL = window.location.href
      onCreateQRCode(currentURL)
    })
  })

  const [
    navigationCommands,
    actionsCommands,
    socialsCommands,
    colorModeCommands,
  ] = useMemo(
    () => [
      navigationItems.map((navigationItem) =>
        createCommand('go-to-' + navigationItem.href, {
          key: navigationItem.href,
          searchValue: navigationItem.name,
          value: navigationItem.href,
          onSelect: handleSelectNavigation,
          children: (
            <>
              <ArrowRightIcon className='h-4 w-4' />
              Go to{' '}
              <span className='font-bold'>
                {toUpperFirst(navigationItem.label)}
              </span>
              <CommandShortcut>{navigationItem.shortcutLabel}</CommandShortcut>
            </>
          ),
        })
      ),
      [
        createCommand('copy-current-url', {
          value: 'copy current url',
          onSelect: handleSelectCopyCurrentURL,
          children: (
            <>
              <CopyIcon className='size-4' />
              Copy current URL
            </>
          ),
        }),
        createCommand('create-qr-code', {
          value: 'create qr code for current url',
          onSelect: handleSelectCreateQRCode,
          children: (
            <>
              <QrCodeIcon className='size-4' />
              Create QR code for current URL
            </>
          ),
        }),
      ],
      [
        createCommand('linkedin', {
          value: siteConfig.socialLinks.linkedin.url,
          searchValue: 'linkedin',
          onSelect: handleSelectSocialLink,
          children: (
            <>
              <LinkedInLogoIcon className='h-4 w-4' />
              LinkedIn
            </>
          ),
        }),
        createCommand('github', {
          value: siteConfig.socialLinks.github.url,
          searchValue: 'github',
          onSelect: handleSelectSocialLink,
          children: (
            <>
              <GitHubLogoIcon className='h-4 w-4' />
              GitHub
            </>
          ),
        }),
        createCommand('twitter', {
          value: siteConfig.socialLinks.twitter.url,
          searchValue: 'twitter',
          onSelect: handleSelectSocialLink,
          children: (
            <>
              <TwitterLogoIcon className='h-4 w-4' />
              Twitter (X)
            </>
          ),
        }),
      ],
      [
        createCommand('light', {
          value: 'light',
          onSelect: handleSelectColorMode,
          children: (
            <>
              <SunIcon className='h-4 w-4' />
              Light
            </>
          ),
        }),
        createCommand('dark', {
          value: 'dark',
          onSelect: handleSelectColorMode,
          children: (
            <>
              <MoonIcon className='h-4 w-4' />
              Dark
            </>
          ),
        }),
        createCommand('system', {
          value: 'system',
          onSelect: handleSelectColorMode,
          children: (
            <>
              <ComputerDesktopIcon className='h-4 w-4' />
              System
            </>
          ),
        }),
      ],
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Navigation'>{navigationCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Actions'>{actionsCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Social links'>{socialsCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Color mode'>{colorModeCommands}</CommandGroup>
      </CommandList>
      <div className='flex w-full flex-row items-center justify-between border-t p-2'>
        <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
        <div className='flex flex-row items-center gap-1.5'>
          <span className='text-xs leading-3'>Execute Command</span>
          <div className='flex flex-col items-center justify-center rounded-sm bg-neutral-300 p-1 dark:bg-neutral-800'>
            <ReturnIcon className='h-4 w-4 stroke-[1.5px] ' />
          </div>
        </div>
      </div>
    </CommandDialog>
  )
}
