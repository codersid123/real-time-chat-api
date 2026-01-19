require("dotenv").config();

const connectDB = require("./config/db");
const { server, io } = require("./server");
const socketHandler = require("./sockets/socket");

(async () => {
  await connectDB();
  socketHandler(io);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
