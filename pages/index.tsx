import PageLayout from 'layouts/PageLayout'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { createClient } from 'next-sanity'

export default function Home({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <PageLayout>
      {posts.map((post, index) => (
        <div key={index}>${post.content}</div>
      ))}
    </PageLayout>
  )
}

const client = createClient({
  projectId: '5sui7roq',
  dataset: 'production',
  useCdn: true,
})

export const getStaticProps: GetStaticProps<{ posts: any[] }> = async () => {
  const posts = await client.fetch(`*[_type == "post"]`)
  return {
    props: {
      posts,
    },
  }
}
