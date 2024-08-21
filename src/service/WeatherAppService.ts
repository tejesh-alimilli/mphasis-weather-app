import type { CityInfo } from '@/domain/CityInfo'
import { useWeatherAppStore } from '@/stores/weather'

export class WeatherAppService {
  weatherStore = useWeatherAppStore()

  // ideally should be configured in an environemnt specific configuration file
  baseUrl = 'http://api.openweathermap.org/'

  async getLatLong(locationName: string): Promise<CityInfo> {
    try {
      const fetchResponse = await fetch(
        `${this.baseUrl}geo/1.0/direct?q=${locationName}&limit=1&appid=${this.weatherStore.apiKey}`
      )
      if (!fetchResponse.ok) {
        console.error('unnkown error in getting city details')
      }

      const list = (await fetchResponse.json()) as Array<CityInfo>
      if (list.length > 0) {
        return list[0]
      }
    } catch (error) {
      console.error('error in getting location details', error)
    }
    return {
      name: locationName,
      lat: 0,
      lon: 0,
      state: '',
      country: ''
    }
  }
}
