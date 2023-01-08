import { BlogPost } from 'components/BlogPost/BlogPost'
import { BLOG_SERVER } from 'config/server'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Container from 'components/Container/Container'
import { Post } from 'lib/types'

export default function Blog({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div>BLOG PAGE</div>
      {posts.map((post) => (
        <BlogPost key={post._id}
        slug={post.slug}
        title={post.title}
        content={post.content}
        excerpt={post.excerpt}
        />
      ))}
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch(`${BLOG_SERVER}/posts`)
  console.log("RES", res)

  const posts: Post[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}
