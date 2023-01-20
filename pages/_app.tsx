import 'styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'layouts/BaseLayout'
import localFont from '@next/font/local'
import cn from 'classnames'

const suitVariable = localFont({
  src: '../public/font/SUITE-Variable.woff2',
  variable: '--font-suite',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <main className={cn(suitVariable.variable, 'font-sans')}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </main>
    </ThemeProvider>
  )
}
