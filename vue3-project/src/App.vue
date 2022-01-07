<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
    >
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!filteredTodos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos_data="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm'
import TodoList from './components/TodoList'

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([
      {id: 1, subject: '휴대폰 사기', completed: false},
      {id: 2, subject: '장보기', completed: false}
    ])

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const addTodo = (todo) => {
      todos.value.push(todo)
    }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }

    const searchText = ref('')
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value)
        });
      }

      return todos.value
    })

    return {
      todoStyle,
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
    }
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>
