require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//middleware
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//connect database
connectDB();

module.exports = app;
