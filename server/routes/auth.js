const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");

// GET /api/auth/ping
router.get("/ping", (req, res) => {
  res.json({ status: "alive", version: "3.0.0" });
});

// POST /api/auth/login (rate limited in index.js)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const trimmedUsername = username.trim();
    const admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${trimmedUsername}$`, "i") },
    });

    if (!admin) {
      // Generic message: don't reveal whether user exists or not
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Short-lived token (2 hours)
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/auth/verify
router.get("/verify", auth, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

module.exports = router;
