const dev = process.env.NODE_ENV !== 'production'

export const BLOG_SERVER = dev ? 'http://localhost:3000' : 'http://localhost:3000'
