import fs from 'node:fs/promises'
import path from 'node:path'

import { z } from 'zod'

const PAGE_EXT_NAME = '.mdx'

async function getMDXFiles(dirName: string): Promise<string[]> {
  const dir = await fs.readdir(dirName)
  const files = dir.filter(
    (file): boolean => path.extname(file) === PAGE_EXT_NAME,
  )

  return files
}

const pageMetadataSchema = z.object({
  category: z.string().optional(),
  githubURL: z.string().url().optional(),
  image: z.string().optional(),
  publishedAt: z.string(),
  summary: z.string(),
  title: z.string(),
})

type PageMetadata = z.infer<typeof pageMetadataSchema>
interface PageMDXData {
  metadata: PageMetadata
  content: string
}

const defaultMetadata: PageMetadata = {
  publishedAt: '[no published date]',
  summary: '[no summary]',
  title: '[no title]',
}

async function parseFrontmatter(fileContent: string): Promise<PageMDXData> {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  const frontMatterBlock = match?.[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = (frontMatterBlock ?? '').trim().split('\n')

  const unsafePageMetadata: Record<string, string> = {}

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()

    value = value.replace(/^['"](.*)['"]$/, '$1')
    unsafePageMetadata[key.trim()] = value
  }

  const result = await pageMetadataSchema.safeParseAsync(unsafePageMetadata)
  if (result.success) {
    return { content, metadata: result.data }
  }

  return { content, metadata: defaultMetadata }
}

async function readMDXFile(filePath: string): Promise<PageMDXData> {
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const pageMDXData = await parseFrontmatter(fileContent)

  return pageMDXData
}

export type Page = PageMDXData & {
  slug: string
}

export type Pages = Map<string, Page>

async function getMDXData(dirName: string): Promise<Pages> {
  const files = await getMDXFiles(dirName)
  const pages: Pages = new Map()

  for (const file of files) {
    const pageMDXData = await readMDXFile(path.join(dirName, file))
    const slug = path.basename(file, path.extname(file))

    pages.set(slug, { slug, ...pageMDXData })
  }

  return pages
}

export async function getMDXPages(
  contentSrc: 'blog' | 'craft' | 'mdx-renderer',
): Promise<Pages> {
  const dirName = path.join(process.cwd(), `mdx-content/${contentSrc}`)
  const pages = await getMDXData(dirName)

  return pages
}
