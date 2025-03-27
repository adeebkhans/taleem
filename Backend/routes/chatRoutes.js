const express = require("express");
const { chatWithAI, getConversation } = require("../controllers/chatController.js");
const authMiddleware = require("../controllers/authMiddleware.js");

const router = express.Router();

// Chatbot API route
router.post("/", authMiddleware, chatWithAI);
router.get("/history", authMiddleware, getConversation);

module.exports = router; 