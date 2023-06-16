const express = require("express");
const VaccinationApplication = require("../models/vaccinationApplication");

const router = express.Router();

// Apply for Vaccination Slot route
router.post("/apply", async (req, res) => {
  const { centerId, date, applicantName, applicantEmail } = req.body;

  try {
    // Create a new vaccination application
    const newVaccinationApplication = new VaccinationApplication({
      center: centerId,
      date,
      applicantName,
      applicantEmail,
    });

    await newVaccinationApplication.save();

    return res
      .status(201)
      .json({ message: "Vaccination application submitted successfully" });
  } catch (error) {
    console.error("Error submitting vaccination application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
