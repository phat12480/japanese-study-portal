const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    correct: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
