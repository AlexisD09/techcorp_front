<script setup>
  import {CalendarIcon} from '@heroicons/vue/24/outline';
  import ToolsTab from "@/components/tab/ToolsTab.vue";
  import Pagination from "@/components/tab/Pagination.vue";
  import Kpi from "@/components/Kpi.vue";
</script>

<template>
  <div class="flex flex-col p-7">
    <div>
      <h1 class="font-bold text-3xl text-white">Internal Tools Dashboard</h1>
      <p>Monitor and manage your organization's software tools and expenses</p>
    </div>

    <Kpi />

    <div class="w-full p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Recent Tools</h2></div>
        <div class="flex gap-2"><CalendarIcon class="w-5 h-5"/> Last 30 days</div>
      </div>

      <ToolsTab page="dashboard" />
      <Pagination />

    </div>
  </div>
</template>

<style scoped>

</style>