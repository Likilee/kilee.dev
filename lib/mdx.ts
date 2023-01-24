import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

type MDXtoHtmlFn = {
  (mdxSource: string): Promise<{ code: string; readTime: string }>
}

export const mdxToHtml: MDXtoHtmlFn = async (mdxSource: string) => {
  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
    cwd: process.cwd(),
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ]
      return options
    },
  })
  const readTime = readingTime(mdxSource).text

  return { code, readTime }
}
