const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

// GET active announcements (public)
router.get("/", async (req, res) => {
  try {
    const items = await Announcement.find({ isActive: true }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all announcements (admin)
router.get("/all", auth, async (req, res) => {
  try {
    const items = await Announcement.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create announcement (admin)
router.post("/", auth, async (req, res) => {
  try {
    const item = await Announcement.create(req.body);
    await log("CREATE", "Announcement", `Created: "${item.title}"`, req, item._id);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update announcement (admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    await log("UPDATE", "Announcement", `Updated: "${item.title}"`, req, item._id);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE announcement (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Announcement.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await log("DELETE", "Announcement", `Deleted: "${item.title}"`, req, req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
