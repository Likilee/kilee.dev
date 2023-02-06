import { getFileNamesInDir, getSlug, getSlugsFromDir } from 'lib/files'
import { cwd } from 'process'
import { expect, test, describe } from 'vitest'

describe('한글 슬러그 생성하기', () => {
  test('한글 + 기호', () => {
    expect(getSlug('개발자 키리 - 대한민국 최애 개발자')).toBe(
      '개발자-키리-대한민국-최애-개발자',
    )
  })
  test('한글 + 영어 + 기호', () => {
    expect(getSlug('PM/기획')).toBe('pm-기획')
  })

  test('영어 + 기호', () => {
    expect(getSlug('Alexis King said "Parse, don\'t validate"')).toBe(
      'alexis-king-said-parse-dont-validate',
    )
  })
})

// describe('디렉토리 파일명 모두 가져오기', () => {
//   test('테스트 디렉토리 읽어오기', () => {
//     const dir = getFileNamesInDir(`./__test__/test_post`)
//     expect(dir.includes('테스트1.mdx')).toBeTruthy()
//     expect(dir.includes('테스트 2- 포스트"hey".mdx')).toBeTruthy()
//   })
// })

// describe('디렉토리에서 파일 읽고 Slug 배열 뽑아오기', () => {
//   test('테스트 디렉토리 읽어서 Slug 배열 가져오기', () => {
//     const slugs = getSlugsFromDir('./__test__/test_post')
//     expect(slugs.includes('테스트1')).toBeTruthy()
//     expect(slugs.includes('테스트-2-포스트hey')).toBeTruthy()
//   })
// })
