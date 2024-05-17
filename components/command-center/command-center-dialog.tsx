'use client'

import { useRouter } from 'next/navigation'

import { useMemo } from 'react'
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

import { cn, toUpperFirst, dasherize } from '@/lib/utils'
import { navigationItems } from '@/lib/navigation'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useMounted } from '@/hooks/use-mounted'

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

import {
  getHighestScoredCommands,
  increaseScore,
} from '@/components/command-center/commands-suggestions-store'

type CommandCenterDialogItemProps = {
  name: string
  searchValue?: string
  value: string
  onSelect: (name: string, value: string) => void
  className?: string
  children: React.ReactNode
}

const CommandCenterDialogItem = ({
  name,
  searchValue,
  value,
  onSelect,
  className,
  children,
}: CommandCenterDialogItemProps) => {
  const handleSelect = useEvent((): void => {
    onSelect(name, value)
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

const createCommandWithSuggestion = (
  name: string,
  props: Omit<CommandCenterDialogItemProps, 'name'> & { key?: string }
): ReturnType<typeof CommandCenterDialogItem> => {
  const key = dasherize(props.key ?? name)
  const suggestedValue = `${props.value}+suggested`
  const suggestedSearchValue = props.searchValue
    ? `${props.searchValue}+suggested`
    : undefined

  const commandSuggestion = (
    <CommandCenterDialogItem
      key={key + '-suggested'}
      name={name}
      {...props}
      searchValue={suggestedSearchValue}
      value={suggestedValue}
      onSelect={(name: string, value: string) => {
        props.onSelect(name, value.replace('+suggested', ''))
      }}
    />
  )
  commands.set(name, commandSuggestion)

  return <CommandCenterDialogItem key={key} name={name} {...props} />
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
  const mounted = useMounted()

  const execCommand = useEvent((name: string, command: () => void): void => {
    increaseScore(name)
    onExecCommand()
    command()
  })

  const handleSelectNavigation = useEvent(
    (name: string, href: string): void => {
      execCommand(name, (): void => {
        router.push(href)
      })
    }
  )

  const handleSelectSocialLink = useEvent((name: string, url: string): void => {
    execCommand(name, (): void => {
      window.open(url, '_blank')
    })
  })

  const handleSelectColorMode = useEvent(
    (name: string, colorMode: string): void => {
      execCommand(name, (): void => {
        setTheme(colorMode)
      })
    }
  )

  const handleSelectCopyCurrentURL = useEvent((name: string): void => {
    execCommand(name, (): void => {
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

  const handleSelectCreateQRCode = useEvent((name: string): void => {
    execCommand(name, (): void => {
      const currentURL = window.location.href
      onCreateQRCode(currentURL)
    })
  })

  const suggestionsCommands = useMemo(() => {
    if (mounted && open) {
      const topCommands = getHighestScoredCommands(5)
      const commandItems = topCommands.map(
        (commandName) => commands.get(commandName)!
      )

      return commandItems
    }

    return []
  }, [mounted, open])

  const [
    navigationCommands,
    actionsCommands,
    socialsCommands,
    colorModeCommands,
  ] = useMemo(
    () => [
      navigationItems.map((navigationItem) =>
        createCommandWithSuggestion('go-to-' + navigationItem.href, {
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
        createCommandWithSuggestion('copy-current-url', {
          value: 'copy current url',
          onSelect: handleSelectCopyCurrentURL,
          children: (
            <>
              <CopyIcon className='size-4' />
              Copy current URL
            </>
          ),
        }),
        createCommandWithSuggestion('create-qr-code', {
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
        createCommandWithSuggestion('linkedin', {
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
        createCommandWithSuggestion('github', {
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
        createCommandWithSuggestion('twitter', {
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
        createCommandWithSuggestion('light', {
          value: 'light',
          onSelect: handleSelectColorMode,
          children: (
            <>
              <SunIcon className='h-4 w-4' />
              Light
            </>
          ),
        }),
        createCommandWithSuggestion('dark', {
          value: 'dark',
          onSelect: handleSelectColorMode,
          children: (
            <>
              <MoonIcon className='h-4 w-4' />
              Dark
            </>
          ),
        }),
        createCommandWithSuggestion('system', {
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
        {suggestionsCommands.length > 0 ? (
          <CommandGroup heading='Suggestions'>
            {suggestionsCommands}
          </CommandGroup>
        ) : null}
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
