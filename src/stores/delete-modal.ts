import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDeleteModalStore = defineStore('deleteModal', () => {
  const visibility: Ref<boolean> = ref(false);
  const idToDelete: Ref<number> = ref(0);

  const showModal = (id: number) => {
    visibility.value = true;
    idToDelete.value = id;
  };

  const resetModal = () => {
    visibility.value = false;
    idToDelete.value = 0;
  };

  return { visibility, idToDelete, showModal, resetModal }
})
