require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const socketHandler = require("./sockets/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});
socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
