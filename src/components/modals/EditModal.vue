<script setup>
import {reactive, ref} from "vue";
import { useToolsStore } from "@/stores/tools.store.js";
const toolStore = useToolsStore();

const openedModalId = ref(null);
const props = defineProps({
  tool: Object,
});

const formData = reactive({ ...props.tool });

const submitForm = async () => {
  try {
    await toolStore.updateToolData(formData);
    closeModal();
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
  }
};

const openModal = (id) => {
  openedModalId.value = id;
};

const closeModal = () => {
  openedModalId.value = null;
};
</script>

<template>
  <div class="cursor-default">
    <button
        @click="openModal('edit'+tool.id)"
        class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer"
    >
      Edit
    </button>

    <div
        v-if="openedModalId === 'edit'+tool.id"
        class="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-black/90 rounded-lg shadow-lg p-6 relative">
        <button
            class="absolute top-3 right-3 cursor-pointer hover:text-white text-xl"
            @click="closeModal"
        >
          ✕
        </button>

        <h2 class="text-white text-xl font-bold mb-4 flex gap-2 items-center"><img class="w-6 h-6" alt="logo" :src=tool.icon_url> {{ tool.name }}</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <input v-model="formData.id" type="hidden">
          <div class="flex justify-between gap-10">
            <div>
              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Name</label>
                <input v-model="formData.name" type="text" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Description</label>
                <textarea v-model="formData.description" class="w-full border rounded p-2"></textarea>
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Vendor</label>
                <input v-model="formData.vendor" type="text" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Category</label>
                <input v-model="formData.category" type="text" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Monthly Cost</label>
                <input v-model.number="formData.monthly_cost" type="number" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Previous Month Cost</label>
                <input v-model.number="formData.previous_month_cost" type="number" class="w-full border rounded p-2" />
              </div>
            </div>
            <div>
              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Owner Department</label>
                <input v-model="formData.owner_department" type="text" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold">Status</label>
                <select v-model="formData.status" class="w-full border rounded p-2 bg-black">
                  <option value="active">Active</option>
                  <option value="expiring">Expiring</option>
                  <option value="unused">Unused</option>
                </select>
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold mb-1">Website URL</label>
                <input v-model="formData.website_url" type="text" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold mb-1">Active Users</label>
                <input v-model.number="formData.active_users_count" type="number" class="w-full border rounded p-2" />
              </div>

              <div class="flex flex-col gap-1 mb-4">
                <label class="text-white font-semibold mb-1">Icon URL</label>
                <input v-model="formData.icon_url" type="text" class="w-full border rounded p-2" />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="closeModal" class="text-white orange-gradient px-4 py-2 rounded hover:cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="blue-purple-gradient text-white px-4 py-2 rounded hover:cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>