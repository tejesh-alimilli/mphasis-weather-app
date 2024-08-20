<script setup lang="ts">
import { useWeatherAppStore } from '@/stores/weather'
import { ref } from 'vue'

const store = useWeatherAppStore()

let apiKey = ref(store.apiKey)
let locationName = ref(store.locationName)

function searchClicked() {
  store.setApiKey(apiKey.value)
  store.setLocationName(locationName.value)
  console.log('get weather for ' + locationName.value)
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
  </main>
</template>
