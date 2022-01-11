# vuejs-3

## 참고 블로그
- https://heewon26.tistory.com/258 - vue3(Composition API)가 되면서 바뀌는점
- Composition API가 가능하다.
  - Composition API?
    - vue2는 data, computed, methods 부분을 나눠서 구현했는데, 같은 기능인데도 불구하고 3영역으로 나뉘어져서 가독성이 떨어질것
    - vue3는 목적에 맞는 코드를 모듈화하여 기존의 단점을 보완하고 더 유연하고 안전한 확장이 가능. 기존처럼 3영역으로 나뉘지 않고 같은 기능들은 모아둔다는 의미

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
- template 안에 무조건 `하나의 루트태그만 허용`되었지만, 이제는 복수여도 된다.

### 현재 vue3은?
```vue
<template>
  <div> ... </div>
  <div> ... </div>
</template>
```
감싸주는 루트 태그인 `<div>` 가 쓸 필요가 없어진다.

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

## 이벤트 (v-on)
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

### 줄여서 사용할때
```angular2html
v-on: -> @
v-bind: -> :
v-slot: -> #
```

## ref vs reactive
위 코드를 그대로 사용하면, click 했을때 name 변수가 반영이 안된다. 그래서 ref, reactive를 사용해야 한다.
- ref는 원시 타입의 값 (객체 포함) (.value로 접근해야함)
- reactive는 객체 (Array, Object, Map, Set)
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

## props, emit 차이
vue component 간 데이터를 주고 받을수 있음
- 부모컴포넌트에서 자식컴포넌트로 데이터를 보낼때, props를 사용한다.
- 반대로 자식컴포넌트의 데이터를 부모컴포넌트로 보낼때, context에 emit을 사용한다.

## json-server
따로 백엔드 개발 없이, Front에서 DB를 테스트해보고 싶을떄 사용
- 테스트용이기 때문에, 실제로 사용하진 않음

### 설치
```angular2html
npm install -g json-server
```

이후 root directory에 `db.json` 파일을 만듬
- db 역할을 해줄 파일

### 실행
```angular2html
json-server --watch db.json
```

## watch effect, watch
vue 내 선언한 ref, reactive 변수들의 변화를 감지하여 함수를 실행한다.
```vue
watchEffect(() => { // currentPage, nextPage가 변할때마다 함수 실행
  console.log(currentPage);
  console.log(nextPage);
})

watch(currentPage, (current, prev) => { // currentPage가 변할때마다  함수 실행
  // currentPage 0에서 1로 변할때, current는 1, prev는 0이 출력됨
  console.log(current, prev)
}
```

## vue router
vue 간 페이지 이동할때 사용
- vue3은 router 4를 설치해야됨

설치
```angular2html
npm install vue-router@4
```

## style
vue 내 `<style>`을 통해 스타일을 적용할수 있다.
- 허나 `<style>`은 다른 component들에도 적용된다 (global)
- 그렇기 때문에 해당 파일 내에서만 적용하고 싶다면 scoped를 넣어주면 된다.

```vue
<style scoped>
...
</style>
```

## vuex
vue에서 상태 관리를 할수 있음. emit, props 같이 위 부모, 자식 component에게 데이터를 넘겨줄 필요가 없음
- 단순히 데이터를 부모, 자식만 교환을 한다면 굳이 vuex를 쓸필요는 없음
- 하지만, 할아버지, 부모, 자식 이런식으로 데이터를 넘겨야한다면, vuex를 써야함

설치
```angular2html
npm install vuex@next
```