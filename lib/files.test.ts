import { getSlug } from 'lib/files'
import { expect, test, describe } from 'vitest'

describe('한글 슬러그 생성하기', () => {
  test('한글 + 기호', () => {
    expect(getSlug('개발자 키리 - 대한민국 최애 개발자')).toBe(
      '개발자-키리-대한민국-최애-개발자',
    )
    expect(getSlug('테스트용마크다운')).toBe('테스트용마크다운')
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
