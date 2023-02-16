import { BlogPost } from 'components/BlogPost'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import PageLayout from 'layouts/PageLayout'
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { getViewCountPrefetch } from 'hooks/api'
import SeoHead from 'components/SeoHead'

export default function Blog({ posts }: InferGetServerSidePropsType<typeof getStaticProps>) {
  // useLiveReload() // 🛠️this only runs during development and has no impact on production

  return (
    <PageLayout>
      <SeoHead
        title="김마스터의 블로그"
        description="더 나은 사용성을 UX를 위한 웹 프론트엔드 기술에 관심이 많은 개발자 김마스터입니다."
        ogType="blog"
      />
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white ">
        {`Blog`}
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {`2023년 부터 주로 웹 개발에 대해 글을 쓰고 있어요. 기술 자체보다 문제 해결을 위한 활용에 더 관심이 많은 개발자에요. 지금까지 블로그에 총 {0}개의 글을 작성했어요. 아래 검색 바를 사용하여 관심있는 주제의 글을 찾아보세요`}
      </p>
      <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
        All Posts
      </h3>
      {posts.map(({ _id, slug, title, summary, date }) => (
        <BlogPost key={_id} slug={slug} title={title} date={date} summary={summary} />
      ))}
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // const posts: Post[] = await sanityClient.fetch(allPostQuery)
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  const dehydratedState = await getViewCountPrefetch()

  return {
    props: {
      posts,
      dehydratedState,
    },
  }
}
