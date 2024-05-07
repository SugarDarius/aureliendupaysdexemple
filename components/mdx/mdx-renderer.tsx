import { MDXRemote } from 'next-mdx-remote/rsc'

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} />
}
