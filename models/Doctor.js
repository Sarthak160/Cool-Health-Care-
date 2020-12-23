const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  photo: String,
  sex: String,
  phone: String,
  email: String,
  password: String,
  speciality: String,
  patients: [{
    id: String
  }],
  acheivements: []

})

const doctor = mongoose.model("doctor", doctorSchema);

module.exports = doctor;