const express = require("express");
const VaccinationApplication = require("../models/vaccinationApplication");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", async (req, res) => {
  const { centerId, date, name, centerName } = req.body;

  try {
    // Check if an application already exists for the center and date
    const existingApplication = await VaccinationApplication.findOne({
      center: centerId,
      date,
    });

    if (existingApplication) {
      if (existingApplication.count >= 10) {
        return res.status(400).json({ message: "Slots are full" });
      }
      // Update the existing application
      existingApplication.count += 1;
      existingApplication.slots.push(name);
      await existingApplication.save();
    } else {
      // Create a new vaccination application
      const newVaccinationApplication = new VaccinationApplication({
        center: centerId,
        centerName: centerName,
        date,
        slots: [name],
        count: 1,
      });
      await newVaccinationApplication.save();
    }

    return res
      .status(201)
      .json({ message: "Vaccination application submitted successfully" });
  } catch (error) {
    console.error("Error submitting vaccination application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const applications = await VaccinationApplication.find();
    res.json(applications);
  } catch (error) {
    console.error("Error retrieving vaccination applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
