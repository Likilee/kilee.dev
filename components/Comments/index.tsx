import Giscus, { type Theme } from '@giscus/react'
import { useTheme } from 'next-themes'

type DefaultThemeType = Extract<
  Theme,
  | 'light'
  | 'light_high_contrast'
  | 'light_protanopia'
  | 'light_tritanopia'
  | 'dark'
  | 'dark_high_contrast'
  | 'dark_protanopia'
  | 'dark_tritanopia'
  | 'dark_dimmed'
  | 'preferred_color_scheme'
  | 'transparent_dark'
  | 'noborder_light'
  | 'noborder_dark'
  | 'cobalt'
>

export default function Comments() {
  const { resolvedTheme } = useTheme()

  return (
    <Giscus
      id="comments"
      repo="hwsonnn/hson.dev.blog"
      repoId="R_kgDOJ-rLSg"
      category="comments"
      categoryId="DIC_kwDOJ-rLSs4CYEnJ"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="bottom"
      theme={
        resolvedTheme === 'dark'
          ? ('transparent_dark' satisfies DefaultThemeType)
          : ('noborder_light' satisfies DefaultThemeType)
      }
      lang="ko"
      loading="lazy"
      inputPosition="top"
    />
  )
}
