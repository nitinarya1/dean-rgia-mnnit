const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

/**
 * AutoSeed: Only creates admin if none exists.
 * Does NOT wipe existing admins on every server restart.
 */
const runAutoSeed = async () => {
  try {
    const existingCount = await Admin.countDocuments();
    if (existingCount === 0) {
      // Use env var password if set, else a strong default
      const password = process.env.ADMIN_PASSWORD || "drgia@MNNIT2024!";
      const hashedPassword = await bcrypt.hash(password, 12);
      await Admin.create({ username: "Admin", password: hashedPassword });
      console.log("✅ Admin user seeded (first-time setup)");
    } else {
      console.log(`✅ Admin accounts found (${existingCount}), skipping seed.`);
    }
  } catch (err) {
    console.error("AutoSeed error:", err.message);
  }
};

module.exports = runAutoSeed;
