const express = require("express");
const router = express.Router();
const { getChatHistory } = require("../controllers/messageController");
const authMiddleware = require("../middleware/auth");
const { deleteMessage } = require("../controllers/messageController");

// GET chat history with another user
router.get("/:userId", authMiddleware, getChatHistory);

router.delete("/:messageId", authMiddleware, deleteMessage);
module.exports = router;
