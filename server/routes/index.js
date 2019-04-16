const express = require('express')
const router = express.Router()
const models = require('../models')
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier

/* Submit viral load data. */
router.post('/TX_PVLS', (req, res, next) => {
  let data = req.body
  data.service = "TX_PVLS"
  models.Patient.build( data ).validate().then( () => {
    models.Patient.upsert( data ).then( (patient) => {
      //models.Patient.findAll().then(patients=>console.log(patients))
      res.status(201).json({ok:1})
    } ).catch( err => {
      console.log("ERROR")
      console.log(err)
    } )
  } ).catch( err => { console.log(err); res.status(400).json( { ok: 0, error: err } ) } )
})

router.get('/all.csv', (req, res, next) => {
  const Op = models.Sequelize.Op
  const csvStringifier = createCsvStringifier({
    header: [
      { id: 'patientId', title: 'patientId' },
      {  id: 'practitionerId', title: 'practitionerId' },
      {  id: 'locationId', title: 'locationId' },
      {  id: 'gender', title: 'gender' },
      {  id: 'dateOfBirth', title: 'dateOfBirth' },
      {  id: 'obsDate', title: 'obsDate' },
      {  id: 'service', title: 'service' },
      {  id: 'viralLoad', title: 'viralLoad' }
    ]
  })
  Date.prototype.toString = function() { return this.toISOString() }
  let findOpts = {}
  if ( req.query._since ) {
    findOpts.where = { updatedAt: { [Op.gte]: req.query._since } }
  }
  models.Patient.findAll( findOpts ).then( (patients) => {
    res.set('Content-Type', 'text/csv').status(200)
    .send( csvStringifier.getHeaderString()
      + csvStringifier.stringifyRecords( patients ) )
  })
})

router.get('/all.json', (req, res, next) => {
  const Op = models.Sequelize.Op
  const csvStringifier = createCsvStringifier({
    header: [
      { id: 'patientId', title: 'patientId' },
      {  id: 'practitionerId', title: 'practitionerId' },
      {  id: 'locationId', title: 'locationId' },
      {  id: 'gender', title: 'gender' },
      {  id: 'dateOfBirth', title: 'dateOfBirth' },
      {  id: 'obsDate', title: 'obsDate' },
      {  id: 'service', title: 'service' },
      {  id: 'viralLoad', title: 'viralLoad' }
    ]
  })
  Date.prototype.toString = function() { return this.toISOString() }
  let findOpts = {}
  if ( req.query._since ) {
    findOpts.where = { updatedAt: { [Op.gte]: req.query._since } }
  }
  models.Patient.findAll( findOpts ).then( (patients) => {
    res.status(200)
    .send( patients )
  })
})

module.exports = router;
