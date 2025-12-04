<script setup>
import {Bars3Icon} from "@heroicons/vue/24/outline";
import { useToolsStore } from "@/stores/tools.store.js";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import DetailsModal from "@/components/modals/DetailsModal.vue";
import EditModal from "@/components/modals/EditModal.vue";
const props = defineProps(['page']);
const toolStore = useToolsStore();
const openedDropdownId = ref(null);

watch(
    () => props.page,
    (newPage) => {
      if (newPage === "tools") {
        toolStore.fetchTools();
      } else {
        toolStore.fetch30DaysAgoTools();
      }
    },
    { immediate: true }
);

const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', ' -')
};

const toggleDropdown = (id) => {
  openedDropdownId.value =
      openedDropdownId.value === id ? null : id;
};

const closeOnOutsideClick = (e) => {
  if (!e.target.closest(".dropdown-wrapper")) {
    openedDropdownId.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", closeOnOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeOnOutsideClick);
});
</script>

<template>
  <div class="w-auto">
    <div v-if="toolStore.loading">Chargement...</div>

    <table id="tools" class="w-full">
      <thead>
        <tr>
          <th class="text-start">Tool</th>
          <th class="text-start" v-if="props.page === 'page'">Description</th>
          <th class="text-start" v-if="props.page === 'page'">Category</th>
          <th class="text-start cursor-pointer" @click="toolStore.setSort('owner_department')">
            Department <span>{{ toolStore.sortOrder === 'desc' ? '▼' : '▲' }}</span>
          </th>
          <th class="text-start">Users</th>
          <th class="text-start cursor-pointer" @click="toolStore.setSort('monthly_cost')">
            Monthly Cost <span>{{ toolStore.sortOrder === 'desc' ? '▼' : '▲' }}</span>
          </th>
          <th class="text-start" v-if="props.page === 'page'">Last update</th>
          <th class="text-start cursor-pointer" @click="toolStore.setSort('status')">
            Status <span>{{ toolStore.sortOrder === 'desc' ? '▼' : '▲' }}</span>
          </th>
          <th class="text-start">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="tool in toolStore.paginatedTools"
            :key="tool.id"
            class="hover:bg-gray-700"
        >
          <td><span class="flex items-center gap-2"><img class="w-5 h-5" alt="logo" :src=tool.icon_url>{{ tool.name }}</span></td>
          <td v-if="props.page === 'page'">{{ tool.description }}</td>
          <td v-if="props.page === 'page'">{{ tool.category }}</td>
          <td>{{ tool.owner_department }}</td>
          <td>{{ tool.active_users_count }}</td>
          <td>€{{ tool.monthly_cost }}</td>
          <td v-if="props.page === 'page'">{{ formatDate(tool.updated_at) }}</td>
          <td><span class="status-pills"
                    :class="{
                          'green-gradient': tool.status === 'active',
                          'orange-gradient': tool.status === 'expiring',
                          'red-gradient': tool.status === 'unused'
                        }"
          >{{tool.status}}</span></td>
          <td>
            <div class="relative dropdown-wrapper">
              <button class="hover:text-gray-300 hover:cursor-pointer" @click="toggleDropdown(tool.id)">
                <Bars3Icon class="w-5 h-5" />
              </button>

              <div class="absolute mt-2 w-32 border-1 rounded-md border-gray-600/30 bg-black shadow-lg group-hover:block" v-if="openedDropdownId === tool.id"
                   :class="{
                          'left-2 bottom-6': props.page === 'tools',
                          'bottom-6': props.page === 'dashboard'
                        }"
              >
                <EditModal :tool=tool />
                <DetailsModal :tool=tool />
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer" @click="toolStore.toggleStatus(tool)">{{ tool.status === 'active' ? 'Disable' : 'Enable' }}</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  @reference "@/assets/main.css";

  table#tools th,
  table#tools td {
    @apply p-4 border-b-1 border-gray-600/30;
  }

  table#tools th {
    @apply border-gray-600/50;
  }

</style>