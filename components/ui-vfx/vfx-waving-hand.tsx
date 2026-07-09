'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export function VFXWavingHand({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn('inline-flex', className)}
      animate={{ rotate: [0, 20, 0] }}
      style={{ originX: '100%', originY: '100%' }}
      transition={{
        delay: 0.15,
        duration: 0.6,
        ease: 'easeInOut',
        repeat: 6,
        repeatType: 'loop',
        type: 'tween',
      }}
    >
      👋🏻
    </motion.span>
  )
}
