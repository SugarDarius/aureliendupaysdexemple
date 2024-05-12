import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { baseUrl } from '@/app/sitemap'
import { getMDXPages } from '@/db/mdx-content'

import { VFXBackgroundDot } from '@/components/ui-vfx/vfx-background-dot'
import { Separator } from '@/components/ui/separator'

import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer'
import { PageHero } from '@/components/content/page-hero'
import { GitHubRepositoryLink } from '@/components/content/github-repository-link'
import { CategoryTag } from '@/components/content/category-tag'

type StaticParam = { slug: string }

export async function generateStaticParams(): Promise<StaticParam[]> {
  const pages = await getMDXPages('craft')
  const slugs = Array.from(pages.keys()).map((slug: string) => ({ slug }))

  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug

  const pages = await getMDXPages('craft')
  const page = pages.get(slug)

  if (!page) {
    return {}
  }

  const metadata = page.metadata

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      type: 'article',
      publishedTime: metadata.publishedAt,
      url: baseUrl + '/craft/' + page.slug,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.summary,
    },
  }
}

export default async function CraftSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug

  const pages = await getMDXPages('craft')
  const page = pages.get(slug)

  if (!page) {
    notFound()
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
        <div className='flex w-full flex-col gap-6'>
          {page.metadata.image ? (
            <div className='relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-stone-50 p-8 dark:border-neutral-800 dark:bg-stone-900'>
              <VFXBackgroundDot />
              <Image
                alt=''
                src={page.metadata.image}
                width={680 / 1.5}
                height={430 / 1.5}
                className='z-[2]'
                priority
              />
            </div>
          ) : null}
          <div className='flex w-full flex-row items-center justify-between'>
            {page.metadata.githubURL ? (
              <GitHubRepositoryLink href={page.metadata.githubURL} />
            ) : null}
            {page.metadata.category ? (
              <CategoryTag>{page.metadata.category}</CategoryTag>
            ) : null}
          </div>
        </div>
        <div className='flex h-auto w-full flex-col'>
          <MDXContentRenderer source={page.content} />
        </div>
      </div>
    </div>
  )
}
