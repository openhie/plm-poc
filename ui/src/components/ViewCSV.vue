<template>
  <v-card>
    <v-card-title class="primary" primary-title><div class="headline white--text">View Data {{ dateLimit }}</div></v-card-title>
    <v-card-text>

      <v-btn color="accent" @click='update(true)'>Retrieve All Data</v-btn>
      <template v-if="!showDate">
        <v-btn color="accent" @click='showDate=true'>Select By Date</v-btn>
      </template>
      <template v-if="showDate">
        <v-btn color="accent" @click='showDate=false'>Hide Date</v-btn>
        <v-date-picker v-model="date" landscape reactive @input='update(false)'></v-date-picker>
      </template>

      <v-data-table ref="table" :headers="headers" :items="items">
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            Select the date to view the data updates since that date.
          </v-alert>
        </template>
        <template v-slot:items="props">
          <td>{{ props.item.service }}</td>
          <td>{{ props.item.locationId }}</td>
          <td>{{ props.item.patientId }}</td>
          <td>{{ props.item.practitionerId }}</td>
          <td>{{ props.item.gender }}</td>
          <td>{{ props.item.dateOfBirth }}</td>
          <td>{{ props.item.obsDate }}</td>
          <td>{{ props.item.viralLoad }}</td>
          <td>{{ props.item.updatedAt }}</td>
        </template>
        <template v-slot:footer v-if="downloadLink">
          <td :colspan="headers.length">
            <v-btn right :href="downloadLink" color="success">Download Data</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    date: '',
    dateLimit: '',
    headers: [
      { text: 'Service', value: 'service' },
      { text: 'Location ID', value: 'locationId' },
      { text: 'Patient ID', value: 'patientId' },
      { text: 'Practitioner ID', value: 'practitionerId' },
      { text: 'Gender', value: 'gender' },
      { text: 'Date of Birth', value: 'dateOfBirth' },
      { text: 'Observation Date', value: 'obsDate' },
      { text: 'Viral Load /mL', value: 'viralLoad' },
      { text: 'Last Updated', value: 'updatedAt' }
    ],
    items: [],
    downloadLink: false,
    showDate: false
  }),
  methods: {
    update (isAll) {
      let query = ''
      if ( !isAll && this.date ) {
        query = '?_since='+this.date
      }
      axios.get('/all.json'+query).then( response => {
        if ( isAll ) {
          this.dateLimit = 'Since All Time'
          this.downloadLink = '/all.csv'
        } else if ( this.date ) {
          this.dateLimit = 'Since: '+this.date
          this.downloadLink = '/all.csv?_since='+this.date
        }
        this.items = response.data
        if ( this.items.length === 0 ) this.downloadLink = false
      } )
    }
  }
}
</script>
