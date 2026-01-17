const users = new Map();
const Message = require("../models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("register_user", (userId) => {
      users.set(userId, socket.id);
    });

    socket.on("private_message", async ({ senderId, receiverId, message }) => {
      const savedMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        content: message,
        timestamp: new Date(),
      });

      const receiverSocket = users.get(receiverId);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message ", savedMessage);
      }
    });

    socket.on("disconnect", () => {
      users.forEach((value, key) => {
        if (value === socket.id) {
          users.delete(key);
        }
      });
    });
  });
};
module.exports = socketHandler;
