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
      <v-tab href="#convert">
        Convert CSV
        <v-icon>transform</v-icon>
      </v-tab>

      <v-tab-item key="form" value="form">
        <ViralLoadForm />

      </v-tab-item>
      <v-tab-item key="csv" value="csv">
        <ViewCSV />
      </v-tab-item>

      <v-tab-item key="convert" value="convert">
        <ConvertCSV />
      </v-tab-item>

    </v-tabs>
  </v-container>
</template>

<script>
import ViralLoadForm from './ViralLoadForm'
import ViewCSV from './ViewCSV'
import ConvertCSV from './ConvertCSV'

export default {
  name: 'MainTabs',
  components: {
    ViralLoadForm,
    ViewCSV,
    ConvertCSV
  },
  data () {
    return {
      //
    }
  }
}
</script>
