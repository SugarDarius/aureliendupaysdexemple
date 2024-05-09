import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const PAGE_EXT_NAME = '.mdx'

async function getMDXFiles(dirName: string): Promise<string[]> {
  const dir = await fs.readdir(dirName)
  const files = dir.filter(
    (file): boolean => path.extname(file) === PAGE_EXT_NAME
  )

  return files
}

const pageMetadataSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  image: z.string().optional(),
  category: z.string().optional(),
  githubURL: z.string().url().optional(),
})

type PageMetadata = z.infer<typeof pageMetadataSchema>
type PageMDXData = { metadata: PageMetadata; content: string }

const defaultMetadata: PageMetadata = {
  title: '[no title]',
  publishedAt: '[no published date]',
  summary: '[no summary]',
}

async function parseFrontmatter(fileContent: string): Promise<PageMDXData> {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  const frontMatterBlock = match?.[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = (frontMatterBlock ?? '').trim().split('\n')

  const unsafePageMetadata: Record<string, string> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()

    value = value.replace(/^['"](.*)['"]$/, '$1')
    unsafePageMetadata[key.trim()] = value
  })

  const result = await pageMetadataSchema.safeParseAsync(unsafePageMetadata)
  if (result.success) {
    return { metadata: result.data, content }
  }

  return { metadata: defaultMetadata, content }
}

async function readMDXFile(filePath: string): Promise<PageMDXData> {
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const postMDXData = await parseFrontmatter(fileContent)

  return postMDXData
}

type Page = PageMDXData & {
  slug: string
}

async function getMDXData(dirName: string): Promise<Page[]> {
  const files = await getMDXFiles(dirName)
  const pages: Page[] = []

  for (const file of files) {
    const postMDXData = await readMDXFile(path.join(dirName, file))
    const slug = path.basename(file, path.extname(file))

    pages.push({
      slug,
      ...postMDXData,
    })
  }

  return pages
}

export async function getMDXPages(
  contentSrc: 'blog' | 'craft' | 'mdx-renderer'
): Promise<Page[]> {
  const dirName = path.join(process.cwd(), 'mdx-content/' + contentSrc)
  const pages = await getMDXData(dirName)

  return pages
}
