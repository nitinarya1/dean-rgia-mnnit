const express = require("express");
const router = express.Router();
const Mou = require("../models/Mou");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

router.get("/", async (req, res) => {
  try {
    const mous = await Mou.find().sort({ date: -1 });
    res.json(mous);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mou = await Mou.findById(req.params.id);
    if (!mou) return res.status(404).json({ message: "Not found" });
    res.json(mou);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const mou = new Mou(req.body);
    await mou.save();
    await log("CREATE", "MoU", `Added MoU with: "${mou.institution}"`, req, mou._id);
    res.status(201).json(mou);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const mou = await Mou.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mou) return res.status(404).json({ message: "Not found" });
    await log("UPDATE", "MoU", `Updated MoU: "${mou.institution}"`, req, mou._id);
    res.json(mou);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const mou = await Mou.findByIdAndDelete(req.params.id);
    if (!mou) return res.status(404).json({ message: "Not found" });
    await log("DELETE", "MoU", `Deleted MoU: "${mou.institution}"`, req, req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
