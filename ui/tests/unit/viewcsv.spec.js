import { createLocalVue, mount } from '@vue/test-utils'
import ViewCSV from '@/components/ViewCSV.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'

describe( 'ViewCSV.vue', () => {
  // There should be a better way to handle this with a localVue, but that caused
  // errors with the v-data-table so this seems to be the only way for now.
  Vue.use(Vuetify)

  const wrapper = mount(ViewCSV,{
    stubs: [ 'v-card', 'v-card-title', 'v-card-text', 'v-btn', 'v-progress-linear' ]
  })
  it('loads table', () => {

    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('tbody').text())
      .toBe('TX_PVLS aBcD 123 456 female 2000-01-01 2019-04-04 10:00:00 500 2019-04-04 10:00:00')

    /*
    expect(wrapper.findAll('v-tab-stub')).toHaveLength(2)
    expect(wrapper.findAll('v-tab-item-stub')).toHaveLength(2)
    expect(wrapper.findAll('viralloadform-stub')).toHaveLength(1)
    expect(wrapper.findAll('viewcsv-stub')).toHaveLength(1)
    */
  })
})
