---
title: Next.js 블로그에서 코드 블록 꾸미기 - rehype-pretty-code 플러그인 활용법
date: 2023-02-11
summary: 이 글은 Next.js 블로그에서 rehype-pretty-code 플러그인을 사용하여 코드 블럭에 제목, 라인 넘버, 줄 단위 및 단어 단위 하이라이팅을 추가하는 방법을 다룹니다. 이 플러그인을 사용하여 블로그 글을 더 깔끔하고 이해하기 쉽게 작성할 수 있습니다.
---

개발 블로그는 코드 블록을 자주 사용하기 때문에, 마크다운의 fenced code block 문법을 확장하고자 할 때가 있습니다. 이번 글에서는 [`rehype-pretty-code`](https://github.com/atomiks/rehype-pretty-code) 플러그인을 사용하여 Next.js 블로그의 fenced code block 문법을 확장하여 코드 블록 제목, 라인 번호, 줄 및 단어 단위 하이라이팅을 추가하는 방법을 알아보겠습니다. 이 기능을 활용하면 블로그 글을 더욱 깔끔하고 이해하기 쉽게 작성할 수 있습니다.

## 코드 하이라이트 플러그인 교체 이유

사실 `rehype-pretty-code` 를 적용하기 이전에 [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight) 플러그인을 사용하고 있었습니다. 아래는 제가 플러그인을 변경한 이유입니다. 

1. VS Code 테마 지원 : rehype-pretty-code는 VS Code 의 테마 json 파일을 사용해 테마 설정이 가능하다. (내부적으로 Shiki 사용하기 떄문)
2. VS Code 에서 지원하는 모든 언어 안정적으로 지원 (내부적으로 Shiki 사용하기 떄문)
3. 다양한 코드 블럭 확장 기능 제공 : 라인 넘버 선택적 표시, 라인 하이라이트, 인라인 하이라이트 등 여러가지 확장 기능을 제공합니다.

## 플러그인 설정

제가 사용하는 기능의 목록입니다.

- Multiple theme : 다크/라이트에 다른 테마 적용
- 코드블럭 제목 표시 
- Line Number 표시
- Line Hightlight
- Word Hightlight
- Word Hightlight 색상 지정

rehype은 markdown을 html로 변경하는 단계에서 동작하는 모듈이고, rehype-pretty-code 플러그인은 그 과정에서 code block 변환에 관여합니다. 

그렇기 때문에, 위 기능들을 완성하기 위해서는, 두 가지 작업이 필요합니다. 

1. rehype-pretty-code 플러그인 옵션 설정
2. 관련 css 적용 

```typescript title="contentlayer.config.ts" showLineNumbers {5-7,17,20,22-29,38}
...

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: {
    dark: 'one-dark-pro',
    /* 💡Copy https://github.com/saicharan-m/light-plus-noctis/blob/main/themes/Noctis%20Light%2B-color-theme.json */
    light: JSON.parse(readFileSync('./code_theme/light-plus-noctis.json', 'utf-8')),
  },
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('line--highlighted')
  },
  onVisitHighlightedWord(node: any, id: string) {
    node.properties.className = ['word--highlighted']

    if (id) {
      /* 💡 In markdown:' ```ts /target1/#y /target2/#b ' will highlight all matched text yellow or blue*/
      const colorClass = {
        y: 'yellow',
        b: 'blue',
      }[id]
      node.properties.className.push(colorClass)
    }
  },
}

export default makeSource({
  mdx: {
    ...,
    rehypePlugins: [
			...
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
})

```





### 코드블럭 제목

**title="file.ts"** : 추가해주면 code block에 title 이 추가된다.

~~~markdown title="example"
```js title="..."
//code
```
~~~

```ts title='title="file.ts"'
const fileName = 'file.ts'
```



### 라인 넘버 표시

**showLineNumbers**:  코드블럭에 라인 넘버를 표시하려면 `showLineNumbers` 를 작성하면된다.

~~~markdown title="showLineNumbers example"
```js showLineNumbers
// <code> will have attributes `data-line-numbers` and// `data-line-numbers-max-digits="n"
```
~~~

```ts title="showLineNumbers test" showLineNumbers
const line = 1;
const line = 2;
```

showLineNumbers\{n}: 시작 라인 넘버 번호를 지정할 수 도 있다.

~~~markdown title="showLineNumbers{3} example"
```js showLineNumbers{number}
// the first line of this code block will start at {number}
```
~~~

```ts showLineNumbers{3} title="showLineNumbers{3} test"
const line = 3;
const line = 4;
```

 ### 줄 단위 하이라이트

**\{1-3, 4}** : 중괄호 안에 라인 넘버를 담으면 하이라이팅된다

```ts title="{1-2,4,6} test" {1-2,4,6}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;
```

### 단어 단위 하이라이트

**/\{word}/2-3** : `/` 사이에 찾고자 하는 단어와, 단어의 index 범위를 명시하면 해당 순서의 단어만 하이라이트된다. (index 범위를 명시하지 않으면 전체 하이라이트가 된다.

```ts title="/word/2-3 test" /word/2-3
let word = 0;
word = 1;
word = 2;
word = 3;
```

```ts title="/blue/3#b /yellow/1-2#y test" /blue/3#b /yellow/1-2#y
blue, yellow, blue, yellow, blue, yellow
```

