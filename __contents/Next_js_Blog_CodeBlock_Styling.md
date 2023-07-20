---
title: Next.js 블로그에서 코드 블록 꾸미기 - rehype-pretty-code 플러그인 활용법
date: 2023-02-11
summary: 이 글은 Next.js 블로그에서 rehype-pretty-code 플러그인을 사용하여 코드 블럭에 제목, 라인 넘버, 줄 단위 및 단어 단위 하이라이팅을 추가하는 방법을 다룹니다. 이 플러그인을 사용하여 블로그 글을 더 깔끔하고 이해하기 쉽게 작성할 수 있습니다.
---

## 시작하며

개발 블로그는 코드 블록을 자주 사용하기 때문에, 마크다운의 기본적인 코드 블록 기능은 개발자들에게는 조금 아쉽게 느껴집니다. 하지만 우리는 개발자이기 때문에, 우리의 블로그의 코드블록을 커스텀하여 블로그의 코드블록을 더욱 깔끔하고 이해하기 쉽게 만들 수 있습니다.

이번 글을 통해 [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) 플러그인을 사용하여 Next.js 블로그의 코드 블록 문법을 확장하여 우리의 블로그 글을 더 아름답게 만드는 법을 알아보겠습니다.

## 코드 하이라이트 플러그인 교체 이유

저는 이 블로그의 코드 블록 표현 기능 강화를 위해 이전에 rehype-highlight 플러그인을 사용하고 있었습니다. 아래는 제가 rehype-pretty-code 로 플러그인을 변경한 이유입니다. 

1. VS Code의 모든 테마 지원 : rehype-pretty-code는 **VSCode 의 테마 json 파일을 사용**해 테마 설정이 가능합니다.
2. 문법 하이라이트 : VS Code 에서 지원하는 모든 언어에 대해서 **완벽한 문법 하이라이트**를 제공합니다.
3. 다양한 **코드 블럭 확장 기능** 제공 
   - 펜스 코드 블럭(Fenced code block)에 라인 넘버 표시기능 선택적 활성화
   - 펜스 코드 블럭의 라인 하이라이트 기능
   - 펜스 코드 블럭의 단어 하이라이트 기능
   - 인라인 코드블럭 문법 하이라이트 기능 등

제가 더 많은 마크다운 코드 블록 확장 기능을 원하고 있던 것이 가장 큰 변경 이유였습니다.

## 플러그인의 역할

마크다운으로 작성한 문서를 블로그 사이트에 배포하기 위해서는 마크다운 문서를 마크업(HTML) 문서로 변환하는 단계가 필요합니다.

