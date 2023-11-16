import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import MobileNavMenu from 'components/MobileNavMenu'
import { isSameFirstPath } from 'lib/path'

interface NavItemProps {
  href: string
  text: string
}

function NavItem({ href, text }: NavItemProps) {
  const path = usePathname()
  const isActive = isSameFirstPath(path ?? '', href)

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'font-normal text-gray-600 dark:text-gray-400',
        'p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all',
      )}
    >
      <span>{text}</span>
    </Link>
  )
}

export default function NavBar() {
  return (
    <div className="flex flex-col justify-center px-4">
      <nav className="flex items-center justify-between  w-full relative max-w-3xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <MobileNavMenu />
        <div className="hidden md:flex gap-1 ml-[-0.6rem] ">
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
          {/* <NavItem href="/resume" text="Resume" /> */}
        </div>
        <ThemeToggle />
      </nav>
    </div>
  )
}
