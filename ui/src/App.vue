<template>
  <v-app>
    <v-toolbar color="primary" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-bold">PLM:</span>
        <span class="font-italic font-weight-light">  Proof of Concept</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <MainTabs />
    </v-content>
  </v-app>
</template>

<script>
import MainTabs from './components/MainTabs'

export default {
  name: 'App',
  components: {
    MainTabs
  },
  data () {
    return {
      //
    }
  }
}
</script>
