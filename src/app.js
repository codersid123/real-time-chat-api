const express = require("express");

const app = express();

app.use(express.json());
//REST API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("api/messages", require("./routes/messageRoutes"));

module.exports = app;
