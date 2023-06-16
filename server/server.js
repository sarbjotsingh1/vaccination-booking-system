/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const vaccinationCenterRoutes = require("./routes/vaccinationCenter.js");
const vaccinationApplicationsRouter = require("./routes/vaccinationApplication");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use("/auth", authRoutes);
app.use("/vaccination-center", vaccinationCenterRoutes);
app.use("/vaccination-applications", vaccinationApplicationsRouter);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sarb:yOiBhMEGZJnC8wen@covid.4f3ru88.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
