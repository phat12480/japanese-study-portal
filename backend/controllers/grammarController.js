const Grammar = require("../models/Grammar");

exports.getAllGrammar = async (req, res) => {
  try {
    const data = await Grammar.find();
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Error loading grammar" });
  }
};

exports.addGrammar = async (req, res) => {
  try {
    const grammar = await Grammar.create(req.body);
    res.json(grammar);
  } catch {
    res.status(500).json({ msg: "Error adding grammar" });
  }
};
