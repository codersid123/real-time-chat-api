require("dotenv").config();

const { server, io } = require("./server");
const socketHandler = require("./sockets/socket");

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
