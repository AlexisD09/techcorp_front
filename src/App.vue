<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
