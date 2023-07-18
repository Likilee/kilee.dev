import cn from 'classnames'
import { PropsWithChildren } from 'react'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-start', // flex
        'max-w-3xl mx-auto mb-16 w-full', // size & spacing
      )}
    >
      {children}
    </div>
  )
}
