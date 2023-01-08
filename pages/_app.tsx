import '../styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  await import('../mocks')

}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <main>
      <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
