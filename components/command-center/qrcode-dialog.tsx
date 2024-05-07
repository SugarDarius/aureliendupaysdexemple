'use client'

// import { QrCodeIcon } from '@heroicons/react/24/outline'
import { QRCodeSVG } from 'qrcode.react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
      </DialogContent>
    </Dialog>
  )
}
