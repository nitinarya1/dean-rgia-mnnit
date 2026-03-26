const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

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

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
