const Vocabulary = require("../models/Vocabulary");

exports.getAllVocabs = async (req, res) => {
  try {
    const data = await Vocabulary.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error loading vocabulary" });
  }
};

exports.addVocab = async (req, res) => {
  try {
    const vocab = await Vocabulary.create(req.body);
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ msg: "Error adding vocabulary" });
  }
};
