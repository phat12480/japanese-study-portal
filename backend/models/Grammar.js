const mongoose = require("mongoose");

const GrammarSchema = new mongoose.Schema({
  structure: { type: String, required: true },
  meaning: { type: String, required: true },
  example: { type: String, required: true },
  level: { type: String, required: true },
});

module.exports = mongoose.model("Grammar", GrammarSchema);
