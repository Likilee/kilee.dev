import cjkSlug from 'cjk-slug'
import { readdirSync } from 'fs'
import path from 'path'
import { cwd } from 'process'

const ROOT = cwd();
export const POST_DIR = path.join(ROOT, '__posts');

export const getSlug = (title: string) => cjkSlug(title)

export const getFileNamesInDir = (path: string) => {
  const files = readdirSync(path)
  return files
}

export const getAllFileNames = () => {
  return getFileNamesInDir(POST_DIR);
}

export const getSlugsFromDir = (path: string) => {
  const files = getFileNamesInDir(path)
  return files.map((file) => file.replace(/\.(mdx|md)/, '')).map(getSlug)
}

export const getAllSlugs = () => {
  return getSlugsFromDir(POST_DIR);
}