<template>
    <v-dialog v-model="deleteModalStore.visibility" max-width="350" persistent>
        <v-card title="Delete comment">
            <v-card-text class="text-grey-darken-1"> Are you sure you want to delete this comment? This will remove the
                comment and can't be
                undone.
            </v-card-text>
            <template v-slot:actions>
                <v-container class="w-100 d-flex justify-center pt-0">
                    <v-row no-gutters class="ga-2">
                        <v-col>
                            <v-btn block color="grey" variant="flat" class="pa-5" @click="cancel">
                                No, Cancel
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block color="softRed" variant="flat" class="pa-5 text-uppercase"
                                @click="deleteComment">
                                Yes, delete
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-container>
            </template>
        </v-card>
    </v-dialog>
</template>

<style></style>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useDeleteModalStore } from "@/stores/delete-modal";

const deleteModalStore = useDeleteModalStore();
const appStore = useAppStore();

const cancel = () => {
    deleteModalStore.resetModal();
}
const deleteComment = () => {
    const id = deleteModalStore.idToDelete;
    appStore.deleteComment(id);
    deleteModalStore.resetModal();
}
</script>