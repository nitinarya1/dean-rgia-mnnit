const mongoose = require("mongoose");

const deanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "Dean (R G & IA)" },
    department: { type: String, default: "" },
    tenure: { type: String, required: true },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    profileLink: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dean", deanSchema);
