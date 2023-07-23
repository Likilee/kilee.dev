// main page
import SeoHead from 'components/SeoHead'
import PageLayout from 'layouts/PageLayout'
import Image from 'next/image'
import avatar from 'public/kimmaster.png'

export default function Home() {
  const title = 'hson - 한치 앞도 모르는 인생 좋아하는 것에 몰입하며 살테다.'
  const description =
    '클라이언트 개발을 즐기며, 문제 해결에 집중하는 개발자, hson의 블로그입니다.'
  return (
    <PageLayout>
      <SeoHead title={title} description={description} ogType="blog" />
      <div className="flex flex-col-reverse justify-between sm:flex-row items-start gap-4 sm:gap-6">
        <div className="w-full">
          <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-700 ">
              hson
            </span>
          </h1>
          <h2 className="mb-4">Frontend Developer</h2>
          <p className="text-gray-500 dark:text-gray-400">
            좋은 습관을 많이 가진 괜찮은 개발자가 되고 싶어요. 새로운 기술을 익혀서 문제영역에
            어떻게 적용할지를 고민하는 것이 즐거워요. 적극적이고 도전적인 사람들과 함께 일하는
            것을 좋아하는 개발자 hson입니다.
          </p>
        </div>
        <div className="w-[80px] sm:w-[30vw] sm:max-w-[176px] mr-auto">
          <Image
            alt="hson"
            height={176}
            width={176}
            src={avatar}
            priority
            className="rounded-full filter grayscale-[25%]"
          />
        </div>
      </div>
    </PageLayout>
  )
}
