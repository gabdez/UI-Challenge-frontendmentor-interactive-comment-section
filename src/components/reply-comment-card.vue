<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 mb-8">
        <v-container class="pa-0 pa-md-4">
            <v-row class="justify-space-between">
                <!-- Left section - +/- button -->
                <v-col cols="1" class="align-center order-1 order-md-0">
                    <v-avatar :image="appStore.currentUser.image.png" />
                </v-col>
                <!-- Center/Right section -->
                <v-col class="flex-basis-under-md-100 pb-1">
                    <!-- comment content -->
                    <!-- TODO add people in which it reply with @ inside the content - ex @ramsesmiron -->
                    <v-textarea v-model="replyContent" autofocus placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
                <v-col md="2" cols="3" class="pl-0 order-2 order-md-0">
                    <v-btn class="text-uppercase rounded-lg px-5" block variant="flat" size="large" color="moderateBlue"
                        @click="replyComment">Reply</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<style></style>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { Commentary } from '@/models/comments';
import { useAppStore } from "@/stores/app";

const emit = defineEmits(['replyComment'])
const props = defineProps<{
    rootComment: Commentary
}>();
const appStore = useAppStore();

const replyContent = ref(`@${props.rootComment.user.username}, `);

const replyComment = () => {
    appStore.replyComment(props.rootComment.id, replyContent.value);
    replyContent.value = `@${props.rootComment.user.username}, `;
    emit("replyComment");
}

</script>