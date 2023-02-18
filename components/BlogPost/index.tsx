import cn from 'classnames'
import ViewCounter from 'components/ViewCounter'
import { Post } from 'contentlayer/generated'
import Link from 'next/link'

type Props = Pick<Post, 'slug' | 'title' | 'date' | 'summary'>

export function BlogPost({ slug, title, summary }: Props) {
  return (
    <Link className="w-full" href={`blog/${slug}`}>
      <article className="w-full mb-8">
        <div className="flex flex-col justify-between md:flex-row ">
          <h3
            className={cn(
              'w-full mb-2', // size & spacing
              'text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100', //font
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'w-32 mb-4 md:mb-0 text-left md:text-right', // size & spacing
              'text-gray-500 ', // font
            )}
          >
            <ViewCounter slug={slug} trackView={false} />
          </p>
        </div>
        <p className={cn('text-gray-600 dark:text-gray-400')}>{summary}</p>
      </article>
    </Link>
  )
}
