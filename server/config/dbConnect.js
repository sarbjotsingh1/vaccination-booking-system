const mongoose = require("mongoose");

const dbConnect = () => {
  try {
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
      });
  } catch (err) {
    console.log("Database Error");
  }
};

module.exports = dbConnect;
