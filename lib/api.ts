import { ViewsTable } from 'lib/planetscale'

const apiServer =
  process.env.NODE_ENV === 'production'
    ? `${process.env.SITE_URL}/api`
    : 'http://localhost:3000/api'

/* 💡 Get All View counts */
export const getAllView = async (): Promise<ViewsTable[]> => {
  const res = await fetch(`${apiServer}/views`)
  return res.json()
}

/* 💡 Post View Count with slug */
export const postViewBySlug = async (slug: string) =>
  fetch(`${apiServer}/views/${slug}`, {
    method: 'POST',
  })
