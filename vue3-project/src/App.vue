<template>
  <input
      type="text"
      v-model="name"
  >
  <button
      class="btn btn-primary"
      @click = "onSubmit"
  >
    Click
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('test')

    const onSubmit = () => {
      console.log(name.value)
    }
    return {
      name,
      onSubmit
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
