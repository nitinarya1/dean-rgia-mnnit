const mongoose = require("mongoose");

const souvenirSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, default: "" },
    pdfLink: { type: String, default: "#" },
    category: { type: String, enum: ["Convocation", "Alumni"], default: "Convocation" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Souvenir", souvenirSchema);
