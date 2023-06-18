const express = require("express");
const VaccinationCenter = require("../models/vaccinationCenter");
const VaccinationApplication = require("../models/vaccinationApplication");

const router = express.Router();
// Add Vaccination Center route
router.post("/add", async (req, res) => {
  try {
    const { ID, name, address, city, workingHours } = req.body;

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
    //const isAdmin = req.body.isAdmin;

    //Check if the user is an admin
    // if (!isAdmin) {
    //   return res
    //     .status(401)
    //     .json({ message: "Only admin users can remove vaccination centers" });
    // }

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

router.get("/", async (req, res) => {
  try {
    // Fetch all vaccination centers from the database
    const vaccinationCenters = await VaccinationCenter.find();

    res.status(200).json({ vaccinationCenters });
  } catch (error) {
    console.error("Error fetching vaccination centers:", error);
    res.status(500).json({ message: "Internal server error" });
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

// Get a specific vaccination center
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the vaccination center by ID
    const vaccinationCenter = await VaccinationCenter.findById(id);

    if (!vaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    return res.status(200).json({ vaccinationCenter });
  } catch (error) {
    console.error("Error fetching vaccination center:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// router.post("/apply", async (req, res) => {
//   const { centerId, date, name } = req.body;

//   try {
//     // Create a new vaccination application
//     const newVaccinationApplication = new VaccinationApplication({
//       center: centerId,
//       date,
//       name,
//     });

//     await newVaccinationApplication.save();

//     return res
//       .status(201)
//       .json({ message: "Vaccination application submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting vaccination application:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// GET /vaccination-application/slots-booked?centerId=<centerId>&date=<date>
router.get("/slots-booked", async (req, res) => {
  try {
    const { centerId, date } = req.query;

    const center = await VaccinationCenter.findById(centerId);

    if (!center) {
      // Vaccination center not found
      return res.json(0);
    }

    const slotsBooked = await VaccinationApplication.aggregate([
      {
        $match: {
          center: mongoose.Types.ObjectId(centerId),
          date: new Date(date),
        },
      },
      {
        $group: {
          _id: { center: "$center", date: "$date" },
          count: { $sum: 1 },
        },
      },
    ]);

    const count = slotsBooked.length > 0 ? slotsBooked[0].count : 0;

    res.json(count);
  } catch (error) {
    console.error("Error retrieving slots booked:", error);
    res.status(500).json("Internal server error");
  }
});

router.post("/:id/slots", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, availableSlots } = req.body;

    const vaccinationCenter = await VaccinationCenter.findById(id);

    if (!vaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    vaccinationCenter.slots.push({ date, availableSlots });
    await vaccinationCenter.save();

    return res.status(201).json({ message: "Slots added successfully" });
  } catch (error) {
    console.error("Error adding slots:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get Available Slots for a Date
router.get("/:id/slots/:date", async (req, res) => {
  try {
    const { id, date } = req.params;

    const vaccinationCenter = await VaccinationCenter.findById(id);

    if (!vaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    const slot = vaccinationCenter.slots.find(
      (slot) => slot.date.toISOString() === date
    );

    if (!slot) {
      return res
        .status(404)
        .json({ message: "Slots not found for the specified date" });
    }

    return res.status(200).json({ availableSlots: slot.availableSlots });
  } catch (error) {
    console.error("Error retrieving slots:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Book a Slot
router.post("/:id/book-slot", async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const vaccinationCenter = await VaccinationCenter.findById(id);

    if (!vaccinationCenter) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }

    const slot = vaccinationCenter.slots.find(
      (slot) => slot.date.toISOString() === date
    );

    if (!slot) {
      return res
        .status(404)
        .json({ message: "Slots not found for the specified date" });
    }

    if (slot.availableSlots === 0) {
      return res
        .status(400)
        .json({ message: "No available slots for the specified date" });
    }

    slot.availableSlots--;
    await vaccinationCenter.save();

    return res.status(200).json({ message: "Slot booked successfully" });
  } catch (error) {
    console.error("Error booking slot:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/slot-booking", async (req, res) => {
  try {
    const { centerId, date } = req.query;
    const slotsBooked = await SlotBooking.countDocuments({
      center: centerId,
      date: new Date(date),
    });
    res.status(200).json({ slotsBooked });
  } catch (error) {
    console.error("Error retrieving slots booked:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const vaccinationCenters = await VaccinationCenter.find();
    res.status(200).json({ vaccinationCenters });
  } catch (error) {
    console.error("Error fetching vaccination centers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Search vaccination centers
router.get("/search", async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const vaccinationCenters = await VaccinationCenter.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { city: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.status(200).json({ vaccinationCenters });
  } catch (error) {
    console.error("Error searching vaccination centers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Apply for a slot at a vaccination center
router.post("/apply", async (req, res) => {
  try {
    const { centerId, date, name } = req.body;
    const center = await VaccinationCenter.findById(centerId);
    if (!center) {
      return res.status(404).json({ message: "Vaccination center not found" });
    }
    const slot = center.slots.find(
      (s) => s.date.getTime() === new Date(date).getTime()
    );
    if (!slot || slot.availableSlots <= 0) {
      return res
        .status(400)
        .json({ message: "No available slots for the selected date" });
    }
    slot.availableSlots -= 1;
    await center.save();
    res.status(200).json({ message: "Slot booked successfully" });
  } catch (error) {
    console.error("Error applying for vaccination slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
