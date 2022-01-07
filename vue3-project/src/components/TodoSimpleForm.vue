<template>
  <form
      @submit.prevent="onSubmit"
  >
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
        >
      </div>
      <div>
        <button
            class="btn btn-primary"
            type="submit"
        >
          Add
        </button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">
      This field cannot be empty
    </div>
  </form>
</template>

<script>
  import { ref } from "vue";

  export default {
    emits: ['add-todo'],
    setup(props, context) { // 자식컴포넌트 (TodoSimpleForm)에서 부모컴포넌트 (App)으로 넘길때, 필요한게 context
      const todo = ref('')
      const hasError = ref(false);

      const onSubmit = () => {
        if (todo.value === '') {
          hasError.value = true
        } else {
          hasError.value = false
          context.emit('add-todo', { // emit을 통해 자식컴포넌트 값을 부모컴포넌트한테 넘겨줄때 사용한다.
            id: Date.now(),
            subject: todo.value,
            completed: false
          });
          todo.value = ''
        }
      }

      return {
        todo,
        hasError,
        onSubmit,
      }
    }
  }
</script>

<style>

</style>