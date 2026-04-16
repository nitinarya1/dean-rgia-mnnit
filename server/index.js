const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────
// Helmet: sets secure HTTP headers (XSS, clickjack, MIME-sniff protection)
app.use(helmet({ contentSecurityPolicy: false }));

// CORS: only allow requests from your frontend domain
const allowedOrigins = [
  "http://localhost:3000",
  "https://dean-rgia-mnnit.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// Rate Limiting: prevent brute-force attacks on login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 attempts per window
  message: { message: "Too many login attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Core Middleware ───────────────────────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use("/api", apiLimiter);

// Cache public GET responses
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=120");
  }
  next();
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth/login", loginLimiter); // Apply strict rate limit to login
app.use("/api/auth", require("./routes/auth"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/mous", require("./routes/mous"));
app.use("/api/team", require("./routes/team"));
app.use("/api/souvenirs", require("./routes/souvenirs"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/deans", require("./routes/deans"));
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/slideshow", require("./routes/slideshow"));
app.use("/api/activity", require("./routes/activity"));

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ─── DB Connect & Start ───────────────────────────────────────────────────────
const autoSeed = require("./autoSeed");
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    await autoSeed();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
