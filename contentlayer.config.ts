import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings, {
  type Options as AutolinkHeadingsOptions,
} from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getSlug } from './lib/files'
import rehypeImgSizeWithFullWidth from './lib/rehypeImgSizeWithFullWidth'
import rehypeUrlInspector, { type Options as UrlInspectorOptions } from 'rehype-url-inspector'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { readFileSync } from 'fs'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.@(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The sammary of the post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => getSlug(doc._raw.flattenedPath),
    },
    readtime: {
      type: 'string',
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
  },
}))

/* 💡 A custom plugin to eliminate "../public" generated by the markdown editor for the next/image component. */
const imgSrcUrlConvertOption: UrlInspectorOptions = {
  inspectEach(url) {
    if (
      url.node.properties &&
      url.node.properties.src &&
      typeof url.node.properties.src === 'string'
    )
      url.node.properties.src = url.node.properties.src.replace(/^.*\/public\//, '/')
  },
  selectors: [`img[src]`],
}

const autolinkHeadingOption: AutolinkHeadingsOptions = {
  properties: {
    className: ['anchor'],
  },
}

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: {
    dark: 'one-dark-pro',
    /* 💡Copy https://github.com/saicharan-m/light-plus-noctis/blob/main/themes/Noctis%20Light%2B-color-theme.json */
    light: JSON.parse(readFileSync('./code_theme/light-plus-noctis.json', 'utf-8')),
  },
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('line--highlighted')
  },
  onVisitHighlightedWord(node: any, id: string) {
    if (!id) return

    /* 💡 In markdown:' ```ts /target1/#y /target2/#b ' will highlight all matched text yellow or blue*/
    const backgroundColor = {
      y: '#ff0',
      b: 'dodgerblue',
    }[id]

    const color = {
      y: 'black',
      b: 'white',
    }[id]

    node.properties.className = ['word--highlighted', 'rounded', 'p-1']
    node.properties.style = `background-color: ${backgroundColor}; color: ${color};`
  },
}

export default makeSource({
  contentDirPath: process.env.CONTENTS_DIR || '__contents',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeImgSizeWithFullWidth, // 💡 A custom plugin to enhance <img> tags by adding size (width/height) attributes.
      rehypeSlug,
      [rehypeUrlInspector, imgSrcUrlConvertOption],
      [rehypeAutolinkHeadings, autolinkHeadingOption],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
})