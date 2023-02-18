import { PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from 'styles/MobileNavMenu.module.css'
import useDelayedRender from 'use-delayed-render'
import Link from 'next/link'
import { TbX, TbMenu } from 'react-icons/tb'

function MunuItem({
  show,
  delayMS,
  children,
}: PropsWithChildren<{ show: boolean; delayMS: `${number}ms` }>) {
  const tailwindDelayClass = `delay-[${delayMS}]`
  return (
    <li
      className={cn(
        'border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm font-semibold pb-4',
        'transition-{opacity, transform, width}',
        tailwindDelayClass,
        styles.menuItemBeforeRender,
        show && styles.menuItemRendered,
      )}
    >
      {children}
    </li>
  )
}
export default function MobileNavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(isMenuOpen, {
    enterDelay: 20,
    exitDelay: 300,
  })

  const handleToggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      setIsMenuOpen(true)
    }
  }

  return (
    <>
      <button
        className="ml-[-0.6rem] md:hidden w-10 h-10 bg-transparent transition-opacity relative "
        aria-label="Toggle menu"
        type="button"
        onClick={handleToggleMenu}
      >
        <TbMenu
          className={cn(
            'h-5 w-5 absolute text-gray-900 dark:text-gray-100',
            'absolute top-1/2 left-1/2',
            'translate-x-[-50%] translate-y-[-50%] scale-100 opacity-100 transition-{opacity, transform} transition-transform duration-300',
            isMenuOpen && 'opacity-0 translate-x-[-50%] translate-y-[-50%] scale-0',
          )}
        />
        <TbX
          className={cn(
            'h-5 w-5 absolute text-gray-900 dark:text-gray-100',
            'absolute top-1/2 left-1/2',
            'translate-x-[-50%] translate-y-[-50%] scale-100 opacity-100 transition-opacity transition-transform duration-300',
            !isMenuOpen && 'opacity-0 translate-x-[-50%] translate-y-[-50%] scale-0',
          )}
        />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            'flex flex-col absolute gap-6 bg-gray-50 dark:bg-gray-900',
            'dark:bg-gray-900 bg-gray-50',
            'pb-1 pr-7',
            'left-0 top-24 h-[calc(100vh-6rem)] w-full',
            'z-10',
            styles.menuBeforeRender,
            isMenuRendered && styles.menuRendered,
          )}
        >
          <MunuItem show={isMenuRendered} delayMS="150ms">
            <Link href="/" onClick={handleToggleMenu}>
              Home
            </Link>
          </MunuItem>{' '}
          <MunuItem show={isMenuRendered} delayMS="175ms">
            <Link href="/blog" onClick={handleToggleMenu}>
              Blog
            </Link>
          </MunuItem>
          <MunuItem show={isMenuRendered} delayMS="200ms">
            <Link href="/resume" onClick={handleToggleMenu}>
              Resume
            </Link>
          </MunuItem>
        </ul>
      )}
    </>
  )
}
