---
title: Nextjs local font didn't swap issue
date: 2023-02-14
summary: NextJS는 폰트 옵션 중 Local Font를 사용할 때, 최적하를 위한 동작이 실행되지 않는 이슈를 만나고, 해결한 과정이다.
---

## 배경

Nextjs로 개발하고 Vercel을 통해 배포 중인, 저의 블로그에 마음에 드는 가변폰트를 적용하였습니다. 

Nextjs의 [공식문서](https://nextjs.org/docs/api-reference/next/font)를 보며, `@next/font/local` API를 사용하여 적용하였고, 눈썰미가 없어 뒤늦게 폰트가 적용되지 않고 있다는 것을 알게되었습니다. 

결론은, 기본적으로 폰트 최적하를 위해 사용한 localFont 의 option의 기본값이 존재하지 않아서 발생한 이슈였습니다.

문서 어디에도 그런 설명이 없었지만, 왜인지. 기본적으로 font swap 을 기본동작으로 가지고 있을거라고 생각했지만, 그렇지 않았습니다. 



기존 코드 

```ts title="pages/_app.tsx" showLineNumbers
const pretendardVaribale = localFont({
  src: '../public/font/PretendardKR-VF-distilled.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  preload: false,
})
```

위와 같은 설정으로 사용했을 때, 폰트 파일이 모두 로드된 후에도 Fallback font 에서 Pretendard 폰트로 swap되지 않는 현상을 발견했다. 

문서를 읽으며 display: 'swap', 옵션을 설정해주니 Arial Font 로 랜더링이 진행되고 (layout shift를 최소화할 수 있도록 NextJS가 Optimize를 해준다 - ~~원리는 다른 포스트에서 다룬다.~~)

```ts title="pages/_app.tsx" {5, 7} showLineNumbers /'swap'/ /'Arial'/
const pretendardVaribale = localFont({
  src: '../public/font/PretendardKR-VF-distilled.woff2',
  variable: '--font-pretendard',
  weight: '45 920',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Arial', //🔎 기본 값과 같다, 생략해도 된다.
})
```

---

## 결론

`@next/font/local{:js}` 을 사용해서 local font를 호스팅할 때, 자동으로 Layout Shift를 최소화 시킨 Fallback font 를 우선 적용 후, My font 의 다운로드가 완료되었을 때, Swap 하는 방식을 원한다면, localFont Api 의 `options.display = 'swap'{:js}` 을 적용해주어야한다.

![font swap](../public/images/nextjs-local-font-issue/font_swap.webp)