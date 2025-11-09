'use client'

import { cn } from '@/lib/utils'

export function VFXBorderBeam({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'vfx-border-beam-duration-[10s] vfx-border-beam-delay-75 vfx-border-beam-color-from vfx-border-beam-color-to vfx-border-beam-width vfx-border-beam-anchor vfx-border-beam-size-12',
        'pointer-events-none absolute inset-0 rounded-[inherit] border-solid border-transparent [border-width:var(--tw-vfx-border-beam-width)]',
        '[mask-clip:padding-box,border-box]! mask-intersect! [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        'after:absolute after:aspect-square after:w-(--tw-vfx-border-beam-size) after:animate-vfx-border-beam after:[animation-delay:var(--tw-vfx-border-beam-delay)] after:[background:linear-gradient(to_left,var(--tw-vfx-border-beam-color-from),var(--tw-vfx-border-beam-color-to),transparent)] after:[offset-anchor:calc(var(--tw-vfx-border-beam-anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--tw-vfx-border-beam-size))]',
        className
      )}
    />
  )
}
