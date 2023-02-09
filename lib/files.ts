import cjkSlug from 'cjk-slug'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'

const ROOT = cwd()
export const CONTENTS_DIR = join(ROOT, process.env.CONTENTS_DIR || '__contents')

export const getSlug = (title: string) => cjkSlug(title)

export const getFileNamesInDir = (path: string) => {
  const files = readdirSync(path)
  return files
}
const removeExtension = (src: string) => src.replace(/\.(mdx|md)/, '')

export const getAllFileNames = () => {
  return getFileNamesInDir(CONTENTS_DIR)
}

export const getSlugsFromDir = (path: string) => {
  const files = getFileNamesInDir(path)
  return files.map((file) => removeExtension(file)).map(getSlug)
}

export const getFileWithSlug = (slug: string, path: string = CONTENTS_DIR) => {
  const files = getFileNamesInDir(path)

  const file = files.filter((file) => getSlug(removeExtension(file)) === slug)[0] || null
  if (!file) throw new Error({ statusCode: 404, title: 'No matching slug content' })
  return file
}

export const getAllSlugs = () => {
  return getSlugsFromDir(CONTENTS_DIR)
}

export const getContentBySlug = (slug: string, path: string = CONTENTS_DIR) => {
  const fileName = getFileWithSlug(slug, path)

  const content = readFileSync(join(path, fileName), 'utf-8')
  console.log(content)
  return content
}
