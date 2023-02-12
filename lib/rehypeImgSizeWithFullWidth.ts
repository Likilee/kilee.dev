import imageSize from 'image-size'
import path from 'path'
import { Processor } from 'unified'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'
import { promisify } from 'util'

const sizeOf = promisify(imageSize)

interface ImageNode extends Node {
  type: 'element'
  tagName: 'img'
  properties: {
    src: string
    height?: number
    width?: number
    priority?: boolean
  }
}

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode
  // console.log('HERE', img)
  if (img.type !== 'element') return false
  if (img.tagName !== 'img') {
    return false
  }
  if (!img.properties) return false

  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith('/')
}

async function addMetadata(node: ImageNode): Promise<void> {
  const res = await sizeOf(path.join(process.cwd(), 'public', node.properties.src))
  if (!res || !res.width || !res.height)
    throw Error(`Invalid image with src "${node.properties.src}"`)

  const FULL_WIDTH = Number(process.env.IMAGE_FULL_WIDTH) || 672
  const ratio = FULL_WIDTH / res.width

  node.properties.width = Math.round(res.width * ratio)
  node.properties.height = Math.round(res.height * ratio)
}

export default function rehypeImgSizeWithFullWidth(this: Processor) {
  return async function transformer(tree: Node): Promise<Node> {
    const imgNodes: ImageNode[] = []

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node)
      }
    })

    for (const node of imgNodes) {
      await addMetadata(node)
    }

    return tree
  }
}
