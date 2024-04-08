<template>
  <v-app class="bg-veryLightGray">
    <v-container class="d-flex flex-column align-center" fluid>
      <commentView />
      <deleteModal />
    </v-container>
  </v-app>
</template>

<style scoped></style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "./stores/app";
import deleteModal from "@/components/delete-modal.vue"
import commentView from "@/views/comment-view.vue"

const appStore = useAppStore();

onMounted(async () => {
  const response = await fetch("./data.json");
  const file = await response.json();
  appStore.currentUser = file.currentUser;
  appStore.data = file.comments;
});
</script>