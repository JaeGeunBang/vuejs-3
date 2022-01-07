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
    <div style="color: red">{{ error }}</div>

    <div v-if="!filteredTodos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos_data="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm'
import TodoList from './components/TodoList'
import axios from 'axios'

export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todos = ref([])
    const error = ref('')

    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos')
        todos.value = res.data
      } catch(err) {
        console.log(err)
        error.value = "[GET] Something went wrong."
      }
    }

    getTodos();

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const addTodo = async (todo) => {
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        })
        todos.value.push(res.data)
      } catch(err) {
        console.log(err)
        error.value = "[POST] Something went wrong."
      }
    }

    const deleteTodo = async (index) => {
      try {
        const id = todos.value[index].id
        await axios.delete('http://localhost:3000/todos/' + id)
        todos.value.splice(index, 1);
      } catch(err) {
        console.log(err)
        error.value = "[DELETE] Something went wrong."
      }
    }

    const toggleTodo = async (index) => {
      try {
        const id = todos.value[index].id
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed,
        })
      } catch(err) {
        console.log(err)
        error.value = "[PATCH] Something went wrong."
      }
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
      error,
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
