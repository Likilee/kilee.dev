import 'styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from 'layouts/BaseLayout'
import { Inter, Noto_Sans_KR } from '@next/font/google'

const inter = Inter({subsets: ['latin']})
const notoSansKr = Noto_Sans_KR({subsets: ['korean'], weight: ['100','300', '400', '500', '700', '900']});

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  await import('../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  )
}
