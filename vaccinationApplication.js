const mongoose = require("mongoose");

const vaccinationApplicationSchema = new mongoose.Schema({
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VaccinationCenter",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "VaccinationApplication",
  vaccinationApplicationSchema
);
