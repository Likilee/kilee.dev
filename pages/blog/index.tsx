import { BlogPost } from 'components/BlogPost'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import PageLayout from 'layouts/PageLayout'
import { getAllSlugs } from 'lib/files'

export default function Blog({ slugs }: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <PageLayout>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        {`Kilee's Blog`}
      </h1>
      <p className="font-sans">Pretendard 프리텐다드 010-2311-1211 😀</p>
      <p>Hello World</p>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{`2023년 부터 주로 웹 개발에 대해 글을 쓰고 있어요. 기술 자체보다 문제 해결을 위한 활용에 더 관심이 많은 개발자에요. 지금까지 블로그에 총 {0}개의 글을 작성했어요. 아래 검색 바를 사용하여 관심있는 주제의 글을 찾아보세요`}</p>
      {slugs.map((slug) => (
        <BlogPost key={slug} slug={slug} title={slug} content={slug} excerpt={slug} />
      ))}
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<{ slugs: string[] }> = async () => {
  const slugs = getAllSlugs()

  return {
    props: {
      slugs,
    },
  }
}
