# Dev Kilee
> 개발자 kilee의 Jam Stack Site 프로젝트.

## 실행
```shell
$ yarn install
$ yarn build && yarn start
```
[`localhost:3000`](http://localhost:3000/) 실행
## 사용
- Next.js

## 기능

### Stage1
- [ ] Page Layout
- [ ] Dark Theme
- [ ] Pc ↔️ Mobile 반응형
- [ ] Self host font
- [ ] Blog
  - [ ] SSG(Static Site generation)
  - [ ] 한글 Slug
  - [ ] Extended markdown
  - [ ] Code block 하이라이트
  - [ ] 블로그 view count
  - [ ] 댓글
  - [ ] Seo 최적화
- [ ] Resume
  - [ ] PDF export 기능

### Stage2
- [ ] Editor

  프로젝트 페이지 컨텐츠를 편집할 수 있다.
- [ ] Knowlege
  내가 완벽히 아는 것, 모른다는 것을 아는 것, 궁금한 것을 구분하여 관리하는 지식 관리 시스템 페이지
## 구현

## 트러블 슈팅

## 학습 로그

### Tailwindcss
> 이번 프로젝트에서는 Tailwindcss를 사용하여 스타일을 관리하는 법을 알고 싶었어요. 목표 학습 범위는 dark theme 구현 기능까지에요.

1. Tailwindcss 공식문서 Nextjs Framework guide를 따라 설치 및 기본 설정을 진행했어요.

```shell
$ yarn add -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

