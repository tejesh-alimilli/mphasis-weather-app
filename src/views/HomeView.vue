<script setup lang="ts">
import WeatherDetails from '@/components/WeatherDetails.vue'
import { useWeatherAppStore } from '@/stores/weather'
import { onMounted, ref } from 'vue'

const store = useWeatherAppStore()

const apiKey = ref(store.apiKey)
const locationName = ref(store.locationName)
const lat = ref(undefined as number | undefined)
const lon = ref(undefined as number | undefined)

// not ideal, but to update child item after click event we are using a second variable
const childLocationName = ref(store.locationName)

function searchClicked() {
  store.setApiKey(apiKey.value)
  store.setLocationName(locationName.value)
  lat.value = undefined
  lon.value = undefined
  childLocationName.value = locationName.value
}

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      if (locationName.value == '') {
        lat.value = position.coords.latitude
        lon.value = position.coords.longitude
        childLocationName.value = ''
      }
    })
  }
})
</script>

<template>
  <main>
    <h1>Welcome to Weather App</h1>
    <form @submit.prevent="searchClicked">
      <label for="apiKey"> API Key:</label> &nbsp;
      <!-- To avoid hardcoding API Key made it into a input field, save to local storage for convinience -->
      <input
        name="apiKey"
        type="text"
        placeholder="Enter openweathermap API Key here"
        v-model="apiKey"
      />
      <br /><br />
      <label for="locationName">Enter any US City Name:</label> &nbsp;
      <input
        name="locationName"
        type="search"
        placeholder="Enter US City Name here"
        v-model="locationName"
      />
      <br /><br />
      <button type="submit" @click="searchClicked">Go</button>
    </form>
    <br /><br />
    <WeatherDetails :location-name="childLocationName" :lat="lat" :lon="lon"></WeatherDetails>
  </main>
</template>

<style lang="css" scoped>
main {
  width: 900px;
  margin: 0px auto;
}
label {
  font-weight: bold;
}
input {
  padding: 5px;
  border-radius: 5px;
  border: #ccc 2px solid;
}
button {
  min-width: 100px;
  min-height: 30px;
  border-radius: 5px;
  border: #ccc 2px solid;
}
</style>
