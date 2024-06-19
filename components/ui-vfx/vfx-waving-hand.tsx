'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function VFXWavingHand({ className }: { className?: string }) {
  return (
    <motion.span
      className={cn('inline-flex', className)}
      animate={{ rotate: [0, 20, 0] }}
      style={{ originX: '100%', originY: '100%' }}
      transition={{
        repeat: 6,
        repeatType: 'loop',
        delay: 0.15,
        duration: 0.6,
        type: 'tween',
        ease: 'easeInOut',
      }}
    >
      👋🏻
    </motion.span>
  )
}
