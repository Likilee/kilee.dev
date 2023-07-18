import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import PostLayout from 'layouts/PostLayout'
import { allPosts } from 'contentlayer/generated'
import Mdx from 'components/Mdx'
import SeoHead from 'components/SeoHead'

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    body: { code },
  } = post

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.summary}
        ogType="article"
        date={new Date(post.date).toISOString()}
      />
      <PostLayout post={post}>
        <Mdx code={code} />
      </PostLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: allPosts.map(({ slug }) => ({ params: { slug } })),
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
  if (!params) throw new Error('No Params In this page')
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return { notFound: true }
  }

  const {
    slug,
    title,
    summary,
    date,
    readtime,
    body: { code },
  } = structuredClone(post)
  return {
    props: {
      post: {
        slug,
        title,
        summary,
        date,
        readtime,
        body: { code },
      },
    },
  }
}
