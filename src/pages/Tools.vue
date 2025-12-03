<script setup lang="ts">
import { useToolsStore } from "@/stores/tools.store.js";
import {CalendarIcon} from "@heroicons/vue/24/outline";

const store = useToolsStore();
store.fetchTools();
</script>

<template>
  <div class="flex flex-col p-7">
    <div class="w-full p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div v-if="store.loading">Chargement...</div>
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Tools</h2></div>
      </div>
      <div class="w-auto">
        <table id="tools" class="w-full">
          <thead>
          <tr>
            <th class="text-start">Tool</th>
            <th class="text-start">Department</th>
            <th class="text-start">Users</th>
            <th class="text-start">Monthly Cost</th>
            <th class="text-start">Status</th>
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
            <td>{{ tool.owner_department }}</td>
            <td>{{ tool.active_users_count }}</td>
            <td>€{{ tool.monthly_cost }}</td>
            <td><span class="status-pills"
                      :class="{
                        'green-gradient': tool.status === 'active',
                        'orange-gradient': tool.status === 'expiring',
                        'red-gradient': tool.status === 'unused'
                      }"
            >{{tool.status}}</span></td>
            <td class="p-3 flex gap-2">
              <button class="text-blue-500">Modifier</button>
              <button class="text-red-500">Supprimer</button>
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
          ⬅
        </button>
        <span>{{ store.page }}</span>
        <button
            @click="store.setPage(store.page + 1)"
            :disabled="store.page >= Math.ceil(store.tools.length / store.limit)"
            class="hover:cursor-pointer"
        >
          ➡
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
</style>