const express = require("express");
const { createReportAndChat, sendMessage, getChatHistory, getUserReports } = require("../controllers/chat.controller");
const { protect, upload } = require("../middleware/auth.middleware");
const router = express.Router();

// Create a new report and start chat
router.post("/create-report", protect, upload.single('file'), createReportAndChat);

// Send a message in chat
router.post("/send-message", protect, sendMessage);

// Get chat history for a specific report
router.get("/history/:reportId", protect, getChatHistory);

// Get all user's reports
router.get("/reports", protect, getUserReports);

module.exports = router;
