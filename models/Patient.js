const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  email: String,
  password: String,
  phone: String,
  illness: String,
  prescriptions: [{
      date: Date,
      text: String
  }]
})

const patient = mongoose.model("patient", patientSchema);



module.exports = patient;