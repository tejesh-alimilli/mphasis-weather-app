<script setup lang="ts">
import WeatherDetails from '@/components/WeatherDetails.vue'
import { useWeatherAppStore } from '@/stores/weather'
import { ref } from 'vue'

const store = useWeatherAppStore()

const apiKey = ref(store.apiKey)
const locationName = ref(store.locationName)

// not ideal, but to update child item after click event we are using a second variable
const childLocationName = ref(store.locationName)

function searchClicked() {
  store.setApiKey(apiKey.value)
  store.setLocationName(locationName.value)
  childLocationName.value = locationName.value
}
</script>

<template>
  <h1>Welcome to Weather App</h1>
  <main>
    API Key: &nbsp;
    <!-- To avoid hardcoding API Key made it into a input field, save to local storage for convinience -->
    <input type="text" placeholder="Enter openweathermap API Key here" v-model="apiKey" />
    <br /><br />
    Enter any US City Name: &nbsp;
    <input type="search" placeholder="Enter US City Name here" v-model="locationName" />
    <br /><br />
    <button @click="searchClicked">Go</button>
    <br /><br />
    <WeatherDetails :location-name="childLocationName"></WeatherDetails>
  </main>
</template>
