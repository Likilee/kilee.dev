import { PropsWithChildren, useEffect, useState } from 'react'
import NavBar from '../NavBar'

export default function Container(props: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const { children } = props;

  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
