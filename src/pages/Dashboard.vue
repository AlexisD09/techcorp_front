<script setup lang="ts">
  import { useToolsStore } from "@/stores/tools.store.js";
  import { useAnalyticsStore } from "@/stores/analytics.store.js";
  import { PresentationChartLineIcon } from '@heroicons/vue/16/solid';
  import {
    WrenchIcon,
    BuildingOfficeIcon,
    UsersIcon,
    CalendarIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    Bars3Icon
  } from '@heroicons/vue/24/outline';
  import {onBeforeUnmount, onMounted, ref, watch} from "vue";

  const toolStore = useToolsStore();
  toolStore.fetch30DaysAgoTools();

  const analyticsStore = useAnalyticsStore();
  analyticsStore.fetchAnalytics();

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
    <div>
      <h1 class="font-bold text-3xl text-white">Internal Tools Dashboard</h1>
      <p>Monitor and manage your organization's software tools and expenses</p>
    </div>
    <div id="card-container" class="flex flex-row pt-7 justify-between mb-10 gap-5">
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Monthly Budget <span class="green-gradient p-2 rounded-xl"><PresentationChartLineIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2">
          <span class="text-white">€{{ analyticsStore.analytics?.budget_overview.current_month_total ?? 0 }}</span>/€{{ analyticsStore.analytics?.budget_overview.monthly_limit ?? 0 }}
        </div>
        <div>
          <span class="green-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends.budget_change ?? "+0%" }}</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Active Tools <span class="blue-purple-gradient p-2 rounded-xl"><WrenchIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">147</div>
        <div>
          <span class="blue-purple-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends.tools_change ?? "+0" }}</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Departments <span class="orange-gradient p-2 rounded-xl"><BuildingOfficeIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">8</div>
        <div>
          <span class="orange-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends.departments_change ?? "+0" }}</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Cost/User <span class="pink-gradient p-2 rounded-xl"><UsersIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">€{{ analyticsStore.analytics?.cost_analytics.cost_per_user ?? "0" }}</div>
        <div>
          <span class="pink-gradient p-1 pl-2 pr-2 rounded-3xl text-white">{{ analyticsStore.analytics?.kpi_trends.cost_per_user_change ?? "+€0" }}</span>
        </div>
      </div>
    </div>

    <div class="w-full p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Recent Tools</h2></div>
        <div class="flex gap-2"><CalendarIcon class="w-5 h-5"/> Last 30 days</div>
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
              v-for="tool in toolStore.paginatedTools"
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
              <td>
                <div class="relative dropdown-wrapper">
                  <button class="hover:text-gray-300 hover:cursor-pointer" @click="toggleDropdown(tool.id)">
                    <Bars3Icon class="w-5 h-5" />
                  </button>

                  <div class="absolute bottom-6 mt-2 w-32 border-1 rounded-md border-gray-600/30 bg-black shadow-lg group-hover:block" v-if="openedDropdownId === tool.id">
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
            @click="toolStore.setPage(toolStore.page - 1)"
            :disabled="toolStore.page === 1"
            class="hover:cursor-pointer"
        >
          <arrow-left-icon class="w-6 h-6 text-white blue-purple-gradient rounded-2xl" />
        </button>
        <span>{{ toolStore.page }}/{{ toolStore.totalPages }}</span>
        <button
            @click="toolStore.setPage(toolStore.page + 1)"
            :disabled="toolStore.page >= Math.ceil(toolStore.tools.length / toolStore.limit)"
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

  @media screen and (max-width: 1023px) {
    #card-container{
      flex-wrap: wrap;
    }
  }

  .kpi-card {
    @apply w-3/12 border-1 rounded-md border-gray-600/30 p-5 bg-black/20;
  }

  table#tools th,
  table#tools td {
    @apply p-4 border-b-1 border-gray-600/30;
  }

  table#tools th {
    @apply border-gray-600/50;
  }
</style>