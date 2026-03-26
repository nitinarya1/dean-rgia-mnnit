const mongoose = require("mongoose");

const mouSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mou", mouSchema);
