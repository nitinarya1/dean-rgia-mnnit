const express = require("express");
const router = express.Router();
const Slideshow = require("../models/Slideshow");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

router.get("/", async (req, res) => {
  try {
    const items = await Slideshow.find({ isActive: true }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const item = await Slideshow.create(req.body);
    await log("CREATE", "Slideshow", `Added slide: "${item.caption || 'untitled'}"`, req, item._id);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Slideshow.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found" });
    await log("UPDATE", "Slideshow", `Updated slide: "${item.caption || 'untitled'}"`, req, item._id);
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Slideshow.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    await log("DELETE", "Slideshow", `Deleted slide ID: ${req.params.id}`, req, req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
