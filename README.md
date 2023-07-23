# Dev hson
> 개발자 hson의 Site 레포지토리

## 실행
```shell
$ yarn
$ yarn build && yarn start
```
[`localhost:3000`](http://localhost:3000/) 실행
## 사용
- Next.js

## **기능**

### Stage1
- [x] Page Layout
- [x] Dark Theme
- [x] Pc ↔️ Mobile 반응형
- [x] Self host font
- [ ] Blog
  - [x] SSG(Static Site generation)
  - [x] Repo에 포스팅 및 이미지 저장
  - [x] Extended markdown - gfm
  - [x] Code block 하이라이트
  - [X] 블로그 view count
  - [ ] 댓글
  - [ ] Seo 최적화
  - [X] Image 압축 Action
- [ ] Resume
  - [x] Resume 페이지
  - [ ] PDF export 기능


### Stage2
- [ ] Editor

  프로젝트 페이지 컨텐츠를 편집할 수 있다.
- [ ] Knowlege
  내가 완벽히 아는 것, 모른다는 것을 아는 것, 궁금한 것을 구분하여 관리하는 지식 관리 시스템 페이지
## 구현

## 트러블 슈팅

- Variable font 의 font weight이 가변적으로 적용되지 않고, 100,350 등 일반 폰트처럼 동작하는 문제
- Posting 내의 코드 블럭 syntax highlighting에 테마 적용
- External link ref 에 noopener norefernece 를 통해 보안 및 퍼포먼스 강화
- Safari 에서 특정 Regex가 동작하지 않는 이슈

## 학습 로그

### Tailwindcss
> 이번 프로젝트에서는 Tailwindcss를 사용하여 스타일을 관리하는 법을 알고 싶었어요. 목표 학습 범위는 dark theme 구현 기능까지에요.

1. Tailwindcss 공식문서 Nextjs Framework guide를 따라 설치 및 기본 설정을 진행했어요.

```shell
$ yarn add -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

