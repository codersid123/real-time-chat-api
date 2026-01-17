const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    console.log("Loaded MONGO_URI: ", process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection failed: ", error.message);
  }
};
module.exports = connectDB;
