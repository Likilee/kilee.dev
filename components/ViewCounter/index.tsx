import { useAllViewCountQuery, useViewCountMutation } from 'hooks/api'
import { useEffect } from 'react'
import { TbLoaderQuarter } from 'react-icons/tb'

interface ViewCounterProps {
  slug: string
  trackView: boolean
}

export default function ViewCounter({ slug, trackView }: ViewCounterProps) {
  const { data, isLoading, isError } = useAllViewCountQuery()
  const viewsForSlug = data && data.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.count || 0)
  const increaseViewForSlug = useViewCountMutation()

  useEffect(() => {
    if (trackView) increaseViewForSlug.mutate(slug)
  }, [slug])

  if (isLoading)
    return (
      <span>
        <TbLoaderQuarter className="inline-block animate-spin" /> views
      </span>
    )
  else if (isError) return <span>​ - views </span>
  else
    return <span className="transition">{data ? `${views.toLocaleString()} views` : '​'}</span>
}
