<template>
  <v-container>
    <v-tabs centered color="secondary" dark icons-and-text>
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab href="#form">
        Add Viral Load
        <v-icon>person_add</v-icon>
      </v-tab>
      <v-tab href="#csv">
        View Data
        <v-icon>list</v-icon>
      </v-tab>

      <v-tab-item key="form" value="form">
        <ViralLoadForm />

      </v-tab-item>
      <v-tab-item key="csv" value="csv">
        <ViewCSV />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import ViralLoadForm from './ViralLoadForm'
import ViewCSV from './ViewCSV'

export default {
  name: 'MainTabs',
  components: {
    ViralLoadForm,
    ViewCSV
  },
  data () {
    return {
      //
    }
  }
}
</script>
