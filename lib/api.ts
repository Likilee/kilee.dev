import { ViewsTable } from 'lib/db/planetscale'

/* 💡 Get All View counts */
export const getAllView = async (): Promise<ViewsTable[]> => {
  const res = await fetch(`/api/views`)
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(await res.text())
  }
}

/* 💡 Post View Count with slug */
export const postViewBySlug = async (slug: string) =>
  fetch(`/api/views/${slug}`, {
    method: 'POST',
  })
