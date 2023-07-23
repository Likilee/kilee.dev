// blog main page
import { BlogPost } from 'components/BlogPost'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import PageLayout from 'layouts/PageLayout'
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { getViewCountPrefetch } from 'hooks/api'
import SeoHead from 'components/SeoHead'

export default function Blog({
  postMetas,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  // useLiveReload() // 🛠️this only runs during development and has no impact on production
  return (
    <PageLayout>
      <SeoHead
        title="hson의 BLOG"
        description="웹 프론트엔드 기술에 관심이 많은 개발자 hson입니다."
        ogType="blog"
      />
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white ">
        {`Blog`}
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        {`2023년 부터 데이터에 대한 글을 써보고자 합니다. 기술 자체보다 문제 해결을 위한 활용에 더 관심이 많은 개발자에요. 지금까지 블로그에 총 ${allPosts.length}개의 글을 작성했어요. `}
      </p>
      <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
        All Posts
      </h2>
      {postMetas.map(({ _id, slug, title, summary, date }) => (
        <BlogPost key={_id} slug={slug} title={title} date={date} summary={summary} />
      ))}
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<{
  postMetas: Pick<Post, '_id' | 'slug' | 'title' | 'summary' | 'date'>[]
}> = async () => {
  const postMetas = allPosts
    .map((post) => {
      const { _id, slug, title, summary, date } = structuredClone(post)
      return { _id, slug, title, summary, date }
    })
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  const dehydratedState = await getViewCountPrefetch()

  return {
    props: {
      postMetas,
      dehydratedState,
    },
  }
}
