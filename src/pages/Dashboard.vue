<script setup lang="ts">
  import { PresentationChartLineIcon } from '@heroicons/vue/16/solid'
  import { WrenchIcon, BuildingOfficeIcon, UsersIcon, CalendarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-col p-7">
    <div>
      <h1 class="font-bold text-3xl text-white">Internal Tools Dashboard</h1>
      <p>Monitor and manage your organization's software tools and expenses</p>
    </div>
    <div class="flex flex-row pt-7 justify-between mb-10">
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Monthly Budget <span class="green-gradient p-2 rounded-xl"><PresentationChartLineIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2">
          <span class="text-white">€28,750</span>/€30K
        </div>
        <div>
          <span class="green-gradient p-1 pl-2 pr-2 rounded-3xl text-white">+12%</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Active Tools <span class="blue-purple-gradient p-2 rounded-xl"><WrenchIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">147</div>
        <div>
          <span class="blue-purple-gradient p-1 pl-2 pr-2 rounded-3xl text-white">+18</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Departments <span class="orange-gradient p-2 rounded-xl"><BuildingOfficeIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">8</div>
        <div>
          <span class="orange-gradient p-1 pl-2 pr-2 rounded-3xl text-white">+2</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="flex items-center justify-between">
          Cost/User <span class="pink-gradient p-2 rounded-xl"><UsersIcon class="w-5 h-5 text-white"/></span>
        </div>
        <div class="font-bold text-2xl pt-10 pb-2 text-white">€156</div>
        <div>
          <span class="pink-gradient p-1 pl-2 pr-2 rounded-3xl text-white">-€12</span>
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
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Slack</td>
            <td>Communication</td>
            <td>245</td>
            <td>€2,450</td>
            <td><span class="green-gradient status-pills">Active</span></td>
          </tr>
          <tr>
            <td>Figma</td>
            <td>Design</td>
            <td>32</td>
            <td>€480</td>
            <td><span class="green-gradient status-pills">Active</span></td>
          </tr>
          <tr>
            <td>GitHub</td>
            <td>Engineering</td>
            <td>89</td>
            <td>€890</td>
            <td><span class="green-gradient status-pills">Active</span></td>
          </tr>
          <tr>
            <td>Notion</td>
            <td>Operations</td>
            <td>156</td>
            <td>€780</td>
            <td><span class="orange-gradient status-pills">Expiring</span></td>
          </tr>
          <tr>
            <td>Adobe CC</td>
            <td>Marketing</td>
            <td>12</td>
            <td>€720</td>
            <td><span class="red-gradient status-pills">Unused</span></td>
          </tr>
          <tr>
            <td>Zoom</td>
            <td>Communication</td>
            <td>198</td>
            <td>€1,980</td>
            <td><span class="green-gradient status-pills">Active</span></td>
          </tr>
          <tr>
            <td>Jira</td>
            <td>Engineering</td>
            <td>67</td>
            <td>€670</td>
            <td><span class="orange-gradient status-pills">Expiring</span></td>
          </tr>
          <tr>
            <td>Salesforce</td>
            <td>Sales</td>
            <td>45</td>
            <td>€4,500</td>
            <td><span class="green-gradient status-pills">Active</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @reference "../assets/main.css";

  .kpi-card {
    @apply w-1/5 border-1 rounded-md border-gray-600/30 p-5 bg-black/20;
  }

  .status-pills {
    @apply text-white/80 p-0.5 pr-2.5 pl-2.5 rounded-lg;
  }

  table#tools th,
  table#tools td {
    @apply p-4 border-b-1 rounded-md border-gray-600/30;
  }

  table#tools th {
    @apply border-gray-600/50;
  }
</style>