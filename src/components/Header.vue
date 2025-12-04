<script setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import {BoltIcon, SunIcon, BellIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { useToolsStore } from "@/stores/tools.store.js";

const store = useToolsStore();
const open = ref(false);
const dropdownRef = ref(null);

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div class="flex flex-row justify-between items-center border-b-1 border-gray-600/30 w-full p-7 pt-3 pb-3 bg-black/20">
    <div class="flex flex-row gap-5 items-center">
      <div class="flex flex-row gap-2 items-center justify-center text-white font-bold"><span class="blue-purple-gradient p-1 rounded-lg"><BoltIcon class="w-4 h-4" /></span><router-link to="/">TechCorp</router-link></div>
      <div><router-link to="/">Dashboard</router-link></div>
      <div><router-link to="/tools">Tools</router-link></div>
      <div><router-link to="/analytics">Analytics</router-link></div>
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
               v-model="store.search"
        >
      </div>
      <div><SunIcon class="w-5 h-5 text-yellow-300" /></div>
      <div><BellIcon class="w-5 h-5"/></div>
      <div><Cog6ToothIcon class="w-5 h-5" /></div>
      <div class="flex flex-row items-center justify-center">
        <img alt="avatar" src="https://placehold.co/30" class="rounded-2xl">
        <div class="relative inline-block text-left" ref="dropdownRef">
          <button class="hover:text-gray-300 hover:cursor-pointer" @click="open = !open">
            <ChevronDownIcon class="w-5 h-5" />
          </button>

          <div class="absolute right-0 mt-2 w-32 border-1 rounded-md border-gray-600/30 bg-black shadow-lg group-hover:block" v-if="open">
            <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer">My account</button>
            <button class="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md hover:cursor-pointer">Disconnect</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>