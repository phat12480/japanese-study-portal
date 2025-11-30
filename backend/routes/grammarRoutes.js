const express = require("express");
const router = express.Router();

const {
  getAllGrammar,
  addGrammar,
  updateGrammar,
  deleteGrammar,
} = require("../controllers/grammarController");

router.get("/", getAllGrammar);
router.post("/", addGrammar);
router.put("/:id", updateGrammar);
router.delete("/:id", deleteGrammar);

module.exports = router;
