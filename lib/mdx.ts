import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import rehypeHighlight from "rehype-highlight";

type MDXtoHtmlFn = {
  (mdxSource: string): Promise<{code: string, readTime: string}>
}

export const mdxToHtml: MDXtoHtmlFn = async (mdxSource: string) => {
  const {code, frontmatter} = await bundleMDX({source: mdxSource, cwd: process.cwd(), mdxOptions(options, frontmatter) {
    options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight];
    return options;
  }})
  const readTime = readingTime(mdxSource).text;

  return { code, readTime }
}