import { readFileSync } from "fs"
import { POST_DIR } from "lib/files"
import { bundleMDX } from "mdx-bundler";
import path from "path"
import rehypeHighlight from "rehype-highlight";

export const getMDXSourceFromLocal = (fileName: string) => {
  const filePath = path.join(POST_DIR, fileName);
  const mdxSource = readFileSync(filePath, 'utf-8');
  return mdxSource;
}

type MDXtoHtmlFn = {
  (mdxSource: string): Promise<{code: string}>
}

export const mdxToHtml: MDXtoHtmlFn = async (mdxSource: string) => {
  const {code, frontmatter} = await bundleMDX({source: mdxSource, cwd: process.cwd(), mdxOptions(options, frontmatter) {
    options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight];
    return options;
  }})
  return { code }
}