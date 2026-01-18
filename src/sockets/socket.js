const jwt = require("jsonwebtoken");
const Message = require("../models/Message");

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.use((socket, next) => {
    //authentication layer
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

    //listens for a private message event (event handler)
    socket.on("private_message", async ({ to, message }) => {
      const newMessage = await Message.create({
        sender: socket.userId,
        receiver: to,
        content: message,
      });

      const receiverSocketId = onlineUsers.get(to);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("private_message", {
          from: socket.userId,
          message: newMessage.content,
          timestamp: newMessage.createdAt,
        });
      }
    });

    socket.on("message_seen", async (req, res) => {
      const message = await Message.findById(messageId);
      if (!message) return;

      message.seen = true;
      await message.save();

      const senderSocketId = onlineUsers.get(message.sender.toString());

      if (senderSocketId) {
        io.to(senderSocketId).emit("message_Seen", {
          messageId,
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
