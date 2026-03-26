const express = require("express");
const router = express.Router();
const Mou = require("../models/Mou");
const auth = require("../middleware/auth");

// GET /api/mous — public
router.get("/", async (req, res) => {
  try {
    const mous = await Mou.find().sort({ date: -1 });
    res.json(mous);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/mous/:id
router.get("/:id", async (req, res) => {
  try {
    const mou = await Mou.findById(req.params.id);
    if (!mou) return res.status(404).json({ message: "Not found" });
    res.json(mou);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/mous — admin only
router.post("/", auth, async (req, res) => {
  try {
    const mou = new Mou(req.body);
    await mou.save();
    res.status(201).json(mou);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/mous/:id — admin only
router.put("/:id", auth, async (req, res) => {
  try {
    const mou = await Mou.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mou) return res.status(404).json({ message: "Not found" });
    res.json(mou);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/mous/:id — admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const mou = await Mou.findByIdAndDelete(req.params.id);
    if (!mou) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
