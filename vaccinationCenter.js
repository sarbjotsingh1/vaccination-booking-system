/* eslint-disable no-undef */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const slotSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  availableSlots: {
    type: Number,
    default: 10, // Number of available slots for the date, default is 10
  },
});

const vaccinationCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  slots: [slotSchema],
});

module.exports = mongoose.model("VaccinationCenter", vaccinationCenterSchema);
