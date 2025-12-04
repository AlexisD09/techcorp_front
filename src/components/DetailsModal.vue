<script setup>
import {ref, watch} from "vue";
const openedModalId = ref(null);
const props = defineProps(['tool', 'type']);
let tool = {};
let type = "";

const openModal = (id) => {
  openedModalId.value = id;
};

const closeModal = () => {
  openedModalId.value = null;
};

watch(
    () => props.tool,
    (newTool) => {
      tool = newTool;
    },
    { immediate: true }
);

const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', ' -')
};
</script>

<template>
  <div class="cursor-default">
    <button
        @click="openModal('details'+tool.id)"
        class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer"
    >
      View details
    </button>

    <div
        v-if="openedModalId === 'details'+tool.id"
        class="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-black/90 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
            class="absolute top-3 right-3 cursor-pointer hover:text-white text-xl"
            @click="closeModal"
        >
          ✕
        </button>

        <h2 class="text-white text-xl font-bold mb-4 flex gap-2 items-center"><img class="w-6 h-6" alt="logo" :src=tool.icon_url> {{ tool.name }}</h2>
        <p>Description : {{ tool.description }}</p>
        <p>Vendor : {{ tool.vendor }}</p>
        <p>Category : {{ tool.category }}</p>
        <p>Department : {{ tool.owner_department }}</p>
        <p v-if=tool.monthly_cost>Monthly cost : €{{ tool.monthly_cost }}</p>
        <p v-if=tool.previous_monthly_cost>Previous monthly cost : €{{ tool.previous_monthly_cost }}</p>
        <p v-if=tool.active_users_count>Active users count : {{ tool.active_users_count }}</p>
        <p>Website : <a :href=tool.website_url class="hover:text-white">{{ tool.website_url }}</a></p>
        <p>Status : <span class="status-pills"
                         :class="{
                          'green-gradient': tool.status === 'active',
                          'orange-gradient': tool.status === 'expiring',
                          'red-gradient': tool.status === 'unused'
                        }">{{ tool.status }}</span></p>
        <p class="mt-5">Created at {{ formatDate(tool.created_at) }}</p>
        <p>and updated at {{ formatDate(tool.updated_at) }}</p>

        <div class="flex justify-end gap-2 mt-4">
          <button
              class="px-4 py-2 rounded cursor-pointer hover:text-white"
              @click="closeModal"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>