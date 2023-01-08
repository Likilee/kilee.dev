import { Post } from '../../lib/types'

const post1: Post = {
  _id: '1',
  slug: 'post1',
  content: `
  # 테스트 포스트 1 입니다.

## 오늘 날씨 정말 조오타

TIme to know \`about kilee\`
  `,
  title: '테스트 포스트 1입니다',
}

const post2: Post = {
  _id: '2',
  slug: 'post2',
  content: `
  # 테스트 포스트 2 입니다.

## 오늘 날씨 정말 조오타

TIme to know \`about kilee\`
  `,
  title: '테스트 포스트 2입니다',
}

const post3: Post = {
  _id: '3',
  slug: 'post3',
  content: `
  # 테스트 포스트 3 입니다.

## 오늘 날씨 정말 조오타

TIme to know \`about kilee\`
  `,
  title: '테스트 포스트 3입니다',
}

export const dummyPosts: Post[] = [post1, post2, post3]
