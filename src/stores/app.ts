import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, Commentary } from '@/models/comments';

export const useAppStore = defineStore('app', () => {
  const currentUser: Ref<User> = ref({} as User);
  const data: Ref<Commentary[]> = ref([]);

  const deleteComment = (idToDelete: Number) => {
    const i = data.value.findIndex(d => d.id === idToDelete);
    if (i !== -1) {
      data.value.splice(i, 1);
    }
  };

  return { currentUser, data, deleteComment }
})
