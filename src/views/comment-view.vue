<template>
    <commentCard v-for="comment in appStore.data" :key="comment.id" :comment="comment" />
    <sendComment />
</template>

<style scoped></style>

<script setup lang="ts">
import commentCard from "@/components/comment-card.vue"
import sendComment from "@/components/send-comment-card.vue"
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

</script>