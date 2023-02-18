import { ViewsTable } from 'lib/planetscale'

/* 💡 Get All View counts */
export const getAllView = async (): Promise<ViewsTable[]> => {
  const res = await fetch(`/views`)
  return res.json()
}

/* 💡 Post View Count with slug */
export const postViewBySlug = async (slug: string) =>
  fetch(`/views/${slug}`, {
    method: 'POST',
  })
