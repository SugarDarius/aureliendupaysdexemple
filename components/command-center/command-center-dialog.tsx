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

import { /** cn, */ toUpperFirst } from '@/lib/utils'
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

// const CommandCenterDialogItem = ({
//   className,
//   children,
// }: {
//   className?: string
//   children: React.ReactNode
// }) => (
//   <CommandItem className={cn('items-center, gap-2', className)}>
//     {children}
//   </CommandItem>
// )

export function CommandCenterDialog({
  open,
  onOpenChange,
  onRunCommand,
  onCreateQRCode,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRunCommand: () => void
  onCreateQRCode: (currentURL: string) => void
}) {
  const router = useRouter()
  const { setTheme } = useTheme()

  const [, copy] = useCopyToClipboard()

  const runCommand = useEvent((command: () => void): void => {
    onRunCommand()
    command()
  })

  const goToPage = useEvent((href: string): void => {
    router.push(href)
  })

  const copyCurrentURL = useEvent((): void => {
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

  const createQRCode = useEvent((): void => {
    const currentURL = window.location.href
    onCreateQRCode(currentURL)
  })

  const goToSocialLink = useEvent((url: string): void => {
    window.open(url, '_blank')
  })

  const setColorMode = useEvent(
    (colorMode: 'light' | 'dark' | 'system'): void => {
      setTheme(colorMode)
    }
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder='Type a command or search' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Navigation'>
          {navigationItems.map((navigationItem) => (
            <CommandItem
              key={navigationItem.href}
              value={navigationItem.name}
              onSelect={() => {
                runCommand(() => {
                  goToPage(navigationItem.href)
                })
              }}
              className='items-center gap-2'
            >
              <ArrowRightIcon className='h-4 w-4' />
              Go to{' '}
              <span className='font-bold'>
                {toUpperFirst(navigationItem.label)}
              </span>
              <CommandShortcut>{navigationItem.shortcutLabel}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Actions'>
          <CommandItem
            value='copy current url'
            className='items-center gap-2'
            onSelect={(): void => {
              runCommand(() => {
                copyCurrentURL()
              })
            }}
          >
            <CopyIcon className='size-4' />
            Copy current URL
          </CommandItem>
          <CommandItem
            value='create qr code for current url'
            className='items-center gap-2'
            onSelect={(): void => {
              runCommand(() => {
                createQRCode()
              })
            }}
          >
            <QrCodeIcon className='size-4' />
            Create QR code for current URL
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Social links'>
          <CommandItem
            value='linkedin'
            className='items-center gap-2'
            onSelect={() => {
              runCommand(() => {
                goToSocialLink(siteConfig.socialLinks.linkedin.url)
              })
            }}
          >
            <LinkedInLogoIcon className='h-4 w-4' />
            LinkedIn
          </CommandItem>
          <CommandItem
            value='github'
            className='items-center gap-2'
            onSelect={() => {
              runCommand(() => {
                goToSocialLink(siteConfig.socialLinks.github.url)
              })
            }}
          >
            <GitHubLogoIcon className='h-4 w-4' />
            GitHub
          </CommandItem>
          <CommandItem
            value='twitter'
            className='items-center gap-2'
            onSelect={() => {
              runCommand(() => {
                goToSocialLink(siteConfig.socialLinks.twitter.url)
              })
            }}
          >
            <TwitterLogoIcon className='h-4 w-4' />
            Twitter (X)
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Color mode'>
          <CommandItem
            value='light'
            onSelect={() => {
              runCommand(() => {
                setColorMode('light')
              })
            }}
            className='items-center gap-2'
          >
            <SunIcon className='h-4 w-4' />
            Light
          </CommandItem>
          <CommandItem
            value='dark'
            onSelect={() => {
              runCommand(() => {
                setColorMode('dark')
              })
            }}
            className='items-center gap-2'
          >
            <MoonIcon className='h-4 w-4' />
            Dark
          </CommandItem>
          <CommandItem
            value='system'
            onSelect={() => {
              runCommand(() => {
                setColorMode('system')
              })
            }}
            className='items-center gap-2'
          >
            <ComputerDesktopIcon className='h-4 w-4' />
            System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
