const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const auth = require("../middleware/auth");
const log = require("../middleware/logActivity");

router.get("/", async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const member = new Team(req.body);
    await member.save();
    await log("CREATE", "Team", `Added member: "${member.name}"`, req, member._id);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ message: "Not found" });
    await log("UPDATE", "Team", `Updated member: "${member.name}"`, req, member._id);
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });
    await log("DELETE", "Team", `Deleted member: "${member.name}"`, req, req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
