const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");
const auth = require("../middleware/auth");

// GET /api/activity — admin only — return latest 100 logs
router.get("/", auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/activity — admin only — clear all logs
router.delete("/", auth, async (req, res) => {
  try {
    await ActivityLog.deleteMany({});
    res.json({ message: "Activity logs cleared." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
