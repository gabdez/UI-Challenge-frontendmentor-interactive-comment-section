<template>
  <v-app>
    <v-container>
      <commentCard />
    </v-container>
  </v-app>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "./stores/app";
import commentCard from "@/components/comment-card.vue"

const appStore = useAppStore();

onMounted(async () => {
  const response = await fetch("./src/assets/data.json");
  const file = await response.json();
  appStore.currentUser = file.currentUser;
  appStore.data = file.comments;
});
</script>
