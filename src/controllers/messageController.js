const Message = require("../models/Message");

exports.getChatHistory = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: userId },
      { sender: userId, receiver: req.user.id },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    limit,
    count: messages.length,
    messages,
  });
};

exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  //Only sender can delete
  if (message.sender.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  message.isDeleted = true;
  message.content = "This message was deleted";
  await message.save();

  res.json({ message: "Message deleted for everyone" });
};
