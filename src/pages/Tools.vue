<script setup lang="ts">
import { useToolsStore } from "@/stores/tools.store.js";
import { Bars3Icon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
import { onBeforeUnmount, onMounted, ref } from "vue";

const store = useToolsStore();
store.fetchTools();

const formatDate = (date) => {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', ' -')
};

const openedDropdownId = ref(null);

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
  <div class="flex flex-col p-7">
    <div class="w-full p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div v-if="store.loading">Chargement...</div>

      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Tools</h2></div>
      </div>

      <div class="flex gap-5 items-center">
        <div class="mb-4 flex gap-2">
          <select v-model="store.filters.department" class="border px-2 py-1 rounded bg-black h-10">
            <option value="">All department</option>
            <option v-for="dep in store.departments" :key="dep" :value="dep">{{ dep }}</option>
          </select>

          <select v-model="store.filters.status" class="border px-2 py-1 rounded bg-black h-10">
            <option value="">All status</option>
            <option v-for="st in store.statuses" :key="st" :value="st">{{ st }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-2 w-60">
          <label>Cost range</label>

          <input
              type="range"
              min="0"
              max="4000"
              step="10"
              v-model.number="store.filters.minCost"
              class="blue-purple-gradient"
          />

          <input
              type="range"
              min="0"
              max="4000"
              step="10"
              value="4000"
              v-model.number="store.filters.maxCost"
          />

          <div class="text-sm">
            €{{ store.filters.minCost }} - €{{ store.filters.maxCost }}
          </div>
        </div>
      </div>

      <div class="w-auto">
        <table id="tools" class="w-full">
          <thead>
          <tr>
            <th class="text-start">Tool</th>
            <th class="text-start">Description</th>
            <th class="text-start">Category</th>
            <th class="text-start cursor-pointer" @click="store.setSort('owner_department')">
              Department <span>{{ store.sortOrder === 'desc' ? '▼' : '▲' }}</span>
            </th>
            <th class="text-start">Users</th>
            <th class="text-start cursor-pointer" @click="store.setSort('monthly_cost')">
              Monthly Cost <span>{{ store.sortOrder === 'desc' ? '▼' : '▲' }}</span>
            </th>
            <th class="text-start">Last update</th>
            <th class="text-start cursor-pointer" @click="store.setSort('status')">
              Status <span>{{ store.sortOrder === 'desc' ? '▼' : '▲' }}</span>
            </th>
            <th class="text-start">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="tool in store.paginatedTools"
              :key="tool.id"
              class="hover:bg-gray-700"
          >
            <td><span class="flex items-center gap-2"><img class="w-5 h-5" alt="logo" :src=tool.icon_url>{{ tool.name }}</span></td>
            <td>{{ tool.description }}</td>
            <td>{{ tool.category }}</td>
            <td>{{ tool.owner_department }}</td>
            <td>{{ tool.active_users_count }}</td>
            <td>€{{ tool.monthly_cost }}</td>
            <td>{{ formatDate(tool.updated_at) }}</td>
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

                <div class="absolute right-4 bottom-6 mt-2 w-32 border-1 rounded-md border-gray-600/30 bg-black shadow-lg group-hover:block" v-if="openedDropdownId === tool.id">
                  <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer">Edit</button>
                  <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer">View details</button>
                  <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer">{{ tool.status === 'active' ? 'Disable' : 'Enable' }}</button>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 flex justify-center gap-5">
        <button
            @click="store.setPage(store.page - 1)"
            :disabled="store.page === 1"
            class="hover:cursor-pointer"
        >
          <arrow-left-icon class="w-6 h-6 text-white blue-purple-gradient rounded-2xl" />
        </button>
        <span>{{ store.page }}/{{ store.totalPages }}</span>
        <button
            @click="store.setPage(store.page + 1)"
            :disabled="store.page >= Math.ceil(store.tools.length / store.limit)"
            class="hover:cursor-pointer"
        >
          <arrow-right-icon class="w-6 h-6 text-white blue-purple-gradient rounded-2xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @reference "../assets/main.css";

  table#tools th,
  table#tools td {
    @apply p-4 border-b-1 border-gray-600/30;
  }

  table#tools th {
    @apply border-gray-600/50;
  }

  input[type="range"] {
    accent-color: rgb(74 85 101);
  }

  input[type="range"] {
    width: 15rem;
    cursor: pointer;
  }
</style>