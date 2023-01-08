'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import ThemeToggle from './ThemeToggle/ThemeToggle'

interface NavItemProps {
  href: string
  text: string
}

function NavItem({ href, text }: NavItemProps) {
  const path = usePathname()
  const isActive = path === href

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
      )}
    >
      <span>{text}</span>
    </Link>
  )
}

export default function NavBar() {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="flex gap-1">
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
          <NavItem href="/blog" text="Resume" />
        </div>
        <ThemeToggle />
      </nav>
    </div>
  )
}
