import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { createClient } from 'next-sanity'

export default function Home({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log(posts)
  return (
    <main>
      {posts.map((post, index) => (
        <div key={index}>${post.contents}</div>
      ))}
    </main>
  )
}

const client = createClient({
  projectId: '5sui7roq',
  dataset: 'production',
  useCdn: true,
})

export const getStaticProps: GetStaticProps<{ posts: any[] }> = async () => {
  const posts = await client.fetch(`*[_type == "post"]`)
  console.log('post', posts)
  return {
    props: {
      posts,
    },
  }
}
