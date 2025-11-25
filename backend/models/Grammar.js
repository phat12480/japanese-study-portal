const mongoose = require("mongoose");

const grammarSchema = new mongoose.Schema(
  {
    structure: { type: String, required: true },
    meaning: { type: String, required: true },
    example: { type: String, required: true },
    level: { type: String, default: "N3" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grammar", grammarSchema);
