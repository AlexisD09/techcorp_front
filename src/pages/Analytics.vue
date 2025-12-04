<script setup>
import { Line, Doughnut, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import {ref} from "vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement);

const chartDataMonthlyCost = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Cost by month",
      data: [40, 20, 12, 20, 47, 33, 20],
      fill: false,
      borderColor: 'rgb(152, 16, 250)',
      tension: 0.1
    }
  ]
});

const chartDataDepartmentCost = ref({
  labels: ["Engineering", "Marketing", "HR", "Finance", "Sales", "IT"],
  datasets: [
    {
      data: [1200, 800, 300, 950, 600, 400],
      backgroundColor: [
        "#41B883",
        "#E46651",
        "#00D8FF",
        "#DD1B16",
        "#FFB703",
        "#8E44AD"
      ],
      borderWidth: 0
    }
  ]
});

const chartDataTopExpensiveTool = ref({
  labels: ["Figma", "Notion", "Zoom", "Jira", "Canva", "Hubspot"],
  datasets: [
    {
      data: [1200, 800, 300, 950, 600, 400],
      backgroundColor: [
        "#41B883",
        "#E46651",
        "#00D8FF",
        "#DD1B16",
        "#FFB703",
        "#8E44AD"
      ],
      borderWidth: 0
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
});
</script>

<template>
  <div class="flex p-7">
    <div class="p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Monthly Spend Evolution</h2></div>
      </div>
      <div>
        <Line
            :data="chartDataMonthlyCost"
            :option="chartOptions"
        />
      </div>
    </div>
    <div class="p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Department Cost Breakdown</h2></div>
      </div>
      <div class="h-64">
        <Doughnut
            :data="chartDataDepartmentCost"
            :option="chartOptions"
        />
      </div>
    </div>
    <div class="p-5 border-1 rounded-md border-gray-600/30 bg-black/20">
      <div class="flex items-center justify-between pb-5">
        <div class="flex"><h2 class="font-bold text-xl text-white">Top Expensive Tools</h2></div>
      </div>
      <div class="h-64">
        <Bar
            :data="chartDataTopExpensiveTool"
            :option="chartOptions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>