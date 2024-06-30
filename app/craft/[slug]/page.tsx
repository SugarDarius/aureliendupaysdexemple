import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { siteConfig } from '@/config/site-config'

import { baseUrl } from '@/config/site-config'
import { getMDXPages } from '@/db/mdx-content'

import { VFXBackgroundDot } from '@/components/ui-vfx/vfx-background-dot'
import { Separator } from '@/components/ui/separator'

import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer'
import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { GitHubRepositoryLink } from '@/components/content/github-repository-link'
import { CategoryTag } from '@/components/content/category-tag'

type StaticParam = { slug: string }

export async function generateStaticParams(): Promise<StaticParam[]> {
  const pages = await getMDXPages('craft')
  const slugs = Array.from(pages.keys()).map((slug: string) => ({ slug }))

  return slugs
}

const OG_IMG_SRC = '/opengraph-image.png'

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
      type: 'article',
      locale: 'en_US',
      title: metadata.title,
      description: metadata.summary,
      publishedTime: metadata.publishedAt,
      siteName: siteConfig.title,
      url: baseUrl + '/craft/' + page.slug,
      images: [OG_IMG_SRC],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.summary,
      creator: siteConfig.socialLinks.twitter.name,
      images: [OG_IMG_SRC],
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

  const isLab = page.metadata.category?.includes('Lab')

  return (
    <PageContent>
      <PageHero
        title={page.metadata.title}
        description={page.metadata.summary}
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
            <GitHubRepositoryLink
              href={page.metadata.githubURL}
              isLab={isLab}
            />
          ) : null}
          {page.metadata.category ? (
            <CategoryTag>{page.metadata.category}</CategoryTag>
          ) : null}
        </div>
      </div>
      <div className='flex h-auto w-full flex-col'>
        <MDXContentRenderer source={page.content} />
      </div>
    </PageContent>
  )
}