저는 블로그 내에서 콘텐츠 관리를 위해 [contentlayer](https://www.contentlayer.dev/) 패키지를 사용하고 있습니다. contentlayer는 마크다운 문서의 마크업 변환에 [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) 패키지를 의존하고 있습니다.

mdx-bundler는 내부적으로 마크다운 문서를 해석하여 HTML로 변환하는 [remark](https://github.com/remarkjs/remark) 패키지와 HTML을 추상 구문 트리 형태의 데이터로 만들어 사용자가 원하는 변경을 HTML에 적용할 수 있도록 도와주는 [rehype](https://github.com/rehypejs/rehype) 패키지를 사용합니다. 이러한 변환 과정에서 rehype-pretty-code 플러그인은 코드 블럭의 변환을 담당합니다.

즉, 플러그인의 역할 범위는 HTML 변환까지로 한정되며, 이후에 문서가 어떻게 보여지게 될지는 개발자가 CSS 설정을 통해 적용해야 합니다.

## 블로그에 적용한 기능

> 여담: 이 글의 초안을 완성한 시점에 rehype-pretty-code 플러그인의 버전이 0.9 에서 0.10 으로 올라갔습니다. 마이너 버전 하나가 바뀌었지만, 아직 메이저 버전 0이어서, 사용방식이 완전히 변경되어 고민하다가 마이그레이션 후 글을 다시 작성하고 있습니다 🤣

아래 목록은 현재 버전(0.10.x)에서 제공하는 기능들 입니다. 이 중 체크된 기능들은 이 블로그에 적용한 기능들입니다.

- [x] 다크/라이트에 따라 다른 테마 적용 
- [x] 선택적 줄 번호 표시
- [x] 줄 단위 하이라이트
- [x] 단어 단위 하이라이트
- [x] 단어 단위 하이라이트 여러 색상 적용
- [x] 인라인 코드 하이라이트 적용
- [x] 펜스 코드 블럭(Fenced code block)에 제목 표시
- [ ] 펜스 코드 블럭에 캡션 표시
- [ ] 일반 텍스트 하이라이트

### rehype-pretty-code 플러그인 옵션 설정

다음은 contentlayer 설정 파일내에서 rehype-pretty-code 플러그인을 적용한 부분입니다. 

```typescript title="contentlayer.config.ts" showLineNumbers{1} {5-7,15}
...
import {a} from 'test'
const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: JSON.parse(readFileSync('./code_theme/one-dark-pro-darker.json', 'utf-8')),
    light: JSON.parse(readFileSync('./code_theme/atom-one-light.json', 'utf-8')),
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
`prettyCodeOptions{:.prop}` 
#### 멀티 테마 적용 : 5-7번 줄

블로그가 Dark 테마를 지원하기 때문에 테마를 두가지를 사용하였습니다. `rehype-pretty-code` 는 VSCode 테마 중 일부를 내장 테마로 제공하기에 `dark: 'one-dark-pro'{:ts}` 처럼도 사용가능하고, 다른 테마를 사용하고 싶다면  7번 라인 처럼 vs-code 테마 중 어떤 것이든 선택하여 json 파일로 제공하면 사용가능합니다. 이는 rehype-pretty-code 가 문법 하이라이트 기능을 [shiki](https://github.com/shikijs/shiki) 를 통해 제공하기 때문에 가능한 부분입니다.

#### 설정한 플러그인 옵션 객체와 함께 플러그인 등록: 38번 줄

rehype에 플러그인으로 rehype-pretty-code 를 설정파일과 함께 등록합니다.

### 확장된 마크다운 문법 및 스타일 적용
rehype-pretty-code은 html 요소들에 사용자가 원하는대로 스타일링을 할 수 있도록 적절한 [데이터 속성](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes)을 추가해줍니다(0.10.x 버전 기준). 우리는 css의 [속성 선택자](https://developer.mozilla.org/ko/docs/Web/CSS/Attribute_selectors)를 사용하여 원하는 스타일을 적용하면 됩니다.

#### 기본 스타일 설정
```sass showLineNumbers{1} {5-7, 10-16, 19-21} title="styles/global.css" 
...
/* 💻 Code block */

/* pretty-code (shiki) recommend */
.prose pre > code {
  display: grid;
}

/* Fenced Code block - hide horizontal scrollbar: webkit */
.prose pre::-webkit-scrollbar {
  display: none;
}
/* Fenced Code block - hide horizontal scrollbar: mozila */
.prose pre {
  scrollbar-width: none;
}

/* Fenced Code block - line style */
.prose pre span[data-line] {
  @apply inline-block px-4 py-0.5 leading-snug;
}
```
**그리드 적용(5-7)**: 펜스 코드 블럭의 `display: grid{:sass}`를 적용하여 한 줄의 텍스트가 길어져도 줄바꿈이 되지 않도록 처리합니다. 공식 문서에서 추천하는 방법이고 줄 단위 하이라이트와 관련이 있습니다.

**가로 스크롤 숨김(10-16)**: Webkit 브라우저(크롬, 사파리)와 파이어폭스에서 스크롤바를 숨기기 위한 설정을 추가하였습니다. 

**각 줄 스타일(19-21)**: 펜스 코드블럭 내의 줄에 적절한 스타일을 적용해주었습니다. 저는 tailwindcss 를 사용하고 있기 때문에, `@apply{:sass}` 지시자를 사용하였습니다.

#### 줄 번호 표시 기능 사용

줄 번호가 표시되는 코드블록을 사용하고 싶다면 `showLineNumbers`를 메타데이터로 추가합니다.

~~~js title="showLineNumbers example"
```js showLineNumbers
// <code> will have attributes 'data-line-numbers'
// and 'data-line-numbers-max-digits="n"'
```
~~~

```ts showLineNumbers
const line = 1;
const line = 2;
```

`{n}`을 추가하여 시작 줄 번호를 1이 아닌 다른 수로 지정할 수 도 있습니다.
기능 사용 중 멀티 테마와 함께 사용할 시 정상 동작하지 않는 버그를 발견하고 수정하여 Contributor가 되었습니다. (뿌듯😝)

~~~js title="showLineNumbers{3} example"
```js showLineNumbers{number}
// the first line of this code block will start at {number}
```
~~~

```ts showLineNumbers{3}
const line = 3;
const line = 4;
```

해당 기능에서 rehype-pretty-code가 해주는 기능은 code 엘리먼트에 `data-line-numbers` 속성을 추가해주는 것 뿐입니다. 저희는 공식 문서 가이드에 따라 CSS의 [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) 인  `::before{:sass}` 와 , [CSS Counter](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters) 기능을 사용해서 줄 노드에 줄 번호를 추가해주도록 스타일을 적용해야합니다.

#### 줄 번호 표시 스타일 설정
```sass showLineNumbers{22} {3, 7-8}
/* Fenced Code block - line number style */
.prose code[data-line-numbers] {
  counter-reset: line;
}

.prose code[data-line-numbers] > span[data-line]::before {
  counter-increment: line;
  content: counter(line);

  display: inline-block;
  width: 0.75rem;
  margin-right: 1.25rem;
  text-align: right;
  color: gray;
}

.prose code[data-line-numbers-max-digits='2'] > span[data-line]::before {
  width: 1.25rem;
}
.prose code[data-line-numbers-max-digits='3'] > span[data-line]::before {
  width: 1.75rem;
}
```
각 줄 `::before{:sass}`에 counter(line) 의 값을 content로 추가해줍니다.

![css pseudo-element를 사용한 라인 넘버 추가](../public/images/Next_js_Blog_CodeBlock_Styling/image-20230518214637348.png)


#### 멀티 테마 스타일 설정
```sass
/* Fenced Code block - display change on theme switching*/
.light .prose pre[data-theme='dark'],
.light .prose code[data-theme='dark'],
.dark .prose pre[data-theme='light'],
.dark .prose code[data-theme='light'],
.light .prose div[data-rehype-pretty-code-title][data-theme='dark'],
.dark .prose div[data-rehype-pretty-code-title][data-theme='light'] {
  display: none;
}
```
rehype-pretty-code 는 멀티 테마를 사용할 경우, 두 개의 테마의 펜스 코드 블럭을 모두 Html에 추가 합니다. 사용자가 본인의 테마 적용방식에 따라서 나머지 테마의 코드블럭을 숨겨주는 설정이 필요합니다.

저의 블로그는 테마를 변경하면 최상단 html 엘리먼트에 class를 light 와 dark로 변경하는 방식으로 멀티 테마기능을 적용해 두었기 때문에, 위와 같은 방식으로 설정했습니다.

#### 줄 단위 하이라이트 스타일 설정

```
/* Fenced Code block - line hightlight */
.prose code span[data-highlighted-line] {
  padding-left: calc(1rem - 2px);
  @apply border-l-2 border-y-0 border-transparent border-blue-400 bg-indigo-400 dark:border-blue-500 dark:bg-slate-700  bg-opacity-10;
}

/* Fenced Code block - word highlight */
.prose span[data-highlighted-chars] {
  @apply bg-green-400 bg-opacity-25;
}
.prose span[data-highlighted-chars][data-chars-id='y'] {
  @apply bg-yellow-400 bg-opacity-25;
}
.prose span[data-highlighted-chars][data-chars-id='b'] {
  @apply bg-blue-400 bg-opacity-25;
}

/* Fenced Code block - with title style*/
.prose div[data-rehype-pretty-code-title] {
  @apply px-5 py-3 font-mono text-sm font-bold text-gray-800 bg-gray-200 border border-b-0 border-gray-200 rounded-t-lg dark:text-gray-200 dark:border-gray-700 dark:bg-gray-800;
}
.prose div[data-rehype-pretty-code-title] + pre {
  @apply mt-0 rounded-t-none;
}

/* Inline code block backtick display: none */
.prose :not(pre) > code::before,
.prose :not(pre) > code::after {
  display: none;
}

/* inline code block style */
.prose :not(pre) > code {
  @apply dark:bg-gray-900 bg-white border border-gray-200 dark:border-gray-700 font-mono text-sm font-normal align-middle py-0.5 px-1 rounded;
}
```

#### 줄 단위 하이라이트 적용 : 16-18번 라인

`onVisitHighlightedLine(node){:ts}` 매서드는 하이라이트를 원하는 라인(node)을 만났을 때 실행되는 메서드입니다. 

매서드 내에서 `line--highlighted` 클래스를 추가해주었습니다.

#### 단어 단위 하이라이트 적용: 19-30번 라인

`onVisitHighlightedWord(node, id){:ts}` 매서드는 하이라이트를 원하는 단어(node)를 만났을 때 실행되는 메서드입니다. 여러 색상을 사용하고 싶다면 추가적으로 색상 식별자인 id를 전달할 수 있습니다. 저는 두가지 색상을 사용하기 위해 `y: 'yellow'{:ts}` 와 `b: 'blue'{:ts}`  를 지정해주었습니다. 




### 문법 하이라이팅

펜스 코드블럭 우측에 language를 명시해주면 해당 언어로 문법 하이라이트가 적용됩니다.

~~~js title="syntax highlight example"
```js
const syntax = 'highlight'
```
~~~

```js
const syntax = 'highlight'
```

플러그인이 펜스 코드 블럭에 `data-language="js"` 속성을 추가하고, 변환 과정에서 하위 노드에 language에 따라 theme에 맞는 색상을 인라인 스타일로 적용합니다. 이 과정은 내부적으로 [Shiki](https://github.com/shikijs/shiki) 를 사용해서 처리합니다. 

```html title="html" {3,4} /data-language="js"/

<div data-rehype-pretty-code-fragment>
  <pre data-language="js">
    <code data-language="js" data-theme="dark">
      <span class="line">
        <span style="color: rgb(198, 120, 221);">const</span>
        <span style="color: rgb(171, 178, 191);"> </span>
        <span style="color: rgb(229, 192, 123);">syntax</span>
        <span style="color: rgb(171, 178, 191);"> </span>
        <span style="color: rgb(86, 182, 194);">=</span>
        <span style="color: rgb(171, 178, 191);"> </span>
        <span style="color: rgb(152, 195, 121);">'highlight'</span>
      </span>
    </code>
  </pre>
</div>
```



### 코드블럭 제목

제목이 있는 코드블럭을 사용하고 싶다면  `title="file.ts"`를 추가합니다. 

~~~markdown title="title example"
```js title="file.ts"
// code
```
~~~

```ts title="file.ts"
const fileName = 'file.ts'
```

`<pre>{:html}` 태그로 시작하는 코드블럭의 위에 `data-rehype-pretty-code-title{:html}` 속성을 가진 title 요소가 추가됩니다.

```html title="html" {2} /data-rehype-pretty-code-title/
<div data-rehype-pretty-code-fragment>
  <div data-rehype-pretty-code-title data-language="ts" data-theme="dark">file.ts</div>
  <pre data-language="ts" data-theme="dark">
    <code data-language="ts" data-theme="dark">
      ...
    </code>
  </pre>
</div>
```


### 줄 단위 하이라이트

**\{1-3, 4}** : 중괄호 안에 라인 넘버를 적으면 해당 줄에 하이라이트가 적용됩니다. 연속된 줄은 '-' 기호로 표기합니다.

````js title="line hightlight example"
```js {1-2,4,6}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;
```
````

```ts title="{1-2,4,6} test" {1-2,4,6}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;
```



[이전 플러그인 설정](#라인-하이라이트-적용--16-18번-라인)대로 `line--highlighted` class가 목표 노드들에 적용되어있습니다.

```html
<span class="line line--highlighted">
	...
</span>
```





### 단어 단위 하이라이트

**/word/**: `/` 사이에 하이라이트 하고자하는 단어를 적습니다. 추가로 단어의 등장 순서를 적어주면 해당 순서의 단어만 하이라이트 됩니다.

````js
```js /word/2-3
let word = 0;
word = 1;
word = 2;
word = 3;
```
````

```ts title="word highlight example" /word/2-3
let word = 0;
word = 1;
word = 2;
word = 3;
```

목표 노드에 `word--highlighted` 클래스가 추가됩니다.

```html title="html" /class="word--highlighted"/
<span class="word--highlighted" style="color: rgb(250, 137, 0);">
  word
</span>
```



**/word/#id**: 이전 규칙과 동일하게 작성하고, 이어서 `#y` 와 같이 [이전](#단어-하이라이트-적용-19-30번-라인)에 설정해둔 색상 id를 기입하면 설정해둔 색상이 적용됩니다. 

````js 
```js /blue/3#b /yellow/1-2#y
blue, yellow, blue, yellow, blue, yellow
```
````


```ts title="word highlight with color example" /blue/3#b /yellow/1-2#y
blue, yellow, blue, yellow, blue, yellow
```

목표 노드에 `word--highlighted` 클래스와 함께 설정해둔 색상 클래스가 추가됩니다.

```html title="html" /class="word--highlighted yellow"/#y /class="word--highlighted blue"/#b
<span class="word--highlighted yellow" style="color: rgb(250, 137, 0);">
  yellow
</span>
...
<span class="word--highlighted blue" style="color: rgb(250, 137, 0);">
  blue
</span>
```





## 마치며



## 참조

- [rehype-pretty-plugin 공식 가이드 문서](https://rehype-pretty-code.netlify.app/)
- [mdx-bundler 깃허브 README](https://github.com/kentcdodds/mdx-bundler)
- [shiki theme 문서](https://github.com/shikijs/shiki/blob/main/docs/themes.md#dark-mode-support)
- [rehype 깃허브 README](https://github.com/rehypejs/rehype)
- [remark 깃허브 README](https://github.com/remarkjs/remark)
- [rehype-highlight 깃허브 README](https://github.com/rehypejs/rehype-highlight)
