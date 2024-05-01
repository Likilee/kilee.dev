import { queryBuilder } from 'lib/db/vercel-postrgres'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slug = req.query.slug!.toString()
    const data = await queryBuilder
      .selectFrom('views')
      .where('slug', '=', slug)
      .select(['count'])
      .execute()

    const views = !data.length ? 0 : Number(data[0].count)

    if (req.method === 'POST') {
      await queryBuilder
        .insertInto('views')
        .values({ slug, count: 1 })
        .onConflict((conflict) => conflict.column('slug').doUpdateSet({ count: views + 1 }))
        .execute()

      return res.status(200).json({
        count: views + 1,
      })
    }

    if (req.method === 'GET') {
      return res.status(200).json({ count: views })
    }
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
