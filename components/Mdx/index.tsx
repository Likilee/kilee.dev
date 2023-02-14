import { useMDXComponent } from 'next-contentlayer/hooks'
import Image, { ImageProps } from 'next/image'
import { ImgHTMLAttributes } from 'react'

interface MdxProps {
  code: string
}

function RoundedImage(props: ImageProps) {
  return (
    <Image
      className="rounded-lg border border-gray-200 dark:border-gray-700"
      {...props}
      alt={props.alt}
    />
  )
}

function ImgToCustomImage(attrs: ImgHTMLAttributes<HTMLImageElement>) {
  if (!attrs.src || !attrs.alt || !attrs.width || !attrs.height)
    throw new Error("Necessary attributes in <img> tags: 'src', 'alt', 'width', 'height'")

  return (
    <RoundedImage src={attrs.src} alt={attrs.alt} width={+attrs.width} height={+attrs.height} />
  )
}

const components = {
  img: ImgToCustomImage,
}

export default function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code)

  return <MDXComponent components={components} />
}
