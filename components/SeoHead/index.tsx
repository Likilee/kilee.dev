import Head from 'next/head'
import { useRouter } from 'next/router'

interface SeoHeadProps {
  title: string
  description: string
  date?: string // pass 2023-xx-xx with new Date(post.date).toISOString()
  ogType: 'article' | 'blog' | 'website' | 'product' | 'video'
  imageUrl?: string
}

export default function SeoHead({
  title,
  description,
  date,
  ogType,
  imageUrl = 'https://hson.site/hson.png',
}: SeoHeadProps) {
  const router = useRouter()
  return (
    <Head>
      <title>{`${title} | hson`}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description} name="description" />
      <meta
        property="og:url"
        content={`${process.env.SITE_URL || 'https://hson.site'}${router.asPath}`}
      />
      <meta property="og:site_name" content="hson" />
      <link
        rel="canonical"
        href={`${process.env.SITE_URL || 'https://hson.site'}${router.asPath}`}
      />
      <meta property="og:title" content={`${title} | hson`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {date && <meta property="article:published_time" content={date} />}
    </Head>
  )
}
