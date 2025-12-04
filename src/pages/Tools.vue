<script setup>
import ToolsTab from "@/components/ToolsTab.vue";
import TabFilters from "@/components/TabFilters.vue";
import Pagination from "@/components/Pagination.vue";
</script>

<template>
  <div class="flex flex-col p-7">
    <div class="w-full p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Tools</h2></div>
      </div>
      <TabFilters />
      <ToolsTab page="tools" />
      <Pagination />
    </div>
  </div>
</template>

<style scoped>
</style>