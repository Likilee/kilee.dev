import { PropsWithChildren, useEffect, useState } from 'react'
import NavBar from '../NavBar'

export default function Container(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
