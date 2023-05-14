---
title: Vue3를 사용해서 제품을 개발하고있는 프론트엔드 개발자. 
date: 2023-05-04
summary: 요약 필요
---

목표 독자 : Vue3를 사용해서 제품을 개발하고있는 프론트엔드 개발자. 

핵심 주제 : 

- vue3 앱에서 퍼포먼스 저하 이슈가 발생했을 때, Chrome Performance profiling을 통해 원인을 파악하는 방법과, Vue-dev-tool를 사용하여 Vue컴포넌트 레벨의 원인 지점을 파악하는 방법에 대한 가이드

사용 자료 : 실제 제품에서 발생한 퍼포먼스 저하 이슈를, Chrome Performance Profiling 을 통해 Long Task 가 원인임을 파악하고, vue-dev-tool을 사용하여 원인이 되는 컴포넌트를 찾아낸 사례

### Chat GPT를 활용한 목차 설계

아래는 목차 설계 예시입니다. Vue3를 사용해서 제품을 개발하고 있는 프론트엔드 개발자를 대상으로 작성되었으며, Chrome Performance profiling과 Vue-dev-tool를 사용하여 Vue3 앱에서 퍼포먼스 저하 이슈를 해결하는 방법에 대해 설명합니다.

목차:

1. 개요

- Vue3 앱에서 퍼포먼스 저하 이슈가 발생하는 이유
- 이번 가이드에서 다룰 내용

1. Chrome Performance Profiling을 사용한 퍼포먼스 저하 원인 파악

- Chrome DevTools의 Performance 탭 소개
- Long Task를 통한 원인 파악 방법
- Case Study: Vue3 앱에서 Long Task 문제 해결하기

1. Vue-dev-tool을 사용한 원인 지점 파악

- Vue-dev-tool 소개
- 컴포넌트 레벨에서 원인 지점 파악 방법
- Case Study: Vue3 앱에서 컴포넌트 레벨 문제 해결하기

1. Conclusion

- 이번 가이드를 통해 배운 내용 정리
- 추후 Vue3 앱 개발에서 퍼포먼스 저하 이슈가 발생했을 때, 사용할 수 있는 해결 방법 요약

이렇게 목차를 설계하면, Vue3를 사용해서 제품을 개발하고 있는 프론트엔드 개발자를 대상으로 한 퍼포먼스 저하 이슈 해결 가이드라는 것을 명확하게 전달할 수 있습니다. 또한, 자료를 활용한 케이스 스터디를 통해 실제 상황에서 어떻게 해결해 나갈 수 있는지에 대한 예시도 제공하므로, 독자들이 보다 실용적인 도움을 받을 수 있을 것입니다.



## 시작하며

> "틀린 문제에서 올바른 답은 나올 수 없다" - 영화 이상한 나라의 수학자

문제 해결 과정에서 가장 중요한 부분은, 정확한 문제의 원인을 진단하는 것입니다.

그렇기 때문에 개발 과정에서 마주칠 수 있는 여러가지 문제의 원인을 빠르고 정확하게 파악하는 방법을 익히는 것은, 개발자가 지속적으로 키워야하는 필수적인 역량이라고 생각합니다.

이 글에서 제가 Vue3를 사용한 프론트엔드 프로젝트에서 발생한 퍼포먼스 이슈의 원인을  **Chrome Devtools Performance panel** 과 **Vue Devtool Performance** 측정 기능을 활용하여 진단한 과정을 소개해드리겠습니다.

## 개요

현재 회사에서 진행하고 있는 Vue3를 사용한 대시보드 서비스 개발 중, 위젯을 설정하기 위한 다이얼로그 컴포넌트(이하 EditWidetDialog)의 나타나는 반응속도가 매우 느려지는 퍼포먼스 이슈를 발견하게 되었습니다. 해당 기능은 사용자들이 서비스에서 가장 많이 사용하는 기능 중 하나이기 때문에, 문제 해결이 필요했습니다.

