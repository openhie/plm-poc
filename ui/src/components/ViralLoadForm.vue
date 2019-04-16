<template>
  <v-card>
    <v-card-title class="primary" primary-title><div class="headline white--text">Add Viral Load</div></v-card-title>

    <v-card-text>
      <v-text-field ref="loc" prepend-icon="location_on" v-model="locationId" label="Location ID" readonly disabled></v-text-field>
      <v-select ref="service" prepend-icon="assignment" v-model="service" :items="services" item-text="text" item-value="value"
        label="Service" chips readonly disabled></v-select>
      <v-divider></v-divider>
      <v-form ref="form">
        <v-snackbar auto-height absolute top multi-line color="accent" v-model="snackbar">
          {{ results }}
          <v-btn flat icon @click="snackbar = false"><v-icon>close</v-icon>Close</v-btn>
        </v-snackbar>

        <v-text-field prepend-icon="person" v-model="patientId" label="Patient ID"
          required :rules="rules"></v-text-field>
        <v-text-field prepend-icon="assignment_ind" v-model="practitionerId" label="Practitioner ID"
          required :rules="rules"></v-text-field>
        <v-select :rules="rules" prepend-icon="wc" :items="genders" item-text="text" item-value="value"
          label="Gender" required></v-select>
        <v-menu v-model="birthDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field :rules="rules" v-model="dateOfBirth" label="Date of Birth" prepend-icon="event"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dateOfBirth" landscape scrollable @input="birthDateMenu = false">
          </v-date-picker>
        </v-menu>
        <v-menu v-model="obsDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="580px">
          <template v-slot:activator="{ on }">
            <v-text-field :rules="rules" v-model="obsDate" label="Observation Date" prepend-icon="event"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker show-current landscape reactive v-model="obsDateOnly">
          </v-date-picker>
          <v-time-picker show-current landscape reactive v-model="obsTime">
          </v-time-picker>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="obsDateMenu = false">OK</v-btn>
        </v-menu>

        <v-text-field :rules="rules" prepend-icon="assessment" v-model="viralLoad" type="number"
          label="Viral Load /mL"></v-text-field>

        <v-btn color="success" @click="save">Save</v-btn>
        <v-btn color="warning" @click="reset">Reset</v-btn>

      </v-form>

    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    inputs: [
      'patientId',
      'practitionerId',
      'locationId',
      'gender',
      'dateOfBirth',
      'obsDate',
      'viralLoad'
    ],
    patientId: '',
    practitionerId: '',
    locationId: 'aBcD',
    gender: '',
    dateOfBirth: '',
    obsDateOnly: new Date().toISOString().substring(0,10),
    obsTime: new Date().toISOString().substring(11,19),
    service: 'TX_PVLS',
    viralLoad: 0,
    genders: [
      { value: 'male', text: 'Male' },
      { value: 'female', text: 'Female' },
      { value: 'other', text: 'Other' },
      { value: 'unknown', text: 'Unknown' }
    ],
    services: [
      { value: 'TX_PVLS', text: 'Viral Load' }
    ],
    birthDateMenu: false,
    obsDateMenu: false,
    snackbar: false,
    results: "OK",
    rules: [ v => !!v || 'Required field' ]
  }),
  computed: {
    obsDate: {
      get () {
        return this.obsDateOnly + " " + this.obsTime
      },
      set (value) {
        if ( value ) [ this.obsDateOnly, this.obsTime ] = value.split( ' ' )
      }
    }
  },
  mounted: function () {
    this.loaded = true
  },
  methods: {
    reset () {
      this.$refs.form.reset()
      this.obsDateOnly = new Date().toISOString().substring(0,10)
      this.obsTime = new Date().toISOString().substring(11,19)
    },
    save () {
      if ( this.$refs.form.validate() ) {

        let input = {}
        for ( let i of this.inputs ) {
          input[i] = this[i]
        }
        axios.post('/'+this.service, input).then( response => {
          if ( response.data.ok == "1" ) {
            this.results = "Patient Viral Load has been saved."
            this.reset()
          } else {
            this.results = "An error occurred: "+response.data.error.errors[0].message
          }
          this.snackbar = true
        }).catch( error => {
          this.results = "An error occurred: "+error
          this.snackbar = true
        })
      } else {
        this.results = 'Invalid input, please correct all errors.'
        this.snackbar = true
      }
    }

  }
}
</script>
