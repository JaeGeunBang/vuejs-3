<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button class="btn btn-primary" @click="moveToCreatePage()">Create Todo</button>
    </div>

    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    >
    <hr />
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
import TodoList from '@/components/TodoList'
import axios from '@/axios'
import { useToast } from '@/composables/toast'
import { useRouter } from 'vue-router'

export default {
  components: {
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
    const {toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();
    const router = useRouter();

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
            `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        triggerToast('Something went wrong', 'danger')
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

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate'
      })
    }

    const addTodo = async (todo) => {
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        })

        await getTodos(1) ;
      } catch(err) {
        console.log(err)
        triggerToast('Something went wrong', 'danger')
      }
    }

    const deleteTodo = async (id) => {
      try {
        await axios.delete('todos/' + id)
        await getTodos(1) ;
      } catch(err) {
        console.log(err)
        triggerToast('Something went wrong', 'danger')
      }
    }

    const toggleTodo = async (index, checked) => {
      try {
        const id = todos.value[index].id
        await axios.patch('todos/' + id, {
          completed: checked
        })
      } catch(err) {
        console.log(err)
        triggerToast('Something went wrong', 'danger')
      }
      todos.value[index].completed = checked
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
      showToast,
      toastMessage,
      toastAlertType,
      moveToCreatePage,
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
