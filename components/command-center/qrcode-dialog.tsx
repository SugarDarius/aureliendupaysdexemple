'use client'

import { QrCodeIcon } from '@heroicons/react/24/outline'
import { QRCodeSVG } from 'qrcode.react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function QRCodeDialog({
  value,
  isDark,
  className,
  open,
  onOpenChange,
}: {
  value: string
  isDark: boolean
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('overflow-hidden', className)}>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold tracking-tighter'>
            QR code created <QrCodeIcon className='size-4' />
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <QRCodeSVG
            value={value}
            size={128}
            bgColor={isDark ? '#000000' : '#ffffff'}
            fgColor={isDark ? '#ffffff' : '#000000'}
            level='L'
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
