const request = require('supertest')
const app = require('../app')
const models = require('../models')

beforeAll( done => {
  models.sequelize.sync().then( () => {
    done()
  })
})

describe('Test the express routes /TX_PVLS', () => {
  test('Posting incomplete data should fail', () => {
    return request(app).post('/TX_PVLS').send( { patientId: "test_patient2" } ).then( response => {
      expect(response.statusCode).toBe(400)
    })
  })

  test('Posting complete data should succeed', () => {
    return request(app).post('/TX_PVLS').send( {
      patientId : "test_patient2",
      practitionerId : "1",
      locationId : "1",
      gender : "female",
      dateOfBirth : "1999-01-02",
      obsDate: "2019-04-13 10:12:00",
      viralLoad : 500
  } ).then( response => {
      expect(response.statusCode).toBe(201)
    })
  })
})

describe('Test the express route to /all.csv', () => {

  test('Getting CSV should return correct data', () => {
    return request(app).get('/all.csv').then( response => {
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('patientId,practitionerId,locationId,gender,dateOfBirth,obsDate,service,viralLoad\ntest_patient2,1,1,female,1999-01-02,2019-04-13T10:12:00.000Z,TX_PVLS,500\n')
    })
  })
})

describe('Test the express route to /all.json', () => {

  test('Getting JSON should return correct data', () => {
    return request(app).get('/all.json').then( response => {
      expect(response.statusCode).toBe(200)
      let output = JSON.parse(response.text)
      expect(output[0].patientId).toBe("test_patient2")
      expect(output[0].practitionerId).toBe("1")
      expect(output[0].locationId).toBe("1")
      expect(output[0].gender).toBe("female")
      expect(output[0].dateOfBirth).toBe("1999-01-02")
      expect(output[0].obsDate).toBe("2019-04-13T10:12:00.000Z")
      expect(output[0].service).toBe("TX_PVLS")
      expect(output[0].viralLoad).toBe(500)
    })
  })
})
