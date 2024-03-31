import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/comments';

export const useAppStore = defineStore('app', () => {
  const currentUser: Ref<User> = ref({} as User);
  const data: Ref<Comment[]> = ref([]);

  return { currentUser, data }
})
