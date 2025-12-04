<script setup>
import { BuildingOfficeIcon, UsersIcon, WrenchIcon } from "@heroicons/vue/24/outline";
import { PresentationChartLineIcon } from "@heroicons/vue/16/solid";
import { useAnalyticsStore } from "@/stores/analytics.store.js";
import { onMounted } from "vue";

const analyticsStore = useAnalyticsStore();

onMounted(() => {
  analyticsStore.fetchAnalytics();
})
</script>

<template>
  <div id="card-container" class="flex flex-row pt-7 justify-between mb-10 gap-5" v-if="analyticsStore.analytics">
    <div class="kpi-card">
      <div class="flex items-center justify-between">
        Monthly Budget <span class="green-gradient p-2 rounded-xl"><PresentationChartLineIcon class="w-5 h-5 text-white"/></span>
      </div>
      <div class="font-bold text-2xl pt-10 pb-2">
        <span class="text-white">€{{ analyticsStore.analytics?.budget_overview?.current_month_total ?? 0 }}</span>/€{{ analyticsStore.analytics?.budget_overview?.monthly_limit ?? 0 }}
      </div>
      <div>
        <span class="green-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends?.budget_change ?? "+0%" }}</span>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-center justify-between">
        Active Tools <span class="blue-purple-gradient p-2 rounded-xl"><WrenchIcon class="w-5 h-5 text-white"/></span>
      </div>
      <div class="font-bold text-2xl pt-10 pb-2 text-white">147</div>
      <div>
        <span class="blue-purple-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends?.tools_change ?? "+0" }}</span>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-center justify-between">
        Departments <span class="orange-gradient p-2 rounded-xl"><BuildingOfficeIcon class="w-5 h-5 text-white"/></span>
      </div>
      <div class="font-bold text-2xl pt-10 pb-2 text-white">8</div>
      <div>
        <span class="orange-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends?.departments_change ?? "+0" }}</span>
      </div>
    </div>
    <div class="kpi-card">
      <div class="flex items-center justify-between">
        Cost/User <span class="pink-gradient p-2 rounded-xl"><UsersIcon class="w-5 h-5 text-white"/></span>
      </div>
      <div class="font-bold text-2xl pt-10 pb-2 text-white">€{{ analyticsStore.analytics?.cost_analytics?.cost_per_user ?? "0" }}</div>
      <div>
        <span class="pink-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends?.cost_per_user_change ?? "+€0" }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @reference "../assets/main.css";

  .kpi-card {
    @apply w-3/12 border-1 rounded-md border-gray-600/30 p-5 bg-black/20;
  }
</style>