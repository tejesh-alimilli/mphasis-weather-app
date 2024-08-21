import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WeatherDetails from '../WeatherDetails.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(WeatherDetails, {
      props: { locationName: 'Location Name Here', lat: 0, lon: 0 }
    })
    expect(wrapper.text()).toContain('Location Name Here')
  })
})
