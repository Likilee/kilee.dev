import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

type Post = {
  content: string;
}

export function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>Post Page</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = [
    { slug: 'hello-world', contents: 'Hello world' },
    { slug: 'bye-world', contents: 'Bye world' },
  ]
  const paths = posts.map((post) => post.slug)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) throw new Error('No Params')

  const posts = [
    { slug: 'hello-world', contents: 'Hello world' },
    { slug: 'bye-world', contents: 'Bye world' },
  ]
  const post = posts.find(({ slug }) => slug === params.slug)
  if (!post) {
    return { notFound: true }
  }
  return {
    props: {
    }
  }
}