import { BLOG_SERVER } from 'config/server'
import { rest } from 'msw'
import { Post } from 'lib/types'
import { dummyPosts } from './data/posts'

const getPosts = rest.get(`${BLOG_SERVER}/posts`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Post[]>(dummyPosts))
})

const getPostBySlug = rest.get(`${BLOG_SERVER}/post`, (req, res, ctx) => {
  const slug = req.url.searchParams.get('slug')
  const post = dummyPosts.find((post) => post.slug === slug)

  if (post) return res(ctx.status(200), ctx.json<Post>(post))
  else return res(ctx.status(404), ctx.json('Not found Post'))
})
export const handlers = [getPosts, getPostBySlug]
