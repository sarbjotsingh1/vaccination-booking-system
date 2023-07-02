// /* eslint-disable no-undef */
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("./routes/auth");
// const vaccinationCenterRoutes = require("./routes/vaccinationCenter.js");
// const vaccinationApplicationsRouter = require("./routes/vaccinationApplication");
// const dbConnect = require("./config/dbConnect");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());
// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// dbConnect();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with the origin of your frontend application
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies)

//   next();
// });

// app.use("/auth", authRoutes);
// app.use("/vaccination-center", vaccinationCenterRoutes);
// app.use("/vaccination-applications", vaccinationApplicationsRouter);

const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get =
  ("/",
  (req, res) => {
    res.send("hello");
  });
