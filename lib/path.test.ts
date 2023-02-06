import { isSameFirstPath } from 'lib/path'
import { expect, test, describe } from 'vitest'

describe('첫 번째 path 일치 여부 확인', () => {
  test('"/" and "/"', () => {
    expect(isSameFirstPath('/', '/')).toBeTruthy()
  })

  test('"/blog" and "/blog"', () => {
    expect(isSameFirstPath('/blog', '/blog')).toBeTruthy()
  })

  test('"/blog" and "/blog/article-1"', () => {
    expect(isSameFirstPath('/blog', '/blog/article-1')).toBeTruthy()
  })
})
