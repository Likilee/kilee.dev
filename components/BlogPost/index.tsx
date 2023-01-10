import type { Post } from 'lib/types'
import Link from 'next/link'

type Props = Pick<Post, 'slug' | 'title' | 'content' | 'excerpt'>

export function BlogPost({ slug, title, content, excerpt }: Props) {
  return (
    <Link href={`blog/${slug}`}>
      <div>
        <h4>{title}</h4>
      </div>
    </Link>
  )
}
