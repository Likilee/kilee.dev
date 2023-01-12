import cn from 'classnames'
import { PropsWithChildren } from 'react'

export default function PageLayout({ children }: PropsWithChildren) {
  return <div className={cn('flex flex-col justify-center items-start max-w-2xl mx-auto mb-16')}>{children}</div>
}
