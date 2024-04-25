import type { Metadata } from 'next'
import { ComingSoonPageContent } from '@/components/misc/coming-soon-page-content'

export const metadata: Metadata = {
  title: 'Tech stack',
  description: 'Check my tech stack I use everyday',
}

export default function TechStackPage() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      <ComingSoonPageContent />
    </div>
  )
}
