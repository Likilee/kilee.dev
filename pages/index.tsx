import PageLayout from 'layouts/PageLayout'

export default function Home() {
  return (
    <PageLayout>
      <div>
        <h1 className="mb-1 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-700 ">
            Kilee
          </span>
        </h1>
        <h2 className="mb-4">Frontend Developer</h2>
        <p className="text-gray-500 dark:text-gray-400">
          좋은 습관을 많이 가진 괜찮은 개발자가 되고자해요. 농구 스포츠 클라이밍 웨이크보드를
          좋아해요.
        </p>
      </div>
    </PageLayout>
  )
}
