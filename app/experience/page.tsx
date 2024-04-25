import type { Metadata } from 'next'
import { ComingSoonPageContent } from '@/components/misc/coming-soon-page-content'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Check my experience',
}

export default function ExperiencePage() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      <ComingSoonPageContent />
    </div>
  )
}
