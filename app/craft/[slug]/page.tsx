import { BeakerIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CategoryTag } from '@/components/content/category-tag'
import { GitHubRepositoryLink } from '@/components/content/github-repository-link'
import { PageContent } from '@/components/content/page-content'
import { PageHero } from '@/components/content/page-hero'
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer'
import { Separator } from '@/components/ui/separator'
import { siteConfig, baseUrl } from '@/config/site-config'
import { getMDXPages } from '@/db/mdx-content'

interface StaticParam {
  slug: string
}

export async function generateStaticParams(): Promise<StaticParam[]> {
  const pages = await getMDXPages('craft')
  const slugs = [...pages.keys()].map((slug: string) => ({ slug }))

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

  const { metadata } = page

  return {
    description: metadata.summary,
    metadataBase: new URL(baseUrl),
    openGraph: {
      description: metadata.summary,
      images: [OG_IMG_SRC],
      locale: 'en_US',
      publishedTime: metadata.publishedAt,
      siteName: siteConfig.title,
      title: `${metadata.title} | ${siteConfig.title}`,
      type: 'article',
      url: `${baseUrl}/craft/${page.slug}`,
    },
    title: `${metadata.title} | ${siteConfig.title}`,
    twitter: {
      card: 'summary_large_image',
      creator: siteConfig.socialLinks.twitter.name,
      description: metadata.summary,
      images: [OG_IMG_SRC],
      title: `${metadata.title} | ${siteConfig.title}`,
    },
  }
}

export default async function CraftSlugPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params

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
