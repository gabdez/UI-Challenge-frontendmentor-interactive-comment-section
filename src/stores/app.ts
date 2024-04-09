import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, Commentary } from '@/models/comments';
import { findComment } from "@/utils/utils";

export const useAppStore = defineStore('app', () => {
  const currentUser: Ref<User> = ref({} as User);
  const data: Ref<Commentary[]> = ref([]);

  const deleteComment = (idToDelete: number) => {
    const findAndDelete = (commentIdToDelete: number, arr: Commentary[]) => {
      for (let index = 0; index < arr.length; index++) {
        const c = arr[index];
        if (c.id === idToDelete) {
          arr.splice(index, 1);
          break;
        }
        else if (c.replies) {
          findAndDelete(commentIdToDelete, c.replies)
        }
      }
    }
    findAndDelete(idToDelete, data.value);
  };

  const updateCommentContent = (id: number, newContent: string) => {
    const comment = findComment(id, data.value);
    if (comment) {
      comment.content = newContent;
    }
  };

  const replyComment = (rootCommentaryId: number, content: string) => {
    const comment = findComment(rootCommentaryId, data.value);
    if (comment) {
      const random = Math.floor(Math.random() * 10000);
      const id = comment.id + random;
      const date = new Date();
      const reply: Commentary = {
        id,
        createdAt: date.toDateString(),
        replies: [],
        content,
        replyingTo: comment.user.username,
        score: 0,
        user: currentUser.value,
      };
      console.log(comment);
      comment.replies?.push(reply);
      console.log(comment);
    }
    console.log("------", comment);
  };

  return { currentUser, data, deleteComment, updateCommentContent, replyComment }
})
