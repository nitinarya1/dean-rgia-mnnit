const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");

const runAutoSeed = async () => {
  try {
    // Delete old default admin if it exists, then ensure the correct admin is present
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("nitinarya8917813996", 10);
    await Admin.create({ username: "aryar0779", password: hashedPassword });
    console.log("✅ Admin user seeded (aryar0779)");
  } catch (err) {
    console.error("AutoSeed error:", err.message);
  }
};

module.exports = runAutoSeed;