Vue3 앱에서 퍼포먼스 저하 이슈가 발생하는 이유는 여러 가지가 있을 수 있습니다. 대부분의 경우 '긴 **스크립트** 실행 시간', '불필요한 **렌더링'**, '불필요한 **데이터 로딩**', '**큰 정적파일** 로딩'이 주요 원인입니다.

제가 겪은 퍼포먼스 이슈의 원인은 EditWidgetDialog 내에서 매우 많은 양의 옵션을 제공하는 Select 컴포넌트가 모든 옵션 컴포넌트를 동기적으로 마운트하는 과정에서 발생한 '긴 스크립트 실행 시간'이었습니다. 

원인을 진단한 과정은 다음과 같습니다. 

1. [Chrome Devtools Performance panel](https://developer.chrome.com/docs/devtools/performance/) 을 사용하여 병목 구간 발생 원인이 [Long Tasks](https://web.dev/long-tasks-devtools/) (긴 스크립트 실행 시간)이라는 것을 알게되었습니다. 

2. [Vue Devtool](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) Performance 측정 기능을 사용하여 Long Tasks를 발생시키는 컴포넌트를 특정하였습니다. 

3. 컴포넌트 내에서 사용하는 element-plus 의 ElSelect 컴포넌트가 Slot으로 사용하는 ElOption 컴포넌트를 다루는 방식이 많은 양의 Option을 처리할 때, 성능을 저하시킬 수 있다는 점을 알게되었습니다. 

## 문제 발견 

![Dashboard](../public/images/vue3-performance-profiling/image-20230509113614994.png "title that will be used a caption")

<sup>*< 대시보드 페이지 >*</sup>

퍼포먼스 이슈가 발생한 페이지는 대시보드 페이지였습니다. 서비스의 특성 상 대시보드에서 데이터 시각화를 위한 다양한 위젯을 사용합니다. 

대시보드에서 새로운 위젯을 추가하기 위한 단계는 다음과 같습니다.:

1. `Add Widget{:js}`(우측에 있는 파란색 버튼)을 클릭한다.
2. 1에 의해 나타난 `AddWidgetDialog{:js}` 컴포넌트에서 생성하고자하는 위젯의 타입을 선택한다.
3. 2에 의해 나타난 `EditWidgetDialog{:js}` 컴포넌트에서 어떠한 데이터를 받아올지, 받아온 데이터를 어떠한 형태로 그릴지를 설정한다.

2번에서 위젯의 타입을 선택한 뒤 EditWidgetDialog가 나타나는 시간이 오래걸리는 현상이 발견되었습니다.

![Add Widget](../public/images/vue3-performance-profiling/image-20230509114943532.png)

<sup>*< AddWidgetDialog >*</sup>

![Edit Widget](../public/images/vue3-performance-profiling/image-20230509115023445.png)

<sup>*< EditWidgetDialog 컴포넌트 >*</sup>

## 프로파일링으로 원인 찾기

### Chrome Devtools Performance Panel

Chrome Devtool은 앱의 Performance를 측정할 수 있는 Performance Profiling 도구를 제공합니다. Performance 기능을 사용해보지 않으셨다면, [공식 문서](https://developer.chrome.com/docs/devtools/performance/) 튜토리얼을 진행해보시는 것을 추천드립니다. 

### 측정 환경 설정

측정 환경은 변수를 줄이기 위해 Chrome Incognito 모드로 진행하고, 10 회 측정하였습니다.

개발자 도구 설정은 아래와 같이 진행했습니다.

> Network 패널 > Disable cache : true
>
> Performance 패널 > CPU : No throttling

네트워크 캐시 사용이 실험을 오염시킬 수 있기 때문에 Disable cache를 활성화 시켜주었습니다.

현재 개발 중인 제품은 Mobile 환경의 사용을 목표로 하지 않기 때문에, Performance Throttling은 주지 않았습니다. 

![Test Page](../public/images/vue3-performance-profiling/image-20230509121617718.png)

<sup>*< 실험용 Dashboard 페이지   >*</sup>

다른 위젯들의 Network 자원 사용이 변수가 될 수 있기 때문에, 테스트를 진행하기 위한 대시보드를 새로 생성해 주었습니다. 

![Long Task](../public/images/vue3-performance-profiling/image-20230509121858362.png)

<sup>*< 1회차 Profiling 결과 >*</sup>

퍼포먼스 프로파일링을 시작하고 Add Widget > Time Line Chart 를 선택하여 EditWidgetDialog가 랜더링 된 뒤, 녹화를 종료하였습니다. 



![First Sammary](../public/images/vue3-performance-profiling/image-20230509122551603.png)

<sup>*< 1회차 측정 Summary >*</sup>

프로파일링 결과에서 병목구간을 확인해보면, 클릭 이벤트에 따라 자바스크립트의 긴 실행이 원인이 되고 있다는 것을 알 수 있었습니다. (Long Task)

반복 실험 후 P90(표본 중 상위 90% 위치에 있는 표본), P50(표본 중 중앙 값)을 확인해보았습니다. 평균이 아닌 P90을 확인한 이유는 서비스 관점에서 바라볼 때, 사용자 10명 중 1명이 겪는 Delay라고 가정하기 위해서 입니다. - 물론 실험 환경이 모두 동일한 PC에서 였기 때문에 실제 사용시의 P90과는 다르겠지만, 서비스의 퍼포먼스 이슈를 측정할 때는 평균보다 더 나은 지표이기 때문에 사용했습니다. 

동일한 조건으로 10회 측정 결과 **P90: 603ms**, **P50: 436ms**, 으로 측정되었습니다.

| 시간      | 측정 회 차 |
| --------- | ---------- |
| 838ms     | 4          |
| **603ms** | **2**      |
| 442ms     | 10         |
| 437ms     | 7          |
| **436ms** | **1**      |
| 431ms     | 9          |
| 426ms     | 6          |
| 363ms     | 5          |
| 320ms     | 8          |
| 202ms     | 3          |

*< 10회 측정 결과 시간 기준 정렬 >*

즉 제품을 사용하는 사용자 중 절반은 해당 기능을 사용할 때, 400ms 이상의 지연시간을 겪고, 사용자 중 10%는 600ms 이상의 지연을 겪을 수 있다는 것을 확인했습니다.  300ms 이상의 지연은 UX를 떨어뜨리기 때문에, 개선이 필요하다고 판단할 수 있었습니다. 

### Vue Devtool을 통한 Performance 측정

Performance Profile 패널을 통해 지연 시간의 원인이 클릭 이벤트에 따른 스크립트 실행이라는 것을 알게되었습니다. 

프로젝트 코드는 Vue로 구성되어있기 때문에, 어떤 컴포넌트 레벨에서 문제가 발생했는지를 확인하기 위해 Chrome Devtool Performance Profiling을 통해서는 한계가 있었습니다.

해당 Project는 Vue3를 사용하여 개발했기 때문에 원인이 되는 컴포넌트를 찾기 위해 Vue Devtool의 Performance 기능을 사용했습니다. React나 다른 프레임워크를 사용해서 개발 중인 프로젝트라면, 해당 프레임워크의 개발도구에서 Performance 또는 Profiler와 같은 이름의 기능이 있는지 확인해보세요. 

![vue devtool profiler](../public/images/vue3-performance-profiling/image-20230509134726044.png)

<sup>*< Vue Devtool Performance Profiling 결과 >*</sup>

Profiling 결과를 확인해보니 <sup>*</sup>Flame Graph가 위와 같은 모양으로 표시되었다. 

> #### <sup>*</sup>Flame Graph
>
> 플레임 그래프(Flame Graph)는 소프트웨어 프로파일링(software profiling)에서 사용되는 시각화 도구입니다. 프로파일링이란 컴퓨터 프로그램 실행 중에 발생하는 함수 호출과 같은 이벤트를 측정하여 프로그램의 실행 시간, 자원 사용 등을 분석하는 기술입니다.
>
> 플레임 그래프는 프로파일링 결과를 시각적으로 표현하여 함수 호출 흐름을 파악하기 쉽게 합니다. 가장 많은 시간이 소요된 함수는 그래프의 상단에 위치하며, 하위 함수는 하단에 위치합니다. 각 함수의 크기는 해당 함수가 소요한 시간의 양을 나타냅니다.
>
> 래퍼런스 : [brendangregg.com/flamegraphs](https://www.brendangregg.com/flamegraphs.html)



![First span](../public/images/vue3-performance-profiling/image-20230509210529903.png)

<sup>*< Vue Devtool Performance Profiling 결과 2 >*</sup>

형태를 보면 단일 이벤트가 아닌 반복적인 고드름 모양의 이벤트들이 힘을 합쳐 병목을 만들어낸 것처럼 보인다. 첫번 째 고드름부터 확인해보자. 

![profiling result scale up](../public/images/vue3-performance-profiling/image-20230509210643303.png)

<sup>*< Profiling 결과 확대 >*</sup>

첫번 째 고드름을 확대시킨 Graph를 살펴보니 `ElSelect` 컴포넌트가 마운트되는 과정에서 많은 시간이 소요되고 있었습니다.

`EditWidgetDialog` 컴포넌트는 내부적으로 Widget 의 설정을 위한 `Select` 컴포넌트를 많이 사용하고 있습니다.

고드름들의 패턴이 ElSelect 컴포넌트에 의해 발생하는지를 확인해 보기 위해, 나머지 고드름들의 끝 단을 살펴보겠습니다.

![bottleneck points](../public/images/vue3-performance-profiling/image-20230509212012866.png)

<sup>*< 반복되는 병목 컴포넌트 발견 >*</sup>

예상대로 모든 고드름들에 반복적으로  `ElSelect` 컴포넌트가 존재했습니다. 이제 퍼포먼스 병목의 원인이 되는 컴포넌트는 `ElSelect` 라고 특정할 수 있게되었습니다.

그렇다면 해당 컴포넌트에서 왜 이러한 원인이 발생되는지를 더 확인해보겠습니다.

![image-20230509212716444](../public/images/vue3-performance-profiling/image-20230509212716444.png)

<sup>*< 병목 구간의 말단 확인 >*</sup>

ElSelect를 사용하는 컴포넌트 중 특히 가장 많은 시간을 지연시킨 고드름의 말단을 살펴보니, 무수히 많은 작은 이벤트들이 촘촘히 발생하고 있습니다.

아마도, 이들이 힘을 합쳐 만들어낸 위대한 업적으로 보여집니다. 이 이벤트들이 무엇인지 더 크게 키워봅시다.

![leaf node scale up](../public/images/vue3-performance-profiling/image-20230509213246108.png)

<sup>*< 병목 구간의 말단 확대 >*</sup>

이미지를 자세히 보니 `ElOption` 컴포넌트가 반복되고 있었습니다. 여기까지 확인해보니, 원인이 무엇일지 예상이 가기 시작했습니다. 

![a lot of options](../public/images/vue3-performance-profiling/image-20230509214501591.png)

실제 ElSelect를 사용하여 구현한 컴포넌트의 동작 예시입니다. Select를 클릭하여 나타나는 Options PopOver의 우측을 보세요. 스크롤바가 생긴게 보이시나요? 

해당 Select 컴포넌트는 API를 응답을 통해 받아온 무수히 많은 옵션 중 하나를 선택하는 기능을 합니다. 

관련 코드를 살펴봅시다.

```vue "title=hi"
<template>
  <div>
    <ElSelect
      size="medium"
      width="100%"
      placeholder="Select"
      v-bind="$attrs"
      remote
      filterable
      :loading="isLoading"
    >
      <ElOption
        v-for="option in options"
        :key="option"
        :label="option"
        :value="option"
      />
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    options: string[];
    isLoading: boolean;
  }
  defineProps<Props>();
</script>

```

prop으로 전달받은 options 배열을 `ElOption`  v-for를 통해 반복생성하여 `ElSelect`의 slot으로 전달하고 있습니다. (`ElSelect` 의 공식 사용 방식입니다)

`ElSelect` 가 어떤 방식으로 Option PopOver를 생성하는지 개발자 도구의 Elements 탭에서 확인해보겠습니다.

![a lot of elements](../public/images/vue3-performance-profiling/image-20230509215603627.png)

Element Tab을 확인해보니 ElSelect 컴포넌트가 마운트 될 때, Dom 트리에는 모든 option들이 `<li>{:html}` 엘리먼트로  생성되고 이를 자손으로 가지는 `el-popper`  class의 `<div>{:html}` 엘리먼트가 추가된다. 

`PopOver` 는 Select를 클릭할 때 마다  `display: none` 을 inline style로 추가/제거 하는 방식으로 동작했다. 

이러한 방식의 ElSelect의 동작은 매우 많은 양의 option을 사용할 경우 퍼포먼스 저하이슈를 만들 수 있는 방식이다. 



## 문제 해결 방법 조사

먼저 원인이 된 [`ElSelect`  컴포넌트](https://element-plus.org/en-US/component/select.html#select)의 공식문서를 확인해보았다.

![elselect docs](../public/images/vue3-performance-profiling/image-20230509224004120.png)

공식문서의 Select 컴포넌트 설명을 보면, Option이 아주 많을 경우에는 Drop-down menu 컴포넌트 사용을 추천하고 있다. 

또한, 많은 양의 Option 데이터를 로딩해서 사용하는 경우를 위해 베타 버전으로 [SelectV2 컴포넌트](https://element-plus.org/en-US/component/select-v2.html#background)를 제공하기도 한다.

해당 이슈에 대해서 이미 라이브러리 개발자가 인지하고 있고 정확하게 많은 양의 옵션을 사용할 경우 다른 컴포넌트를 활용하라고 안내하고있었다. 

### 문제 해결

문제 해결 과정은 이 글의 주제가 아니기 때문에 짧게 넘어가겠습니다. 

우리 팀은 ElSelectV2에 대해서 테스트해보고 적합하다고 판단하여 ElSelect를 ElSelectV2로 교체하는 작업을 진행했습니다.

ElSelectV2는 Slot 형태로 Options을 받지 않고, Prop으로 Options 를 받아서 메모리 상에서만 데이터를 가지고 있다가, 사용자가 옵션을 선택하기 위해 PopOver를 띄울 때, 필요한 만큼의 option만 Dom에 랜더링 하는 방식으로 구현되어있었습니다.

문제를 해결한 뒤, 동일 환경에서 퍼포먼스 측정 결과 P90 120ms 로 5배 정도의 개선효과를 볼 수 있었습니다.

## 결론

개발을 하며 만나는 이슈의 원인을 빠르고 정확하게 파악하는 것은 개발자에게 중요한 능력입니다. 그렇기 때문에 대부분의 이슈의 원인을 파악하기 위한 도구들은 훌륭한 개발자들에 의해 발전되어 있습니다. 

프론트엔드 프로젝트에서 퍼포먼스 이슈가 발생했을 때는, 브라우저 개발자 도구와 사용하는 Framework의 개발자 도구에서 제공하는 Profiler를 활용하여 측정을 통해 원인을 더 빠르고 정확하게 파악할 수 있습니다. 

어디선가 이런말을 들은적이 있는거 같습니다. 측정할 수 없는 것은 개선할 수 없다. 업무를 진행할 때, 무언가를 정말로 개선하기 위해서는 올바른 측정이 선행되어야 한다는 생각을 끝으로 마칩니다.
