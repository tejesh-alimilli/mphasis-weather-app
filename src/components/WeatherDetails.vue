<script setup lang="ts">
import type { CityInfo } from '@/domain/CityInfo'
import { WeatherAppService } from '@/service/WeatherAppService'
import { ref, watch } from 'vue'

const props = defineProps<{
  locationName: string
}>()

const cityInfo = ref({} as CityInfo)
const weatherAppService = new WeatherAppService()

watch(
  props,
  async () => {
    cityInfo.value = await weatherAppService.getLatLong(props.locationName)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ props.locationName }}</h1>
    <div>Latitude: {{ cityInfo.lat }}</div>
    <div>Longitude: {{ cityInfo.lon }}</div>
    <div>State: {{ cityInfo.state }}</div>
    <div>Country: {{ cityInfo.country }}</div>
  </div>
</template>

<style scoped></style>
