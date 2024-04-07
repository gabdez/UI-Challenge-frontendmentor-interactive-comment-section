<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 ma-2 mb-8">
        <v-container>
            <v-row>
                <!-- Left section - +/- button -->
                <v-col cols="1" class="align-center">
                    <v-avatar :image="appStore.currentUser.image.png" size="small" />
                </v-col>
                <!-- Center/Right section -->
                <v-col>
                    <!-- comment content -->
                    <!-- TODO add people in which it reply with @ inside the content - ex @ramsesmiron -->
                    <v-textarea v-model="replyContent" autofocus placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
                <v-col cols="2">
                    <v-btn class="text-uppercase rounded-lg px-3" variant="flat" color="moderateBlue"
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