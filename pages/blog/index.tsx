import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { Post } from '../../lib/types'

export default function Blog({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <div>BLOG PAGE</div>
      {posts.map((post) => (
        <div key={post._id}>
          <div>{post.slug}</div>
          <div>{post.title}</div>
          <div>{post.content}</div>
        </div>
      ))}
    </>
  )
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch('http://api/posts')
  const posts: Post[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}
