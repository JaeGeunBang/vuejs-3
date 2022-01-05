<template>
  <div v-bind:class="nameClass">
    {{ name }}
  </div>
  <input v-bind:type="type" v-bind:value="name">
  <button
      class="btn btn-primary"
      @click = "updateName"
  >
    Click
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('test')
    const type = ref('text')
    const nameClass = ref('name')

    const greeting = () => {
      return 'Hello'
    }

    const updateName = () => {
      name.value = "Coder"
      type.value = "text";
    }
    return { // object로 return하며, return 된 값은 <template> 내에서 사용가능하다.
      name,
      type,
      nameClass,
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
