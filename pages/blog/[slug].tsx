import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent, type MDXContentProps } from 'mdx-bundler/client'
import { getAllFileNames, getAllSlugs, getSlug } from 'lib/files'
import { bundleMDX } from 'mdx-bundler'
import { getMDXSourceFromLocal } from 'lib/mdx'
import { Post } from 'lib/types'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {

  const {content, title, date} = post;
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <>
      <div>{title}</div>
      <div>{date}</div>
      <article className="prose prose-slate md:prose-lg dark:prose-invert">
        <Component />
      </article>
    </>
  )
}

/* ✅ TODO:  Pre-render time 에 msw 가 동작하지 않는 이슈 해결법 있는지.*/
// Static Paths 를 가져온다.
// data/blog/*.(md,mdx) 파일명에서 slug를 추출해내서 만든다.
export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs()
  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  }
}

/**
 * 1. Dir 에 있는 모든 FIleName 배열을 가져온다.
 * 2. Slug 와 일치하는 FileName을 찾는다.
 * 3. 해당 파일을 읽어오고 mdx bundler에게 넘겨준다.
 * 4. prop으로 돌려준다.
 */
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  if (!params) throw new Error('No Params In this page')

  const { slug } = params
  const fileName = getAllFileNames().find(
    (fileName) => getSlug(fileName.replace(/\.(mdx|md)/, '')) === slug,
  )

  if (!fileName) {
    return { notFound: true }
  }
  const source = getMDXSourceFromLocal(fileName)
  const result = await bundleMDX<{ title: string; description: string; published: Date }>({
    source,
    cwd: process.cwd(),
  })
  const { code, frontmatter } = result

  const post: Post = {
    _id: slug,
    slug: slug,
    content: code,
    title: frontmatter.title,
    excerpt: frontmatter.description,
    date: frontmatter.published.toISOString(),
  }
  return {
    props: {
      post,
    },
  }
}
