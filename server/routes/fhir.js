const express = require('express')
const router = express.Router()
const parse = require('csv-parse')


const bundleTemplate = {
  resourceType: "Bundle",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_Bundle"]
  },
  type: "message",
  timestamp: "",
  entry: [
    {
      resource: {
        resourceType: "MessageHeader",
        eventCoding: {
          system: "",
          code: ""
        },
        destination: {
          name: "DATIM"
        }
      }
    }
  ]
}

const patientTemplate = {
  resourceType: "Patient",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_Patient"]
  },
  id: "",
  gender: "",
  birthDate: ""
}
const encounterTemplate = {
  resourceType: "Encounter",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_Encounter"]
  },
  status: "finished",
  id: "",
  subject: "",
  location: [
    {
      location: {
        identifier: { system: "MFL", value: ""}
      }
    }
  ]
}

const conditionTemplate =     {
  resourceType: "Condition",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_Condition"]
  },
  id: "",
  subject: "",
  verificationStatus: "confirmed",
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "165816005"
      }
    ]
  },
  recordedDate: ""
}

const medicationTemplate = {
  resourceType: "MedicationStatement",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_MedicationStatement"]
  },
  id: "",
  subject: "",
  medicationCodeableConcept: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "432101000124108"
      }
    ]
  },
  effectiveDateTime: ""
}

const observationTemplate = {
  resourceType: "Observation",
  meta: {
    profile: [ "http://datim.org/fhir/StructureDefinition/TX_PVLS_Observation"]
  },
  id: "",
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "10351-5"
      }
    ]
  },
  encounter: "",
  subject: "",
  performer: {
    reference: {
      identifier: {
        system : "HR Reg",
        code: ""
      }
    }
  },
  effectiveDateTime: "2019-04-10T10:00:00",
  valueQuantity: {
    value: 0,
    unit: "/mL",
    system: "http://unitsofmeasure.org",
    code: "/mL"
  }
}


/* Submit viral load data. */
router.post('/Bundle.json', (req, res, next) => {
  let data = req.body
  parse( data, { columns: true }, ( err, output ) => {
    if ( err ) {
      res.status(400).json({err})
    } else {
      let bundle = JSON.parse( JSON.stringify( bundleTemplate ) )
      bundle.timestamp = new Date().toISOString()

      for ( row of output ) {

        let patient = JSON.parse( JSON.stringify( patientTemplate ) )
        patient.id = row.patientId
        patient.gender = row.gender
        patient.birthDate = row.dateOfBirth
        bundle.entry.push( { resource: patient } )

        let encounter = JSON.parse( JSON.stringify( encounterTemplate ) )
        encounter.id = row.patientId+"."+row.locationId+"."+row.obsDate
        encounter.subject = "Patient/"+row.patientId
        encounter.location[0].location.identifier.value = row.locationId
        bundle.entry.push( { resource: encounter } )

        let condition = JSON.parse( JSON.stringify( conditionTemplate ) )
        condition.id = row.patientId +".HIV"
        condition.subject = "Patient/"+row.patientId
        condition.recordedDate = row.obsDateOnly
        bundle.entry.push( { resource: condition } )

        let medication = JSON.parse( JSON.stringify( medicationTemplate ) )
        medication.id = row.patientId +".ART"
        medication.subject = "Patient/"+row.patientId
        medication.effectiveDateTime = row.obsDate
        bundle.entry.push( { resource: medication } )

        let observation = JSON.parse( JSON.stringify( observationTemplate ) )
        observation.id = row.patientId +".TX_PVLS."+ row.obsDate
        observation.encounter = "Encounter/" + encounter.id
        observation.subject = "Patient/"+row.patientId
        observation.performer.reference.identifier.code = row.practitionerId
        observation.effectiveDateTime = row.obsDate
        observation.valueQuantity.value = row.viralLoad
        bundle.entry.push( { resource: observation } )

      }
      res.status(200).json(bundle)
    }
  })
})

module.exports = router
