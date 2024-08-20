<script setup lang="ts">
defineProps<{
  locationName: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ locationName }}</h1>
  </div>
</template>

<style scoped></style>
