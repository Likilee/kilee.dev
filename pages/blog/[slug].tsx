import Layout from 'components/Layout'
import { BLOG_SERVER } from 'config/server'
import { Post } from 'lib/types'
import { dummyPosts } from 'mocks/data/posts'
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </>
  )
}

/* ✅ TODO:  Pre-render time 에 msw 가 동작하지 않는 이슈 해결법 있는지.*/
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = dummyPosts

  return {
    fallback: false,
    paths: dummyPosts.map((post) => ({ params: { slug: post.slug } })),
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  if (!params) throw new Error('No Params')
  const { slug } = params
  const res = await fetch(`${BLOG_SERVER}/post/?slug=${slug}`)
  const post: Post = await res.json()

  if (!post) {
    return { notFound: true }
  }
  return {
    props: {
      post,
    },
  }
}
