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
//@ts-ignore
import rehypeFigure from 'rehype-figure'

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
    tag: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tag of the post',
      required: false,
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

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: JSON.parse(readFileSync('./code_theme/one-dark-pro-darker.json', 'utf-8')),
    light: JSON.parse(readFileSync('./code_theme/atom-one-light.json', 'utf-8')),
  },
  tokensMap: {
    fn: 'entity.name.function',
    str: 'string',
    var: 'variable.other.constant',
    attr: 'variable.other.readwrite',
  },
}

export default makeSource({
  contentDirPath: process.env.CONTENTS_DIR || '__contents',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeUrlInspector, imgSrcUrlConvertOption], // 💡 You need to run the 'rehypeUrlInspector' plugin before the 'rehypeImgSizeWithFullWidth'
      [rehypeFigure, { className: 'image-caption' }],
      rehypeImgSizeWithFullWidth, // 💡 A custom plugin to enhance <img> tags by adding size (width/height) attributes.
      rehypeSlug,
      [rehypeAutolinkHeadings, autolinkHeadingOption],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
})
