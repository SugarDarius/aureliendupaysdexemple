import fs from 'node:fs'
import path from 'node:path'

import { compileMDX } from 'next-mdx-remote/rsc'
import { slugify } from '@/lib/utils'

const POST_EXT_NAME = '.mdx'
function getMDXFiles(dirName: string): string[] {
  const dir = fs.readdirSync(dirName)
  const files = dir.filter(
    (file): boolean => path.extname(file) === POST_EXT_NAME
  )

  return files
}

type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

type PostMDXData = { metadata: PostMetadata; content: React.ReactElement }

async function readMDXFile(filePath: string): Promise<PostMDXData> {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const post = await compileMDX<PostMetadata>({
    source: rawContent,
    options: { parseFrontmatter: true },
  })

  return { metadata: post.frontmatter, content: post.content }
}

type Post = PostMDXData & {
  slug: string
}

async function getMDXData(dirName: string): Promise<Post[]> {
  const files = getMDXFiles(dirName)
  const posts: Post[] = []

  for (const file of files) {
    const postMDXData = await readMDXFile(path.join(dirName, file))
    const slug = slugify(path.basename(file, path.extname(file)))

    posts.push({
      slug,
      ...postMDXData,
    })
  }

  return posts
}

export async function getPosts(
  contentSrc: 'blog' | 'craft' | 'posts-test'
): Promise<Post[]> {
  const dirName = path.join(process.cwd(), 'content/' + contentSrc)
  const posts = await getMDXData(dirName)

  return posts
}
