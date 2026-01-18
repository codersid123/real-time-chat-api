const express = require("express");
const router = express.Router();
const { getChatHistory } = require("../controllers/messageController");
const auth = require("../middleware/auth");

// GET chat history with another user
router.get("/:userId", auth, getChatHistory);

module.exports = router;
