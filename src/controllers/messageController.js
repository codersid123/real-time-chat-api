const Message = require("../models/Message");

exports.getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const otherUserId = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });
  res.json(messages);
};
