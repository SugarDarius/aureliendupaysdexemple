import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BeakerIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline'

import { siteConfig } from '@/config/site-config'

import { baseUrl } from '@/config/site-config'
import { getMDXPages } from '@/db/mdx-content'

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

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params

  const pages = await getMDXPages('craft')
  const page = pages.get(slug)

  if (!page) {
    return {}
  }

  const metadata = page.metadata

  return {
    metadataBase: new URL(baseUrl),
    title: `${metadata.title} | ${siteConfig.title}`,
    description: metadata.summary,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      title: `${metadata.title} | ${siteConfig.title}`,
      description: metadata.summary,
      publishedTime: metadata.publishedAt,
      siteName: siteConfig.title,
      url: baseUrl + '/craft/' + page.slug,
      images: [OG_IMG_SRC],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metadata.title} | ${siteConfig.title}`,
      description: metadata.summary,
      creator: siteConfig.socialLinks.twitter.name,
      images: [OG_IMG_SRC],
    },
  }
}

export default async function CraftSlugPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
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
        variant='mdx'
      />
      <Separator />
      <div className='flex w-full flex-col gap-6'>
        <div className='flex w-full flex-row items-center justify-between'>
          {page.metadata.githubURL ? (
            <GitHubRepositoryLink
              href={page.metadata.githubURL}
              isLab={isLab}
            />
          ) : null}
          {page.metadata.category ? (
            <CategoryTag>
              {isLab ? (
                <BeakerIcon className='size-3.5' />
              ) : (
                <CodeBracketSquareIcon className='size-3.5' />
              )}
              {page.metadata.category}
            </CategoryTag>
          ) : null}
        </div>
      </div>
      <div className='flex h-auto w-full flex-col'>
        <MDXContentRenderer source={page.content} />
      </div>
    </PageContent>
  )
}
