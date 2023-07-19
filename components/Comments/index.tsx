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
      repo="Likilee/kilee.dev"
      repoId="R_kgDOIyOubg"
      category="Comments"
      categoryId="DIC_kwDOIyOubs4CX_Nw"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
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
