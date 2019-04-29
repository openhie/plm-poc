import { shallowMount } from '@vue/test-utils'
import MainTabs from '@/components/MainTabs.vue'
//import ViewCSV from '@/components/ViewCSV.vue'
//import ViralLoadForm from '@/components/ViralLoadForm.vue'


/*
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
*/
describe( 'MainTabs.vue', () => {
  it('loads 2 tabs', () => {
    const wrapper = shallowMount(MainTabs,{
      stubs: [ 'v-tabs', 'v-icon', 'v-tabs-slider', 'v-tab-item', 'v-tab', 'v-container' ]
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findAll('v-tab-stub')).toHaveLength(3)
    expect(wrapper.findAll('v-tab-item-stub')).toHaveLength(3)
    expect(wrapper.findAll('viralloadform-stub')).toHaveLength(1)
    expect(wrapper.findAll('viewcsv-stub')).toHaveLength(1)
  })
})
