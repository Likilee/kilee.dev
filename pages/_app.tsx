import 'styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'layouts/BaseLayout'
import localFont from '@next/font/local'

const pretendardVariable = localFont({
  src: '../public/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
})

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  await import('../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <main className={pretendardVariable.variable}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </main>
    </ThemeProvider>
  )
}
