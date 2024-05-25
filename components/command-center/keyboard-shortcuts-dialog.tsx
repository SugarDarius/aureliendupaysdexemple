'use client'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
      </DialogContent>
    </Dialog>
  )
}
