import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherAppStore = defineStore('weatherApp', () => {
  const ApiKeyLocalStorageKey = 'ApiKey'
  const LocationNameLocalStorageKey = 'LocationName'

  const apiKey = ref(localStorage.getItem(ApiKeyLocalStorageKey) || '')
  const locationName = ref(localStorage.getItem(LocationNameLocalStorageKey) || '')

  function setApiKey(key: string) {
    apiKey.value = key
    localStorage.setItem(ApiKeyLocalStorageKey, key)
  }

  function setLocationName(name: string) {
    locationName.value = name
    localStorage.setItem(LocationNameLocalStorageKey, name)
  }

  return { apiKey, setApiKey, locationName, setLocationName }
})
