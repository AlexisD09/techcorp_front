<script setup>
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/vue/24/outline";
import { useToolsStore } from "@/stores/tools.store.js";

const store = useToolsStore();
</script>

<template>
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
</template>

<style scoped>

</style>