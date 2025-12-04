<script setup lang="ts">
  import { useToolsStore } from "@/stores/tools.store.js";

  const store = useToolsStore();
</script>

<template>
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
</template>

<style scoped>
  @reference "@/assets/main.css";

  input[type="range"] {
    accent-color: rgb(74 85 101);
  }

  input[type="range"] {
    width: 15rem;
    cursor: pointer;
  }
</style>