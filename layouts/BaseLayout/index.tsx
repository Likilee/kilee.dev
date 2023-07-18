import { PropsWithChildren } from 'react'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'
import cn from 'classnames'

export default function BaseLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <>
      <NavBar />
      <main
        className={cn(
          'bg-gray-50 dark:bg-gray-900',
          'flex flex-col justify-center px-4',
          'font-sans',
        )}
      >
        {children}
        <Footer />
      </main>
    </>
  )
}
