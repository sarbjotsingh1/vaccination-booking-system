/* eslint-disable no-undef */
const express = require("express");
const VaccinationCenter = require("../models/vaccinationCenter");
const VaccinationSlot = require("../models/vaccinationSlot");

const router = express.Router();

// Add Vaccination Center route
router.post("/add", async (req, res) => {
  try {
    const { ID, name, address, city, workingHours, isAdmin } = req.body;

    // Check if the user is an admin
    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "Only admin users can add vaccination centers" });
    }

    // Create a new vaccination center
    const newVaccinationCenter = new VaccinationCenter({
      ID,
      name,
      address,
      city,
      workingHours,
    });

    await newVaccinationCenter.save();

    return res
      .status(201)
      .json({ message: "Vaccination center added successfully" });
  } catch (error) {
    console.error("Error adding vaccination center:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Remove Vaccination Center route
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = req.body.isAdmin;

    // Check if the user is an admin
    if (!isAdmin) {
      return res
        .status(401)
        .json({ message: "Only admin users can remove vaccination centers" });
    }

    // Find the vaccination center by ID and remove it
    await VaccinationCenter.findOneAndRemove({ ID: id });

    return res
      .status(200)
      .json({ message: "Vaccination center removed successfully" });
  } catch (error) {
    console.error("Error removing vaccination center:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update Vaccination Center route
router.put("/update/:id", async (req, res) => {
  try {
    const { name, address, workingHours } = req.body;
    const centerId = req.params.id;

    const updatedVaccinationCenter = await VaccinationCenter.findByIdAndUpdate(
      centerId,
      { name, address, workingHours },
      { new: true }
    );

    if (!updatedVaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    return res
      .status(200)
      .json({ message: "Vaccination center updated successfully" });
  } catch (error) {
    console.error("Error updating vaccination center:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  const { searchQuery } = req.query;

  try {
    // Search for vaccination centers based on name or city
    const vaccinationCenters = await VaccinationCenter.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive name search
        { city: { $regex: searchQuery, $options: "i" } }, // Case-insensitive city search
      ],
    });

    res.status(200).json({ vaccinationCenters });
  } catch (error) {
    console.error("Error searching vaccination centers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Assuming you have a VaccinationSlot model to store the slots

// Apply for a vaccination slot route
router.post("/apply", async (req, res) => {
  try {
    const { centerId, slotId } = req.body;

    // Find the vaccination center
    const vaccinationCenter = await VaccinationCenter.findById(centerId);
    if (!vaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    // Find the vaccination slot
    const vaccinationSlot = await VaccinationSlot.findById(slotId);
    if (!vaccinationSlot) {
      return res.status(404).json({ message: "Vaccination slot not found" });
    }

    // Check if the vaccination center has available slots
    if (vaccinationSlot.bookedSlots >= vaccinationSlot.availableSlots) {
      return res.status(400).json({ message: "No available slots" });
    }

    // Update the bookedSlots count for the vaccination slot
    vaccinationSlot.bookedSlots += 1;
    await vaccinationSlot.save();

    return res
      .status(200)
      .json({ message: "Vaccination slot booked successfully" });
  } catch (error) {
    console.error("Error applying for vaccination slot:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
