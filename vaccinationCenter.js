/* eslint-disable no-undef */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const vaccinationCenterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VaccinationCenter", vaccinationCenterSchema);
