import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { mdxToHtml } from 'lib/mdx'
import { Post } from 'lib/types'
import { sanityClient } from 'lib/sanity'
import { allPostQuery } from 'lib/sanity-query'
import PageLayout from 'layouts/PageLayout'
import PostLayout from 'layouts/PostLayout'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { content, title, date } = post
  const Component = useMemo(() => getMDXComponent(content), [content])

  return (
    <PageLayout>
      <PostLayout post={post}>
        <Component />
      </PostLayout>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await sanityClient.fetch(allPostQuery)
  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({ params: { slug } })),
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  if (!params) throw new Error('No Params In this page')

  const posts: Post[] = await sanityClient.fetch(allPostQuery)
  const post = posts.find(({ slug }) => params.slug === slug)

  if (!post) {
    return { notFound: true }
  }
  const { code } = await mdxToHtml(post.content)

  return {
    props: {
      post: {
        ...post,
        content: code,
      },
    },
  }
}
