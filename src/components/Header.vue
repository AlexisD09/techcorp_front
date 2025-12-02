<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import {BoltIcon, SunIcon, BellIcon, Cog6ToothIcon, WrenchIcon} from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-row justify-between items-center border-b-1 border-gray-600/30 w-full p-7 pt-3 pb-3 bg-black/20">
    <div class="flex flex-row gap-5 items-center">
      <div class="flex flex-row gap-2 items-center justify-center text-white font-bold"><span class="blue-purple-gradient p-1 rounded-lg"><BoltIcon class="w-4 h-4" /></span>TechCorp</div>
      <div><router-link to="/">Dashboard</router-link></div>
      <div>Tools</div>
      <div>Analytics</div>
      <div>Settings</div>
    </div>
    <div class="flex flex-row justify-center items-center gap-5">
      <div>
        <input type="text"
                class="rounded-md border-1 border-gray-600/30
                          focus:outline-none focus:ring-1 focus:ring-gray-500
                        focus:border-r-gray-700 transition duration-200
                        bg-gray-600/15 text-xs p-1 text-gray-500"
               placeholder="Search Tools..."
        >
      </div>
      <div><SunIcon class="w-5 h-5 text-yellow-300" /></div>
      <div><BellIcon class="w-5 h-5"/></div>
      <div><Cog6ToothIcon class="w-5 h-5" /></div>
      <div class="flex flex-row items-center justify-center"><img alt="avatar" src="https://placehold.co/30" class="rounded-2xl"><ChevronDownIcon class="w-5 h-5" /></div>
    </div>
  </div>
</template>

<style scoped>
</style>