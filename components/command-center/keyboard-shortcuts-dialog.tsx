'use client'

import { cn, toUpperFirst } from '@/lib/utils'
import { navigationItems } from '@/lib/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const KeyboardShortcutsSection = ({
  children,
}: {
  children?: React.ReactNode
}) => <div className='flex w-full flex-col gap-3'>{children}</div>

const KeyboardShortcutsSectionItems = ({
  children,
}: {
  children?: React.ReactNode
}) => <div className='flex w-full flex-col gap-2'>{children}</div>

const KeyboardShortcutsSectionTitle = ({
  children,
}: {
  children?: React.ReactNode
}) => (
  <span className='text-base font-semibold leading-none text-muted-foreground'>
    {children}
  </span>
)

const KeyboardShortcutsItem = ({
  children,
}: {
  children?: React.ReactNode
}) => (
  <div className='flex flex-row items-center justify-between gap-2'>
    {children}
  </div>
)

const KeyboardShortcutLabel = ({
  children,
}: {
  children?: React.ReactNode
}) => <span className='text-sm font-medium leading-none'>{children}</span>

const KeyboardShortcutKeys = ({ children }: { children?: React.ReactNode }) => (
  <span className='flex items-center rounded border bg-muted px-1 text-xs font-medium tracking-[2px] text-muted-foreground'>
    {children}
  </span>
)

export function KeyboardShortcutsDialog({
  className,
  open,
  onOpenChange,
}: {
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('gap-6', className)}>
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>
            List of available keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex w-full flex-col gap-4'>
            <KeyboardShortcutsSection>
              <KeyboardShortcutsSectionTitle>
                General
              </KeyboardShortcutsSectionTitle>
              <KeyboardShortcutsSectionItems>
                <KeyboardShortcutsItem>
                  <KeyboardShortcutLabel>
                    Open command center
                  </KeyboardShortcutLabel>
                  <KeyboardShortcutKeys>⌘K</KeyboardShortcutKeys>
                </KeyboardShortcutsItem>
                <KeyboardShortcutsItem>
                  <KeyboardShortcutLabel>
                    Toggle magnifying glass
                  </KeyboardShortcutLabel>
                  <KeyboardShortcutKeys>M</KeyboardShortcutKeys>
                </KeyboardShortcutsItem>
              </KeyboardShortcutsSectionItems>
            </KeyboardShortcutsSection>
            <KeyboardShortcutsSection>
              <KeyboardShortcutsSectionTitle>
                Navigation
              </KeyboardShortcutsSectionTitle>
              <KeyboardShortcutsSectionItems>
                {navigationItems.map((navigationItem) => (
                  <KeyboardShortcutsItem key={navigationItem.href}>
                    <KeyboardShortcutLabel>
                      Go to {toUpperFirst(navigationItem.label)}
                    </KeyboardShortcutLabel>
                    <KeyboardShortcutKeys>
                      {navigationItem.shortcutLabel}
                    </KeyboardShortcutKeys>
                  </KeyboardShortcutsItem>
                ))}
              </KeyboardShortcutsSectionItems>
            </KeyboardShortcutsSection>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
