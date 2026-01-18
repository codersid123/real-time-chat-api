const jwt = require("jsonwebtoken");

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id; // attaches user id to socket object
      next(); // allows socket connection to continue
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  //Connects when a client successfully connects i.e. user is authenticated
  io.on("connection", (socket) => {
    console.log("User connected: ", socket.userId);

    //stores online user mapping
    onlineUsers.set(socket.userId, socket.id);

    //listens for a private message event
    socket.on("private_message", ({ to, message }) => {
      const receiverSocketId = onlineUsers.get(to); //finds receivers socked id
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private_message", {
          from: socket.userId,
          message,
          timestamp: new Date(),
        });
      }
    });

    //triggered when user disconnects
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.userId); //removes user from online map
      console.log("User disconnected: ", socket.userId);
    });
  });
};

module.exports = socketHandler;
