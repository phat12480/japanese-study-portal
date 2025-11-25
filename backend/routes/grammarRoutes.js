const express = require("express");
const router = express.Router();
const {
  getAllGrammar,
  addGrammar,
} = require("../controllers/grammarController");

router.get("/", getAllGrammar);
router.post("/", addGrammar);

module.exports = router;
