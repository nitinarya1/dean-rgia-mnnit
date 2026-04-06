const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin.js');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    // 1. Check if ANY admins exist
    const allAdmins = await Admin.find({});
    console.log("All admins:", allAdmins);

    // 2. Test lookup
    const username = "Admin";
    const trimmedUsername = username.trim();
    const admin = await Admin.findOne({ username: { $regex: new RegExp(`^${trimmedUsername}$`, "i") } });
    console.log('Admin found using case-insensitive:', !!admin);

    if (admin) {
        const isMatch = await bcrypt.compare('drgia123', admin.password);
        console.log('Password match with drgia123:', isMatch);
    } else {
        console.log("No admin found matching regex.");
    }
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
