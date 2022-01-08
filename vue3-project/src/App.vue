<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>

    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos_data="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">
            Previous
          </a>
        </li>
        <li
            v-for="page in numberOfPages"
            :key="page"
            class="page-item"
            :class="currentPage === page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
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
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });
    const searchText = ref('');

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
            `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    getTodos();

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch((searchText), () => {
      clearTimeout(timeout); // n,e,w 를 모두 치면 3번 db 요청이 가는데, timeout을 활용해 new만 db 요청을 할수있다.
      timeout = setTimeout(() => {
        getTodos(1);
      }, 1000)
    })

    const addTodo = async (todo) => {
      error.value = '';
      try {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        })

        await getTodos(1) ;
      } catch(err) {
        console.log(err)
        error.value = "[POST] Something went wrong."
      }
    }

    const deleteTodo = async (index) => {
      try {
        const id = todos.value[index].id
        await axios.delete('http://localhost:3000/todos/' + id)
        await getTodos(1) ;
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

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
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
