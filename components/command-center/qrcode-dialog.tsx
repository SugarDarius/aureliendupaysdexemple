'use client'

import { useTheme } from 'next-themes'
import { QRCodeSVG } from 'qrcode.react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function QRCodeDialog({
  value,
  className,
  open,
  onOpenChange,
}: {
  value: string
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('gap-6 overflow-hidden', className)}>
        <DialogHeader>
          <DialogTitle className='text-2xl font-extrabold tracking-tighter'>
            Scan QR Code
          </DialogTitle>
          <DialogDescription className='!mt-0'>
            Scan this QR code with a scanner app on your phone
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center justify-center rounded-lg border p-8'>
            <QRCodeSVG
              value={value}
              size={256}
              bgColor={isDark ? '#000000' : '#ffffff'}
              fgColor={isDark ? '#ffffff' : '#000000'}
              level='L'
            />
          </div>
        </div>
        <DialogFooter className='items-center !justify-center'>
          <span className='rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'>
            {value}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
