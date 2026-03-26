const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

const runAutoSeed = async () => {
  try {
    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Admin.create({ username: "admin", password: hashedPassword });
      console.log("✅ Auto-created default admin user (admin / admin123)");
    }
  } catch (err) {
    console.error("AutoSeed error:", err.message);
  }
};

module.exports = runAutoSeed;
