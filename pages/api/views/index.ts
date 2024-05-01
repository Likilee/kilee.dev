import { queryBuilder } from 'lib/db/vercel-postrgres'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await queryBuilder.selectFrom('views').select(['slug', 'count']).execute()
    return res.status(200).json(data)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}
