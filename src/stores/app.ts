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

  const updateCommentContent = (id: Number, newContent: string) => {
    const i = data.value.findIndex(d => d.id === id);
    if (i !== -1) {
      data.value[i].content = newContent;
    }
  };

  return { currentUser, data, deleteComment, updateCommentContent }
})
