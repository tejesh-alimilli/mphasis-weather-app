<script setup lang="ts">
import type { CityInfo } from '@/domain/CityInfo'
import type { WeatherInfo } from '@/domain/WeatherInfo'
import { WeatherAppService } from '@/service/WeatherAppService'
import { ref, watch } from 'vue'

const props = defineProps<{
  locationName: string
  lat: number | undefined
  lon: number | undefined
}>()

const cityInfo = ref({} as CityInfo)
const weatherInfo = ref({} as WeatherInfo)
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

watch(
  cityInfo,
  async () => {
    if (cityInfo.value.lat != undefined && cityInfo.value.lon != undefined) {
      weatherInfo.value = await weatherAppService.getWeather(cityInfo.value.lat, cityInfo.value.lon)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div v-if="cityInfo.name == ''">{{ props.locationName }} city not found</div>
  <div v-else-if="cityInfo.country != 'US'">
    {{ cityInfo.name }} is not US city, please search for US city
  </div>
  <template v-else>
    <h1 class="green">{{ cityInfo.name }}</h1>
    <div>Latitude: {{ cityInfo.lat }}</div>
    <div>Longitude: {{ cityInfo.lon }}</div>
    <div>State: {{ cityInfo.state }}</div>
    <div>Country: {{ cityInfo.country }}</div>
    <br /><br />
    <div v-if="weatherInfo.main">
      The temprature is {{ weatherInfo.main?.temp }} but feels like
      {{ weatherInfo.main?.feels_like }}
    </div>
    <div v-for="weather in weatherInfo.weather" :key="weather.id">
      <img :src="weatherAppService.getWeatherIconUrl(weather.icon)" :alt="weather.description" />
      <span>Now the weather is {{ weather.description }}</span>
    </div>
  </template>
</template>

<style scoped></style>
