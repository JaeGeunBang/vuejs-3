<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos_data="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { ref } from 'vue';
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

    return {
      todoStyle,
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
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
