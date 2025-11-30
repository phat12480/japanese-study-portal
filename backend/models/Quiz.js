const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, required: true },
  optionD: { type: String, required: true },
  correct: { type: String, required: true }, // "A" | "B" | "C" | "D"
  level: { type: String, default: "N5" },
});

module.exports = mongoose.model("Quiz", QuizSchema);
