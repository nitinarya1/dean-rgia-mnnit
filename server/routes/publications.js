const express = require("express");
const router = express.Router();
const Publication = require("../models/Publication");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

// GET /api/publications — public
router.get("/", async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/publications/:id — public
router.get("/:id", async (req, res) => {
  try {
    const pub = await Publication.findById(req.params.id);
    if (!pub) return res.status(404).json({ message: "Not found" });
    res.json(pub);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/publications — admin only
router.post("/", auth, async (req, res) => {
  try {
    const pub = new Publication(req.body);
    await pub.save();
    await log("CREATE", "Publication", `Added: "${pub.title}"`, req, pub._id);
    res.status(201).json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/publications/:id — admin only
router.put("/:id", auth, async (req, res) => {
  try {
    const pub = await Publication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pub) return res.status(404).json({ message: "Not found" });
    await log("UPDATE", "Publication", `Updated: "${pub.title}"`, req, pub._id);
    res.json(pub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/publications/:id — admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const pub = await Publication.findByIdAndDelete(req.params.id);
    if (!pub) return res.status(404).json({ message: "Not found" });
    await log("DELETE", "Publication", `Deleted: "${pub.title}"`, req, req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
