import { redirect } from 'next/navigation'

import { getMDXPages } from '@/db/mdx-content'

import { Separator } from '@/components/ui/separator'
import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer'

type StaticParam = { slug: string }

export async function generateStaticParams(): Promise<StaticParam[]> {
  const pages = await getMDXPages('mdx-renderer')
  const slugs = Array.from(pages.keys()).map((slug: string) => ({ slug }))

  return slugs
}

export default async function MDXRendererSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug

  const pages = await getMDXPages('mdx-renderer')
  const page = pages.get(slug)

  if (!page) {
    redirect('/')
  }

  return (
    <PageContent>
      <PageHero
        title={page.metadata.title}
        description={page.metadata.summary}
        variant='mdx'
      />
      <Separator />
      <div className='flex h-auto w-full flex-col'>
        <MDXContentRenderer source={page.content} />
      </div>
    </PageContent>
  )
}
