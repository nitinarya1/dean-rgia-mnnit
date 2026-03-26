const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// One-time setup endpoint to seed admin user
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
app.post("/api/setup", async (req, res) => {
  try {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("nitinarya8917813996", 10);
    await Admin.create({ username: "aryar0779", password: hashedPassword });
    res.json({ message: "Admin user created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/mous", require("./routes/mous"));
app.use("/api/team", require("./routes/team"));
app.use("/api/souvenirs", require("./routes/souvenirs"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/deans", require("./routes/deans"));
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/slideshow", require("./routes/slideshow"));

const autoSeed = require("./autoSeed");

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    
    // Auto-seed admin user if missing
    await autoSeed();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
