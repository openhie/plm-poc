'use strict'

module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    patientId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    practitionerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    obsDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    viralLoad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  } )

  return Patient
}
