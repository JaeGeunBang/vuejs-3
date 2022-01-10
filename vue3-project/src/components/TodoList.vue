<template>
  <div v-for="(todo, index) in todos_data" :key="todo.id" class="card mt-2">
    <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(todo.id)"
    >
      <div class="flex-grow-1">
        <input class="ml-2 mr-2" type="checkbox" :checked="todo.completed" @change="toggleTodo(index, $event)" @click.stop>
        <span :class="{ todo: todo.completed}" >{{ todo.subject }}</span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Delete</button>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <Modal
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
    />
  </teleport>
</template>

<script>
import {useRouter} from 'vue-router';
import Modal from '@/components/DeleteModal.vue'
import { ref } from 'vue';

export default {
  components: {
    Modal
  },
  props: {
    todos_data: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    }

    const openModal = (id) => {
      showModal.value = true;
      todoDeleteId.value = id;
    }

    const closeModal = () => {
      showModal.value = false;
      todoDeleteId.value = null;
    }

    const deleteTodo = () => {
      emit('delete-todo', todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
    }

    const moveToPage = (id) => {
      router.push({ // 이동하고 싶은 page를 적어줌
        name: 'Todo',
        params: {
          id: id
        }
      })
    }

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    }
  }
}
</script>

<style>

</style>