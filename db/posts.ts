import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

import { slugify } from '@/lib/utils'

const POST_EXT_NAME = '.mdx'

async function getMDXFiles(dirName: string): Promise<string[]> {
  const dir = await fs.readdir(dirName)
  const files = dir.filter(
    (file): boolean => path.extname(file) === POST_EXT_NAME
  )

  return files
}

const postMetadataSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  image: z.string().optional(),
})

type PostMetadata = z.infer<typeof postMetadataSchema>
type PostMDXData = { metadata: PostMetadata; content: string }

const postMetadataFallback: PostMetadata = {
  title: '[no title]',
  publishedAt: '[no published date',
  summary: '[no summary]',
}

async function parseFrontmatter(fileContent: string): Promise<PostMDXData> {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  const frontMatterBlock = match?.[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = (frontMatterBlock ?? '').trim().split('\n')

  const unsafePostMetadata: Record<string, string> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()

    value = value.replace(/^['"](.*)['"]$/, '$1')
    unsafePostMetadata[key.trim()] = value
  })

  const result = await postMetadataSchema.safeParseAsync(unsafePostMetadata)
  if (result.success) {
    return { metadata: result.data, content }
  }

  return { metadata: postMetadataFallback, content }
}

async function readMDXFile(filePath: string): Promise<PostMDXData> {
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const postMDXData = await parseFrontmatter(fileContent)

  return postMDXData
}

type Post = PostMDXData & {
  slug: string
}

async function getMDXData(dirName: string): Promise<Post[]> {
  const files = await getMDXFiles(dirName)
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
  contentSrc: 'blog' | 'craft' | 'mdx-renderer'
): Promise<Post[]> {
  const dirName = path.join(process.cwd(), 'mdx-content/' + contentSrc)
  const posts = await getMDXData(dirName)

  return posts
}
