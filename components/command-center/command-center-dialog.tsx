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
  TwitterLogoIcon,
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

const CommandCenterDialogItem = ({
  searchValue,
  value,
  onSelect,
  className,
  children,
}: {
  searchValue?: string
  value: string
  onSelect: (value: string) => void
  className?: string
  children: React.ReactNode
}) => {
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

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Navigation'>
          {navigationItems.map((navigationItem) => (
            <CommandCenterDialogItem
              key={navigationItem.href}
              searchValue={navigationItem.name}
              value={navigationItem.href}
              onSelect={handleSelectNavigation}
            >
              <ArrowRightIcon className='h-4 w-4' />
              Go to{' '}
              <span className='font-bold'>
                {toUpperFirst(navigationItem.label)}
              </span>
              <CommandShortcut>{navigationItem.shortcutLabel}</CommandShortcut>
            </CommandCenterDialogItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Actions'>
          <CommandCenterDialogItem
            value='copy current url'
            onSelect={handleSelectCopyCurrentURL}
          >
            <CopyIcon className='size-4' />
            Copy current URL
          </CommandCenterDialogItem>
          <CommandCenterDialogItem
            value='create qr code for current url'
            onSelect={handleSelectCreateQRCode}
          >
            <QrCodeIcon className='size-4' />
            Create QR code for current URL
          </CommandCenterDialogItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Social links'>
          <CommandCenterDialogItem
            value={siteConfig.socialLinks.linkedin.url}
            searchValue='linkedin'
            onSelect={handleSelectSocialLink}
          >
            <LinkedInLogoIcon className='h-4 w-4' />
            LinkedIn
          </CommandCenterDialogItem>
          <CommandCenterDialogItem
            value={siteConfig.socialLinks.github.url}
            searchValue='github'
            onSelect={handleSelectSocialLink}
          >
            <GitHubLogoIcon className='h-4 w-4' />
            GitHub
          </CommandCenterDialogItem>
          <CommandCenterDialogItem
            value={siteConfig.socialLinks.twitter.url}
            searchValue='twitter'
            onSelect={handleSelectSocialLink}
          >
            <TwitterLogoIcon className='h-4 w-4' />
            Twitter (X)
          </CommandCenterDialogItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Color mode'>
          <CommandCenterDialogItem
            value='light'
            onSelect={handleSelectColorMode}
          >
            <SunIcon className='h-4 w-4' />
            Light
          </CommandCenterDialogItem>
          <CommandCenterDialogItem
            value='dark'
            onSelect={handleSelectColorMode}
          >
            <MoonIcon className='h-4 w-4' />
            Dark
          </CommandCenterDialogItem>
          <CommandCenterDialogItem
            value='system'
            onSelect={handleSelectColorMode}
          >
            <ComputerDesktopIcon className='h-4 w-4' />
            System
          </CommandCenterDialogItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
