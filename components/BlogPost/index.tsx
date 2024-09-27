import cn from 'classnames'
import ViewCounter from 'components/ViewCounter'
import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import { Badge } from 'components/ui/badge'

type Props = Pick<Post, 'slug' | 'title' | 'date' | 'summary' | 'tag'>

export function BlogPost({ slug, title, summary, tag }: Props) {
  return (
    <Link className="w-full" href={`blog/${slug}`}>
      <article className="w-full mb-8">
        <div className="flex flex-col justify-between md:flex-row ">
          <div className="flex flex-col">
            <h3
              className={cn(
                'w-full mb-1', // size & spacing
                'text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100', //font
              )}
            >
              {title}
            </h3>
            {!!tag?.length && (
              <div className="flex flex-wrap items-center w-full space-x-2 mb-2">
                {tag?.map((t) => (
                  <Badge variant="secondary">{t}</Badge>
                ))}
              </div>
            )}
          </div>
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
