<template>
  <v-card>
    <v-card-title class="primary" primary-title><div class="headline white--text">Upload CSV</div></v-card-title>

    <v-card-text>
      <v-btn color="success" @click="$refs.csvUpload.click()" type="file">Select File</v-btn>
      <input v-show="false" ref="csvUpload" type="file" @change="uploadFile" >
      <v-textarea v-model="bundle" :loading="isloading" height="100%" />
    </v-card-text>
  </v-card>
</template>


<script>
import axios from 'axios'

export default {
  data: () => ({
    bundle: "",
    isloading: false
  }),
  methods: {
    uploadFile (test ) {

      this.bundle = ""
      this.isLoading = "accent"
      let reader = new FileReader()
      reader.onloadend = (evt) => {
        if ( evt.target.readyState == FileReader.DONE ) {
          console.log(evt.target.result)
          axios.post('/fhir/Bundle.json', evt.target.result, { headers: { 'Content-Type' : 'text/csv' } } ).then( response => {
            console.log(response.data)
            this.bundle = JSON.stringify(response.data, null, 2)
            this.isLoading = false
          })
        }
      }
      reader.readAsText( test.target.files[0] )
    }
  }
}
</script>
