<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 ma-3">
        <v-container>
            <v-row>
                <!-- Left section avatar -->
                <v-col cols="1" class="align-center">
                    <v-avatar :image="appStore.currentUser?.image?.png || ''" />
                </v-col>
                <!-- Center section comment -->
                <v-col>
                    <v-textarea v-model="commentField" placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
                <!-- right section send button -->
                <v-col cols="2" class="pl-0">
                    <v-btn class="rounded-lg px-5" block color="moderateBlue" variant="flat" size="large"
                        :disabled="commentField === ''" @click="sendComment">
                        SEND
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<style></style>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores/app";

const commentField = ref("");

const appStore = useAppStore();
const sendComment = () => {
    const data = appStore.data;
    const currentUser = appStore.currentUser;
    const lastComment = data.sort((a, b) => b.id - a.id)[0] || 0;
    const id = lastComment.id + 1;
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