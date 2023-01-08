import { rest } from 'msw'
import { Post } from '../lib/types'
import { dummyPosts } from './data/posts'

export const handlers = [
  rest.get('http://api/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<Post[]>(dummyPosts))
  }),
]
