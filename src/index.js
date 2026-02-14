const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const connectDB = require("./config/db");
const { server, io } = require("./server");
const socketHandler = require("./sockets/socket");

console.log("MONGO_URI:", process.env.MONGO_URI);

(async () => {
  await connectDB();
  socketHandler(io);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
