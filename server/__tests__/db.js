const models = require('../models')

beforeAll( done => {
  models.sequelize.sync().then( () => {
    done()
  })
})

let testData = {
  patientId: "test_patient1",
  practitionerId: "practitioner1",
  locationId: "facility1",
  gender: "female",
  dateOfBirth: "1999-01-01",
  obsDate: new Date("2019-04-12T10:00:00.000Z"),
  service: "TX_PVLS",
  viralLoad: 500
}

test( 'create data in database', done => {
  return models.Patient.create( testData ).then( record => {
    for ( i in testData ) {
      expect(record[i]).toEqual(testData[i])
    }
    done()
  })
})

test( 'query data in database', done => {
  return models.Patient.findAll().then( patients => {
    expect(patients.length).toBe(1)
    for ( i in testData ) {
      expect(patients[0][i]).toEqual(testData[i])
    }
    done()
  } )
})

test( 'deletes data in database', done => {
  return models.Patient.destroy( {
    where: {
      patientId: "test_patient1"
    }
  }).then( () => {
    models.Patient.findAll().then( patients => {
      expect(patients.length).toBe(0)
      done()
    })
  })
})
