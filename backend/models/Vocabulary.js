const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema(
  {
    kanji: { type: String, required: true },
    hiragana: { type: String, required: true },
    romaji: { type: String, required: true },
    meaning: { type: String, required: true },
    level: { type: String, default: "N5" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vocabulary", vocabularySchema);
