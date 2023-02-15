/* 💡 https://www.npmjs.com/package/next-sitemap */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL
    ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL
    : 'https://kilee.dev',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  // ...other options
}
