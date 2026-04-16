const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const xss = require("xss");

// POST /api/contacts — public (form submission)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (name.length > 200 || subject.length > 500 || message.length > 5000) {
      return res.status(400).json({ message: "Input too long." });
    }

    // XSS Sanitization: strip any malicious HTML/scripts before saving
    const contact = new Contact({
      name: xss(name.trim()),
      email: xss(email.trim().toLowerCase()),
      subject: xss(subject.trim()),
      message: xss(message.trim()),
    });

    await contact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/contacts — admin only
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/contacts/:id — admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
