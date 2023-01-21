import 'styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'layouts/BaseLayout'
import localFont from '@next/font/local'
import cn from 'classnames'

const pretendardVaribale = localFont({
  src: '../public/font/PretendardKR-VF-distilled.woff2',
  variable: '--font-pretendard',
  weight: '45 1000'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <main className={cn(pretendardVaribale.variable, 'font-sans')}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </main>
    </ThemeProvider>
  )
}
