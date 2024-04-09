<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 my-2">
        <v-container class="ma-0 position-relative">
            <v-row>
                <!-- Left section - +/- button -->
                <v-col cols="auto" md="1" class="align-center" order="2" order-md="0">
                    <v-sheet min-width="35px"
                        class="text-moderateBlue rounded-lg d-flex flex-md-column justify-center align-md-center px-3 py-2 ga-3"
                        color="veryLightGray">
                        <v-btn class="text-center text-lightGrayishBlue" variant="plain" size="small" density="compact"
                            icon="mdi-plus" @click="toggleScore(true)" />
                        <div class="text-center font-weight-medium" :class="{ 'text-red': comment.score < 0 }">
                            {{
                                comment.score
                            }}
                        </div>
                        <v-btn class="text-center text-lightGrayishBlue" variant="plain" size="small" density="compact"
                            icon="mdi-minus" @click="toggleScore(false)" />
                    </v-sheet>
                </v-col>
                <!-- Center/Right section -->
                <v-col class="flex-basis-under-md-100">
                    <!-- top bar (name + date + reply button) -->
                    <div class="d-flex mb-2">
                        <!-- Logo/name -->
                        <div class="me-auto">
                            <v-avatar :image="comment.user.image.png" size="small" />
                            <span class="pl-3 font-weight-medium">{{ comment.user.username }}</span>
                            <v-chip v-if="comment.user.username === appStore.currentUser.username" size="x-small" label
                                class="ml-1 bg-moderateBlue">you</v-chip>
                            <span class="pl-3 text-grey-darken-1">{{ comment.createdAt }}</span>
                        </div>
                        <!-- Actions -->
                    </div>

                    <!-- comment content -->
                    <div v-if="!editingMode" class="text-grey-darken-1">{{ comment.content }}</div>
                    <v-textarea v-else v-model="updatedContent" placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
            </v-row>
            <v-row v-if="editingMode && $vuetify.display.mdAndUp" class="mx-0" justify="end">
                <v-btn class="text-uppercase rounded-lg px-3" variant="flat" color="moderateBlue"
                    @click="updateComment">Update</v-btn>
            </v-row>

            <span v-if="!editingMode" class="position-absolute basic-position md-and-up-position">
                <div v-if="comment.user.username !== appStore.currentUser.username">
                    <v-btn class="font-weight-black-custom font-weight-bolder" color="moderateBlue" variant="text"
                        size="small" :disabled="replyMode" @click="replyMode = true">
                        <v-icon class="text-moderateBlue pr-2" variant="plain" size="large" density="compact"
                            icon="mdi-reply" />
                        Reply
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn class="font-weight-black-custom" color="softRed" variant="text"
                        :size="$vuetify.display.smAndDown ? 'x-small' : 'small'" :disabled="editingMode"
                        @click="deleteModalStore.showModal(comment.id)">
                        <v-icon class="text-softRed pr-2" variant="plain" size="large" density="compact"
                            icon="mdi-delete" />
                        Delete
                    </v-btn>
                    <v-btn class="font-weight-black-custom" color="moderateBlue" variant="text"
                        :size="$vuetify.display.smAndDown ? 'x-small' : 'small'" :disabled="editingMode"
                        @click="editingMode = true">
                        <v-icon class="text-moderateBlue pr-2" variant="plain" size="large" density="compact"
                            icon="mdi-pencil" />
                        Edit
                    </v-btn>
                </div>
            </span>
            <span v-else-if="editingMode && $vuetify.display.smAndDown" class="position-absolute basic-position">
                <v-btn class="text-uppercase rounded-lg px-3" variant="flat" color="moderateBlue"
                    @click="updateComment">Update</v-btn>
            </span>
        </v-container>
    </v-sheet>

    <v-container v-if="comment.replies && comment.replies?.length > 0" class="pa-0 max-width-800">
        <v-row no-gutters>
            <v-col cols="2" align="center">
                <v-divider inset vertical />
            </v-col>
            <v-col>
                <commentCard v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
            </v-col>
        </v-row>
    </v-container>

    <!-- Reply comment card -->
    <replyCommentCard v-if="replyMode" :rootComment="comment" @reply-comment="replyMode = false" />
</template>

<style scoped>
.font-weight-black-custom>.v-btn__content {
    font-weight: 700;
}

.max-width-800 {
    max-width: 800px;
}

.w-85 {
    width: 85% !important;
}

.basic-position {
    bottom: 20px;
    right: 12px;
}
</style>

<script setup lang="ts">
import replyCommentCard from "@/components/reply-comment-card.vue"
import type { Commentary } from '@/models/comments';
import { useAppStore } from "@/stores/app";
import { useDeleteModalStore } from "@/stores/delete-modal";
import { findComment } from "@/utils/utils";
import { ref } from 'vue';

const props = defineProps<{
    comment: Commentary
}>();

const appStore = useAppStore();
const deleteModalStore = useDeleteModalStore();

const editingMode = ref(false);
const replyMode = ref(false);
const updatedContent = ref(props.comment.content);

const toggleScore = (toggle: boolean) => {
    const comment = findComment(props.comment.id, appStore.data);
    if (comment) {
        const newScore = toggle ? -1 : +1;
        comment.score = comment.score - newScore;
    }
}

const updateComment = () => {
    appStore.updateCommentContent(props.comment.id, updatedContent.value);
    editingMode.value = false;
}
</script>