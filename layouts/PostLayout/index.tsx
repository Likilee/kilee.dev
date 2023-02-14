import Image from 'next/image'
import { PropsWithChildren } from 'react'
import avatar from 'public/avatar.jpg'
import { format, parseISO } from 'date-fns'
import cn from 'classnames'
import { Post } from 'contentlayer/generated'
import ViewCounter from 'components/ViewCounter'

type Props = {
  post: Post
}

export default function PostLayout({ post, children }: PropsWithChildren<Props>) {
  return (
    <article
      className={cn(
        'flex flex-col justify-center items-start', // flex
        'max-w-2xl mx-auto mb-16 w-full', // size & spacing
      )}
    >
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        {post.title}
      </h1>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center w-full gap-1">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={avatar}
            alt="Picture of the author"
            width={24}
            height={24}
            sizes="20vw"
            className="rounded-full"
          />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {`Kilee / `}
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {post.readtime}
          {` • `}
          <ViewCounter slug={post.slug} trackView />
        </div>
      </div>
      {/* 아바타, 저자명, 작성일 */}
      <div className="mt-4 prose prose-slate md:prose-lg dark:prose-invert w-full max-w-none">
        {children}
      </div>
    </article>
  )
}
