# vuejs-3

## 설치
- 공식 홈페이지 참조 (CLI 설치 방법)
- https://v3.vuejs.org/guide/installation.html#cli

```angular2html
npm install -g @vue/cli
vue create vue3-project
```

## Vueje 폴더구조
public/index.html
- `<div id ="app"></div>` 와 같이 id가 app인 div에 모든 vue 코드가 실행된다.
- 가장 먼저 src/main.js를 실행시킨다.

main.js
- App.vue를 호출한다.

App.vue
- 실제 html, javascript, css 코드가 작성되어있으며, 실제 components/HelloWorld.vue를 호출한다.

## Component란?
Vue에서 사용하는 구성요소라 보면 됨 

### vue Component의 구성
- template (htlm 코드가 들어간다.)
- script (javascript 로직)
- style (css 코드가 들어간다.)

```vue
<template>
  <div class="name">{{ name }}</div>
</template>

<script>
export default {
  setup() {
    const name = 'test'
    return { // object로 return하며, return 된 값은 <template> 내에서 사용가능하다.
      name
    }
  }
}
</script>

<style>
 .name {
   color: red;
 }
</style>
```

## Fragment 

### 이전 vue2는?
```vue
<template>
    <div>
      <div> ... </div>
      <div> ... </div>
    </div>
</template>
```
불필요한 감싸주는 `<div>`가 하나 더 들어가야한다.

### 현재 vue3은?
```vue
<template>
  <div> ... </div>
  <div> ... </div>
</template>
```
감싸주는 `<div>` 가 쓸 필요가 없어진다.

## 함수 만들기
```vue
<template>
  <div class="name">
    {{ greeting() }}
  </div>
</template>
<script>
    export default {
        setup() {
            const name = 'test'
          
            const greeting = () => {
              return 'Hello'
            }
            return { // object로 return하며, return 된 값은 <template> 내에서 사용가능하다.
                name,
                greeting,
            }
        }
    }
</script>
```
생성한 greeting() 함수를 반환해주면, 마찬가지로 <template>에서 접근할수 있다.
- 함수는 변수와 다르게 `..()` 가 필요하다.

## 이벤트
웹사이트에서 어떤 행동을 했을때 어떤 일이 일어난다. (ex. 클릭)

```vue
<template>
  <div class="name">
    {{ name }}
  </div>

  <button
      class="btn btn-primary"
      v-on:click="updateName"
  >
    Click
  </button>
</template>
```

consoleLog() 라는 함수를 `<script>`내 정의해주면 된다.

## ref vs reactive
위 코드를 그대로 사용하면, click 했을때 name 변수가 반영이 안된다. 그래서 ref, reactive를 사용해야 한다.
- ref는 int, string을 사용할때
- reactive는 object, array를 사용할때
```vue
<template>
  <div class="name">
    {{ name }}
    {{ name2 }}
  </div>

  <button
      class="btn btn-primary"
      v-on:click="updateName"
  >
    Click
  </button>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const name = ref('test') // string, int 넣을때 ref 사용
    const name2 = reactive({ // object, array 넣을때 reactive 사용
      id: 1
    })

    const greeting = () => {
      return 'Hello'
    }

    const updateName = () => {
      name.vaule = "test2"
      name2.id = 2;
    }
    return { // object로 return하며, return 된 값은 <template> 내에서 사용가능하다.
      name,
      name2,
      greeting,
      updateName,
    }
  }
}
</script>
```