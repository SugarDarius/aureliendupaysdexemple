import type { Metadata } from 'next'

// import { getMDXPages } from '@/db/mdx-content'
import { PageHero } from '@/components/content/page-hero'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Craft',
  description: 'Check my personal work I craft',
}

export default async function CraftPage() {
  // const pages = await getMDXPages('craft')

  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
        <PageHero
          title='Craft'
          description='A look at my craft and contributions'
        />
        <Separator />
        <div className='flex h-auto w-full flex-col'></div>
      </div>
    </div>
  )
}
