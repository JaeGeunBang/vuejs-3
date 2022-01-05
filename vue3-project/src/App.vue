<template>
  <div class="name">
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
