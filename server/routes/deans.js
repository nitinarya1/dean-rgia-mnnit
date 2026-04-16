const express = require("express");
const router = express.Router();
const Dean = require("../models/Dean");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

// GET all deans (public)
router.get("/", async (req, res) => {
  try {
    const deans = await Dean.find().sort({ order: 1 });
    res.json(deans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single dean (public)
router.get("/:id", async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);
    if (!dean) return res.status(404).json({ message: "Dean not found" });
    res.json(dean);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new dean (admin)
router.post("/", auth, async (req, res) => {
  try {
    const dean = await Dean.create(req.body);
    await log("CREATE", "Dean", `Added Dean: "${dean.name}"`, req, dean._id);
    res.status(201).json(dean);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update dean (admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const dean = await Dean.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dean) return res.status(404).json({ message: "Dean not found" });
    await log("UPDATE", "Dean", `Updated Dean: "${dean.name}"`, req, dean._id);
    res.json(dean);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE dean (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const dean = await Dean.findByIdAndDelete(req.params.id);
    if (!dean) return res.status(404).json({ message: "Dean not found" });
    await log("DELETE", "Dean", `Deleted Dean: "${dean.name}"`, req, req.params.id);
    res.json({ message: "Dean deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
