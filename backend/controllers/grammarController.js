const Grammar = require("../models/Grammar");

// GET ALL
exports.getAllGrammar = async (req, res) => {
  try {
    const data = await Grammar.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error loading grammar" });
  }
};

// CREATE
exports.addGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.create(req.body);
    res.json(grammar);
  } catch (err) {
    res.status(500).json({ msg: "Error adding grammar" });
  }
};

// UPDATE
exports.updateGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(grammar);
  } catch (err) {
    res.status(500).json({ msg: "Error updating grammar" });
  }
};

// DELETE
exports.deleteGrammar = async (req, res) => {
  try {
    await Grammar.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting grammar" });
  }
};
