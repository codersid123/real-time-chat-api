const Message = require("../models/Message");

exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
