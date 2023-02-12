---
title: Fenced Codeblock 을 고급 활용기능(feat.rehype-pretty-code)
date: 2023-02-11
summary: Advenced Usage for fenced codeblock with Rehype Pretty Code
---

## Advenced Usage for fenced codeblock with Rehype Pretty Code

개발 블로그이니 만큼. 마크다운의 fenced code block 의 문법을 확장하고자 한다. 

- 코드블럭 제목
- 라인 넘버 표시 
- 줄 단위 하이라이팅 
- 단어 단위 하이라이팅

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



### 해결해야할 이슈

확장된 문법으로 marktext fenced code block에 작성하면 계속 초기화되는 현상이 있다. typora를 써야할거 같다. 



## 
