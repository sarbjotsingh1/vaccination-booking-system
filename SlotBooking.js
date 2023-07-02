// // models/SlotBooking.js
// const mongoose = require("mongoose");

const slotBookingSchema = new mongoose.Schema({
  //   center: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "VaccinationCenter",
  //     required: true,
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = mongoose.model("SlotBooking", slotBookingSchema);
