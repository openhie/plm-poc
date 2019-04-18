import { shallowMount } from '@vue/test-utils'
import ViralLoadForm from '@/components/ViralLoadForm.vue'
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
describe( 'ViralLoadForm.vue', () => {
  const wrapper = shallowMount(ViralLoadForm, {
    stubs: [ 'v-card', 'v-card-title', 'v-card-text', 'v-text-field', 'v-select', 'v-divider',
      'v-form', 'v-snackbar', 'v-btn', 'v-icon', 'v-menu', 'v-date-picker', 'v-time-picker', 'v-spacer' ]
  })
  it('loads form', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findAll('v-btn-stub')).toHaveLength(4)
    expect(wrapper.findAll('v-text-field-stub')).toHaveLength(4)
    expect(wrapper.findAll('v-snackbar-stub')).toHaveLength(1)
    expect(wrapper.findAll('v-select-stub')).toHaveLength(2)
    expect(wrapper.findAll('v-time-picker-stub')).toHaveLength(1)
    expect(wrapper.findAll('v-date-picker-stub')).toHaveLength(2)
    expect(wrapper.findAll('v-menu-stub')).toHaveLength(2)
    expect(wrapper.find( '[label="Location ID"]' ).is('v-text-field-stub')).toBe(true)
    expect(wrapper.find( '[label="Service"]' ).is('v-select-stub')).toBe(true)
    expect(wrapper.find( '[label="Patient ID"]' ).is('v-text-field-stub')).toBe(true)
    expect(wrapper.find( '[label="Practitioner ID"]' ).is('v-text-field-stub')).toBe(true)
    expect(wrapper.find( '[label="Gender"]' ).is('v-select-stub')).toBe(true)
    expect(wrapper.find( '[label="Viral Load /mL"]' ).is('v-text-field-stub')).toBe(true)
  })
  it('computes values correctly', () => {
    expect(wrapper.vm.obsDate).toBe(wrapper.vm.obsDateOnly+" "+wrapper.vm.obsTime)
  })
  it('pulls in inputs', () => {
    wrapper.vm.patientId = '123'
    wrapper.vm.practitionerId = '456'
    wrapper.vm.locationId = 'aBcD'
    wrapper.vm.gender = 'female'
    wrapper.vm.dateOfBirth = '2000-01-01'
    wrapper.vm.obsDate = '2019-04-04 10:00:00'
    wrapper.vm.viralLoad = 500
    expect(wrapper.vm.service).toBe('TX_PVLS')
    const input = wrapper.vm.getInputs()
    expect(input.patientId).toBe('123')
    expect(input.practitionerId).toBe('456')
    expect(input.locationId).toBe('aBcD')
    expect(input.gender).toBe('female')
    expect(input.dateOfBirth).toBe('2000-01-01')
    expect(input.obsDate).toBe('2019-04-04 10:00:00')
    expect(input.viralLoad).toBe(500)
  })
})
