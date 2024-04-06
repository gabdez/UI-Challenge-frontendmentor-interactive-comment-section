<template>
  <v-app class="bg-veryLightGray">
    <v-container class="d-flex flex-column align-center" fluid>
      <commentCard v-for="comment in appStore.data" :key="comment.id" :data="comment" />
      <sendComment />
    </v-container>
  </v-app>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "./stores/app";
import commentCard from "@/components/comment-card.vue"
import sendComment from "@/components/send-comment-card.vue"

const appStore = useAppStore();

onMounted(async () => {
  const response = await fetch("./src/assets/data.json");
  const file = await response.json();
  console.log(file);
  appStore.currentUser = file.currentUser;
  appStore.data = file.comments;
});
</script>