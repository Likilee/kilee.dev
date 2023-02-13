import { useAllViewCountQuery, useViewCountMutation } from 'hooks/api'
import { useEffect } from 'react'

interface ViewCounterProps {
  slug: string
  trackView: boolean
}

export default function ViewCounter({ slug, trackView }: ViewCounterProps) {
  const { data } = useAllViewCountQuery()
  const viewsForSlug = data && data.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.count || 0)
  const increaseViewForSlug = useViewCountMutation()

  useEffect(() => {
    if (trackView) increaseViewForSlug.mutate(slug)
  }, [slug])

  return <span className="transition">{data ? `${views.toLocaleString()} views` : '​'}</span>
}
