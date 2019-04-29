const request = require('supertest')
const app = require('../app')


describe('Test the express routes /fhir/Bundle.json', () => {

  test('Posting CSV should return Bundle', () => {
    return request(app).post('/fhir/Bundle.json').set({'Content-type': 'text/csv'}).send(
      'patientId,practitionerId,locationId,gender,dateOfBirth,obsDate,service,viralLoad\ntest_patient2,1,1,female,1999-01-02,2019-04-13T10:12:00.000Z,TX_PVLS,500\n'
    ).then( response => {
      expect(response.statusCode).toBe(200)
      let data = JSON.parse(response.text)
      delete data.timestamp
      expect(JSON.stringify(data)).toBe('{"resourceType":"Bundle","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_Bundle"]},"type":"message","entry":[{"resource":{"resourceType":"MessageHeader","eventCoding":{"system":"","code":""},"destination":{"name":"DATIM"}}},{"resource":{"resourceType":"Patient","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_Patient"]},"id":"test_patient2","gender":"female","birthDate":"1999-01-02"}},{"resource":{"resourceType":"Encounter","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_Encounter"]},"status":"finished","id":"test_patient2.1.2019-04-13T10:12:00.000Z","subject":"Patient/test_patient2","location":[{"location":{"identifier":{"system":"MFL","value":"1"}}}]}},{"resource":{"resourceType":"Condition","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_Condition"]},"id":"test_patient2.HIV","subject":"Patient/test_patient2","verificationStatus":"confirmed","code":{"coding":[{"system":"http://snomed.info/sct","code":"165816005"}]}}},{"resource":{"resourceType":"MedicationStatement","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_MedicationStatement"]},"id":"test_patient2.ART","subject":"Patient/test_patient2","medicationCodeableConcept":{"coding":[{"system":"http://snomed.info/sct","code":"432101000124108"}]},"effectiveDateTime":"2019-04-13T10:12:00.000Z"}},{"resource":{"resourceType":"Observation","meta":{"profile":["http://datim.org/fhir/StructureDefinition/TX_PVLS_Observation"]},"id":"test_patient2.TX_PVLS.2019-04-13T10:12:00.000Z","code":{"coding":[{"system":"http://loinc.org","code":"10351-5"}]},"encounter":"Encounter/test_patient2.1.2019-04-13T10:12:00.000Z","subject":"Patient/test_patient2","performer":{"reference":{"identifier":{"system":"HR Reg","code":"1"}}},"effectiveDateTime":"2019-04-13T10:12:00.000Z","valueQuantity":{"value":"500","unit":"/mL","system":"http://unitsofmeasure.org","code":"/mL"}}}]}')
    })
  })

})