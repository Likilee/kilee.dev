import { useMDXComponent } from 'next-contentlayer/hooks'

interface MdxProps {
  code: string
}

export default function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code)

  return <MDXComponent />
}
