import cn from 'classnames'
import { PropsWithChildren } from 'react'

const BadgeColor = [
  'default',
  'dark',
  'red',
  'green',
  'yellow',
  'indigo',
  'purple',
  'pink',
] as const
type BadgeColor = typeof BadgeColor[number]

const BadgeSize = ['xs', 'sm', 'md'] as const
type BadgeSize = typeof BadgeSize[number]

type Props = {
  color?: BadgeColor
  size?: BadgeSize
}

export default function BorderedBadge({
  color = 'dark',
  size = 'xs',
  children,
}: PropsWithChildren<Props>) {
  const sizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'xs':
      default:
        return 'text-xs'
    }
  }
  const colorClass = () => {
    switch (color) {
      case 'dark':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-500'
      case 'red':
        return 'bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-red-400'
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400'
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300'
      case 'purple':
        return 'bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border border-purple-400'
      case 'pink':
        return 'bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border border-pink-400'
      case 'default':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border border-blue-400'
    }
  }

  return (
    <span
      className={cn(
        sizeClass(),
        colorClass(),
        'font-medium mr-2 mb-0.5 px-2.5 py-0.5 rounded inline-block',
      )}
    >
      {children}
    </span>
  )
}
