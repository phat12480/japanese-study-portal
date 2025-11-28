const Vocabulary = require("../models/Vocabulary");

// GET ALL
exports.getAllVocabs = async (req, res) => {
  try {
    const data = await Vocabulary.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error loading vocabulary" });
  }
};

// ADD NEW
exports.addVocab = async (req, res) => {
  try {
    const vocab = await Vocabulary.create(req.body);
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ msg: "Error adding vocabulary" });
  }
};

// UPDATE
exports.updateVocab = async (req, res) => {
  try {
    const vocab = await Vocabulary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(vocab);
  } catch (err) {
    res.status(500).json({ msg: "Error updating vocabulary" });
  }
};

// DELETE
exports.deleteVocab = async (req, res) => {
  try {
    await Vocabulary.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting vocabulary" });
  }
};
