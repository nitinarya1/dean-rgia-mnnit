const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

const runAutoSeed = async () => {
  try {
    // Delete old default admin if it exists, then ensure the correct admin is present
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("drgia123", 10);
    await Admin.create({ username: "Admin", password: hashedPassword });
    console.log("✅ Admin user seeded (Admin)");
  } catch (err) {
    console.error("AutoSeed error:", err.message);
  }
};

module.exports = runAutoSeed;
