import { redirect } from 'next/navigation'

import { getMDXPages } from '@/db/mdx-content'

import { PageHero } from '@/components/content/page-hero'
import { Separator } from '@/components/ui/separator'
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer'

export default async function MDXRendererSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug

  const pages = await getMDXPages('mdx-renderer')
  const page = pages.find((page) => page.slug === slug)

  if (!page) {
    redirect('/')
  }

  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
        <PageHero
          title={page.metadata.title}
          description={page.metadata.summary}
          variant='mdx'
        />
        <Separator />
        <div className='flex h-auto w-full flex-col'>
          <MDXContentRenderer source={page.content} />
        </div>
      </div>
    </div>
  )
}
