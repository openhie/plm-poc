const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const fhirRouter = require('./routes/fhir');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.text({ type: "text/*" }))
app.use(express.static(path.join(__dirname, 'public')));

app.use( function( req, res, next ) {
  res.header( 'Access-Control-Allow-Origin', '*' )
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
  next()
})

app.use('/', indexRouter);
app.use('/fhir', fhirRouter);

module.exports = app;
