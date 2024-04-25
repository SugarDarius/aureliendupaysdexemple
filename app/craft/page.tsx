import type { Metadata } from 'next'
import { ComingSoonPageContent } from '@/components/misc/coming-soon-page-content'

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Check my personal work I craft',
}

export default function CraftPage() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      <ComingSoonPageContent />
    </div>
  )
}
