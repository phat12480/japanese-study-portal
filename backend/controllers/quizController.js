const Quiz = require("../models/Quiz");

exports.getRandomQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.aggregate([{ $sample: { size: 10 } }]);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching quiz" });
  }
};

exports.addQuiz = async (req, res) => {
  try {
    const created = await Quiz.create(req.body);
    res.json(created);
  } catch (err) {
    res.status(500).json({ msg: "Error adding quiz" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting quiz" });
  }
};
