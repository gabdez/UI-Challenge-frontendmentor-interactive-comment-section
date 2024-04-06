<template>
    <v-sheet min-height="150" max-width="800px" class="w-100 rounded-lg pa-2 ma-3">
        <v-container>
            <v-row>
                <!-- Left section - +/- button -->
                <v-col cols="1" class="align-center">
                    <v-sheet min-width="35px"
                        class="text-moderateBlue rounded-lg d-flex flex-column align-center py-2 ga-3"
                        color="veryLightGray">
                        <v-btn class="text-center text-lightGrayishBlue" variant="plain" size="small" density="compact"
                            icon="mdi-plus" @click="toggleScore(true)" />
                        <div class="text-center font-weight-medium" :class="{ 'text-red': data.score < 0 }">
                            {{
                                data.score
                            }}
                        </div>
                        <v-btn class="text-center text-lightGrayishBlue" variant="plain" size="small" density="compact"
                            icon="mdi-minus" @click="toggleScore(false)" />
                    </v-sheet>
                </v-col>
                <!-- Center/Right section -->
                <v-col>
                    <!-- top bar (name + date + reply button) -->
                    <div class="d-flex mb-2">
                        <!-- Logo/name -->
                        <div class="me-auto">
                            <v-avatar :image="data.user.image.png" size="small" />
                            <span class="pl-3 font-weight-medium">{{ data.user.username }}</span>
                            <v-chip v-if="data.user.username === appStore.currentUser.username" size="x-small" label
                                class="ml-1 bg-moderateBlue">you</v-chip>
                            <span class="pl-3 text-grey-darken-1">{{ data.createdAt }}</span>
                        </div>
                        <!-- Actions -->
                        <!-- TODO implement delete/edit button -->
                        <div v-if="data.user.username !== appStore.currentUser.username">
                            <v-btn class="font-weight-black-custom" color="moderateBlue" variant="text" size="small">
                                <v-icon class="text-moderateBlue pr-2" variant="plain" size="large" density="compact"
                                    icon="mdi-reply" />
                                Reply
                            </v-btn>
                        </div>
                        <div v-else>
                            <v-btn class="font-weight-black-custom" color="softRed" variant="text" size="small"
                                :disabled="editingMode" @click="deleteModalStore.showModal(data.id)">
                                <v-icon class="text-softRed pr-2" variant="plain" size="large" density="compact"
                                    icon="mdi-delete" />
                                Delete
                            </v-btn>
                            <v-btn class="font-weight-black-custom" color="moderateBlue" variant="text" size="small"
                                :disabled="editingMode" @click="editingMode = true">
                                <v-icon class="text-moderateBlue pr-2" variant="plain" size="large" density="compact"
                                    icon="mdi-pencil" />
                                Edit
                            </v-btn>
                        </div>
                    </div>

                    <!-- comment content -->
                    <!-- TODO add people in which it reply with @ inside the content - ex @ramsesmiron -->
                    <div v-if="!editingMode" class="text-grey-darken-1">{{ data.content }}</div>
                    <v-textarea v-else v-model="updatedContent" placeholder="Add a comment..." rows="3" hide-details
                        variant="outlined" auto-grow />
                </v-col>
            </v-row>
            <v-row v-if="editingMode" class="mx-0" justify="end">
                <v-btn class="text-uppercase rounded-lg px-3" variant="flat" color="moderateBlue"
                    @click="updateComment">Update</v-btn>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<style>
.font-weight-black-custom>.v-btn__content {
    font-weight: 700;
}
</style>

<script setup lang="ts">
import type { Commentary } from '@/models/comments';
import { useAppStore } from "@/stores/app";
import { useDeleteModalStore } from "@/stores/delete-modal";
import { ref } from 'vue';

const props = defineProps<{
    data: Commentary
}>();
const appStore = useAppStore();
const deleteModalStore = useDeleteModalStore();

const editingMode = ref(false);
const updatedContent = ref(props.data.content);

const toggleScore = (toggle: boolean) => {
    const comment = appStore.data.find(c => c.id === props.data.id);
    if (comment) {
        const newScore = toggle ? -1 : +1;
        comment.score = comment.score - newScore;
    }
}

const updateComment = () => {
    appStore.updateCommentContent(props.data.id, updatedContent.value);
    editingMode.value = false;
}
</script>