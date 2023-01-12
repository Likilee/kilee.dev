import { BlogPost } from 'components/BlogPost'
import { BLOG_SERVER } from 'config/server'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { Post } from 'lib/types'
import PageLayout from 'layouts/PageLayout'

export default function Blog({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <PageLayout>
      <h1 className="w-full">BLOG PAGE</h1>
      {posts.map((post) => (
        <BlogPost
          key={post._id}
          slug={post.slug}
          title={post.title}
          content={post.content}
          excerpt={post.excerpt}
        />
      ))}
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch(`${BLOG_SERVER}/posts`)
  console.log('RES', res)

  const posts: Post[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}
