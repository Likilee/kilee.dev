import { PropsWithChildren, useEffect, useState } from 'react'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'
import cn from 'classnames'
export default function Layout(props: PropsWithChildren) {
  const { children } = props

  return (
    <>
      <NavBar />
      <main
        className={cn(
          'bg-gray-50 dark:bg-gray-900',
          'flex flex-col justify-center px-8',
        )}
      >
        {children}
        <Footer />
      </main>
    </>
  )
}
