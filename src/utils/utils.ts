import type { Commentary } from "@/models/comments";

export const findComment = (id: number, arr: Commentary[]): Commentary | undefined => {
    for (const comment of arr) {
        if (comment.id === id) return comment;

        if (comment.replies) {
            const match = findComment(id, comment.replies);
            if (match) return match;
        }
    }
}