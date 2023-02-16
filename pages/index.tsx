import SeoHead from 'components/SeoHead'
import PageLayout from 'layouts/PageLayout'
import Image from 'next/image'
import avatar from 'public/kimmaster_256.png'

export default function Home() {
  const title = '김마스터 - 도전과 성장을 즐기는 웹 프론트엔드 개발자'
  const description =
    '웹 프론트엔드 개발을 즐기며, 기술적인 도전과 함께 문제 해결에 집중하는 개발자, 김마스터의 블로그입니다.'
  return (
    <PageLayout>
      <SeoHead title={title} description={description} ogType="blog" />
      <div className="flex flex-col-reverse justify-between sm:flex-row items-start gap-4">
        <div className="w-full">
          <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-700 ">
              KIM MASTER
            </span>
          </h1>
          <h2 className="mb-4">Frontend Developer</h2>
          <p className="text-gray-500 dark:text-gray-400">
            좋은 습관을 많이 가진 괜찮은 개발자가 되고자해요. 새로운 기술을 익혀서 문제영역에
            어떻게 적용할지를 고민하는 것이 즐거워요. 농구와 스포츠클라이밍을 좋아하고, 여름마다
            아내와 웨이크보드를 타고 지내요.
          </p>
        </div>
        <div className="w-[80px] sm:w-[176px] relative mr-auto">
          <Image
            alt="Kim Master"
            height={176}
            width={176}
            src={avatar}
            sizes="30vw"
            priority
            className="rounded-2xl sm:rounded-3xl filter grayscale-[25%]"
          />
        </div>
      </div>
    </PageLayout>
  )
}
