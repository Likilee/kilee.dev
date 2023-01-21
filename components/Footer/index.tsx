import cn from 'classnames'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

function ExternalLink({
  href,
  children,
  className,
}: PropsWithChildren<{ href: string; className: string }>) {
  return (
    <a className={className} target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      className={cn(
        'max-w-2xl mx-auto w-full mb-8',
        'flex flex-col justify-center items-start',
      )}
    >
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8"></hr>
      <div className="w-full flex flex-row flex-wrap justify-between">
        <div className="w-full max-w-[45%] sm:max-w-[30%]">
          <Link className="text-gray-500 hover:text-gray-600 transition block mb-4" href="/">
            Home
          </Link>
          <Link className="text-gray-500 hover:text-gray-600 transition block mb-4" href="/">
            About
          </Link>
        </div>
        <div className="w-full max-w-[45%] sm:max-w-[30%]">
          <Link
            className="text-gray-500 hover:text-gray-600 transition block mb-4"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-gray-500 hover:text-gray-600 transition block mb-4"
            href="/resume"
          >
            Resume
          </Link>
        </div>
        <div className="w-full max-w-[45%] sm:max-w-[30%]">
          <ExternalLink
            className="text-gray-500 hover:text-gray-600 transition block mb-4"
            href="https://github.com/Likilee"
          >
            Github
          </ExternalLink>
          <ExternalLink
            className="text-gray-500 hover:text-gray-600 transition block mb-2"
            href="https://github.com/Likilee"
          >
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </footer>
  )
}
