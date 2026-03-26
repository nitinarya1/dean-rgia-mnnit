const express = require("express");
const router = express.Router();
const Souvenir = require("../models/Souvenir");
const auth = require("../middleware/auth");

// GET /api/souvenirs — public
router.get("/", async (req, res) => {
  try {
    const souvenirs = await Souvenir.find().sort({ year: -1 });
    res.json(souvenirs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/souvenirs/:id
router.get("/:id", async (req, res) => {
  try {
    const souvenir = await Souvenir.findById(req.params.id);
    if (!souvenir) return res.status(404).json({ message: "Not found" });
    res.json(souvenir);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/souvenirs — admin only
router.post("/", auth, async (req, res) => {
  try {
    const souvenir = new Souvenir(req.body);
    await souvenir.save();
    res.status(201).json(souvenir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/souvenirs/:id — admin only
router.put("/:id", auth, async (req, res) => {
  try {
    const souvenir = await Souvenir.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!souvenir) return res.status(404).json({ message: "Not found" });
    res.json(souvenir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/souvenirs/:id — admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const souvenir = await Souvenir.findByIdAndDelete(req.params.id);
    if (!souvenir) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
