import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, Commentary } from '@/models/comments';
import { findComment } from "@/utils/utils";

export const useAppStore = defineStore('app', () => {
  const currentUser: Ref<User> = ref({} as User);
  const data: Ref<Commentary[]> = ref([]);

  const deleteComment = (idToDelete: number) => {
    const i = data.value.findIndex(d => d.id === idToDelete);
    if (i !== -1) {
      data.value.splice(i, 1);
    }
  };

  const updateCommentContent = (id: number, newContent: string) => {
    const comment = findComment(id, data.value);
    if (comment) {
      comment.content = newContent;
    }
  };

  const replyComment = (rootCommentaryId: number, content: string) => {
    const rootCommentIndex = data.value.findIndex(a => a.id === rootCommentaryId);
    if (rootCommentIndex !== -1) {
      const rootCommentary = data.value[rootCommentIndex]
      const random = Math.floor(Math.random() * 10000);
      const id = rootCommentary.id + random;
      const date = new Date();
      const reply: Commentary = {
        id,
        createdAt: date.toDateString(),
        replies: [],
        content,
        replyingTo: rootCommentary.user.username,
        score: 0,
        user: currentUser.value,
      };
      rootCommentary.replies?.push(reply);
    }
  };

  return { currentUser, data, deleteComment, updateCommentContent, replyComment }
})
