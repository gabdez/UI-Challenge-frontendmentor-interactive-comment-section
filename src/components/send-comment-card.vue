<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 ma-3">
        <v-container class="pa-1 pa-md-4">
            <v-row class="justify-space-between">
                <!-- Left section avatar -->
                <v-col cols="1" class="align-center order-1 order-md-0">
                    <v-avatar :image="appStore.currentUser?.image?.png || ''" />
                </v-col>
                <!-- Center section comment -->
                <v-col class="flex-basis-under-md-100 pb-1">
                    <v-textarea v-model="commentField" placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
                <!-- right section send button -->
                <v-col md="2" cols="3" class="pl-0 order-2 order-md-0">
                    <v-btn class="rounded-lg px-5" block color="moderateBlue" variant="flat" size="large"
                        :disabled="commentField === ''" @click="sendComment">
                        SEND
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<style scoped>
@media (max-width: 960px) {
    .flex-basis-under-md-100 {
        flex-basis: 100%;
    }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores/app";

const commentField = ref("");

const appStore = useAppStore();
const sendComment = () => {
    const data = appStore.data;
    const currentUser = appStore.currentUser;
    const lastComment = data.sort((a, b) => b.id - a.id)[0] || 0;
    const random = Math.floor(Math.random() * 100);
    const id = lastComment.id + random;
    const date = new Date();
    data.unshift(
        {
            id,
            content: commentField.value,
            user: currentUser,
            createdAt: date.toDateString(),
            replies: [],
            score: 0
        }
    );
    commentField.value = "";
};
</script>