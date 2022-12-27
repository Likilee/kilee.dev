import React, { useEffect } from 'react'
import { Decorator } from '@storybook/react'
import { ThemeProvider } from 'next-themes'

export const withTheme: Decorator = (Story, context) => {
  const { theme } = context.globals

  // Sync 'pages/_document.tsx' default style
  useEffect(() => {
    document.body.className += ' bg-white text-black dark:bg-black dark:text-white'
  }, [])

  useEffect(() => {
    const htmlTag = document.documentElement

    htmlTag.setAttribute('class', theme || 'light')
    htmlTag.setAttribute('style', `color-scheme: ${theme || 'light'}`)
  }, [theme])

  return (
    <ThemeProvider attribute="class">
      <Story />
    </ThemeProvider>
  )
}
