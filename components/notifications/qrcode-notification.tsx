'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'

export function QRCodeNotification({
  value,
  isDark,
  onClose,
}: {
  value: string
  isDark: boolean
  onClose: () => void
}) {
  return (
    <div className='flex flex-row items-center justify-stretch rounded-xl border-2'>
      <div className='flex flex-row items-center justify-center gap-4 border-r-2 py-3 pl-4 pr-3'>
        <QRCodeSVG
          value={value}
          size={42}
          bgColor={isDark ? '#000000' : '#ffffff'}
          fgColor={isDark ? '#ffffff' : '#000000'}
          level='L'
        />
        <div className='flex flex-col items-start justify-between'>
          <h1 className='text-lg font-extrabold tracking-tighter'>
            QR code created ✨
          </h1>
          <span className='text-xs text-muted-foreground'>
            Displayed for 2 minutes only 😀
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center py-3 pl-3 pr-4'>
        <Button size='sm' variant='secondary' onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
