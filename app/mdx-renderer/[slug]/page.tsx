import { redirect } from 'next/navigation'

import { getPosts } from '@/db/posts'

import { PageHero } from '@/components/content/page-hero'
import { Separator } from '@/components/ui/separator'
import { MDXRenderer } from '@/components/mdx/mdx-renderer'

export default async function DevelopmentPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug

  const posts = await getPosts('mdx-renderer')
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return redirect('/')
  }

  return (
    <div className='relative flex h-full w-full flex-col items-center'>
      <div className='flex h-full w-full max-w-4xl flex-col gap-10 px-12 py-24 max-sm:px-4 min-[1025px]:px-0'>
        <PageHero
          title={post.metadata.title ?? ''}
          description={post.metadata.summary ?? ''}
        />
        <Separator />
        <div className='flex h-auto w-full flex-col'>
          <MDXRenderer source={post.content} />
        </div>
      </div>
    </div>
  )
}
