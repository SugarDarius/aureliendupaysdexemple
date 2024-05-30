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
  useCommandState,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

import { TwitterLogoIcon } from '@/components/icons/twitter-logo-icon'
import { CommandIcon } from '@/components/icons/command-icon'
import { ReturnIcon } from '@/components/icons/return-icon'
import { SelectIcon } from '@/components/icons/select-icon'
import { ConfettiIcon } from '@/components/icons/confetti-icon'
import { KeyboardIcon } from '@/components/icons/keyboard-icon'

import {
  getHighestScoredCommands,
  increaseScore,
} from '@/components/command-center/commands-suggestions-store'
import { fireVFXConfettiSurface } from '@/components/ui-vfx/vfx-confetti-surface-store'

const FooterShortcut = ({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) => (
  <div className='flex flex-row items-center gap-1.5'>
    <span className='text-xs leading-3'>{name}</span>
    <div className='flex flex-col items-center justify-center rounded-sm bg-neutral-300 p-1 dark:bg-neutral-800'>
      {children}
    </div>
  </div>
)

const Footer = () => (
  <div className='flex w-full flex-row items-center justify-between border-t p-2'>
    <CommandIcon className='h-4 w-4 stroke-[1.5px]' />
    <div className='flex flex-row items-center gap-1.5'>
      <FooterShortcut name='Select'>
        <SelectIcon className='h-4 w-4 stroke-[1.5px]' />
      </FooterShortcut>
      <FooterShortcut name='Execute'>
        <ReturnIcon className='h-4 w-4 stroke-[1.5px]' />
      </FooterShortcut>
    </div>
  </div>
)

const ColorModeCommandItemContent = ({
  active = false,
  children,
}: {
  active?: boolean
  children: React.ReactNode
}) => (
  <div className='flex w-full flex-row items-center justify-between'>
    <div className='flex flex-row items-center gap-2'>{children}</div>
    {active ? <Badge variant='secondary'>active</Badge> : null}
  </div>
)

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
  {
    key: initialKey,
    ...props
  }: Omit<CommandCenterDialogItemProps, 'name'> & { key?: string }
): ReturnType<typeof CommandCenterDialogItem> => {
  const key = dasherize(initialKey ?? name)

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

const CommandCenterDialogSuggestions = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const search = useCommandState((state) => state.search)

  if (search.length > 0) {
    return null
  }

  return <CommandGroup heading='Suggestions'>{children}</CommandGroup>
}
export function CommandCenterDialog({
  open,
  onOpenChange,
  onExecCommand,
  createQRCode,
  openKeyboardShortcutsDialog,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExecCommand: () => void
  createQRCode: (currentURL: string) => void
  openKeyboardShortcutsDialog: () => void
}) {
  const router = useRouter()
  const { setTheme, theme } = useTheme()

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
      createQRCode(currentURL)
    })
  })

  const handleSelectVFXConfetti = useEvent((name: string): void => {
    execCommand(name, (): void => {
      fireVFXConfettiSurface()
    })
  })

  const handleOpenKeyboardShortcutsDialog = useEvent((name: string): void => {
    execCommand(name, (): void => {
      openKeyboardShortcutsDialog()
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
    helpCommands,
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
        createCommandWithSuggestion('vfx-confetti', {
          value: 'celebrate with confetti',
          onSelect: handleSelectVFXConfetti,
          children: (
            <>
              <ConfettiIcon className='size-4 stroke-[1.5px]' />
              Celebrate
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
        createCommandWithSuggestion('open-keyboard-shortcuts-dialog', {
          value: 'keyboard shortcuts',
          onSelect: handleOpenKeyboardShortcutsDialog,
          children: (
            <>
              <KeyboardIcon className='size-4 stroke-[1.5px]' />
              Keyboard shortcuts
            </>
          ),
        }),
      ],
      [
        createCommandWithSuggestion('light', {
          value: 'light',
          onSelect: handleSelectColorMode,
          children: (
            <ColorModeCommandItemContent active={theme === 'light'}>
              <SunIcon className='h-4 w-4' />
              Light
            </ColorModeCommandItemContent>
          ),
        }),
        createCommandWithSuggestion('dark', {
          value: 'dark',
          onSelect: handleSelectColorMode,
          children: (
            <ColorModeCommandItemContent active={theme === 'dark'}>
              <MoonIcon className='h-4 w-4' />
              Dark
            </ColorModeCommandItemContent>
          ),
        }),
        createCommandWithSuggestion('system', {
          value: 'system',
          onSelect: handleSelectColorMode,
          children: (
            <ColorModeCommandItemContent active={theme === 'system'}>
              <ComputerDesktopIcon className='h-4 w-4' />
              System
            </ColorModeCommandItemContent>
          ),
        }),
      ],
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {suggestionsCommands.length > 0 ? (
          <CommandCenterDialogSuggestions>
            {suggestionsCommands}
          </CommandCenterDialogSuggestions>
        ) : null}
        <CommandGroup heading='Navigation'>{navigationCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Actions'>{actionsCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Social links'>{socialsCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Help'>{helpCommands}</CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Color mode'>{colorModeCommands}</CommandGroup>
      </CommandList>
      <Footer />
    </CommandDialog>
  )
}
