<template>
  <List
      :items="todos_data"
  >
    <template #default="{item, index}">
      <div
          class="card-body p-2 d-flex align-items-center"
          style="cursor: pointer"
          @click="moveToPage(item.id)"
      >

        <div class="flex-grow-1">
          <input class="ml-2 mr-2" type="checkbox" :checked="item.completed" @change="toggleTodo(index, $event)" @click.stop>
          <span :class="{ todo: item.completed}" >{{ item.subject }}</span>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">Delete</button>
        </div>
      </div>
    </template>
  </List>
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
import List from '@/components/List.vue'

export default {
  components: {
    Modal,
    List
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