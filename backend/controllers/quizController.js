const Quiz = require("../models/Quiz");

exports.getAllQuiz = async (req, res) => {
  try {
    const data = await Quiz.find();
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Error loading quizzes" });
  }
};

exports.addQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch {
    res.status(500).json({ msg: "Error adding quiz" });
  }
};
