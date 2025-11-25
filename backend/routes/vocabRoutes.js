const express = require("express");
const router = express.Router();
const { getAllVocabs, addVocab } = require("../controllers/vocabController");

router.get("/", getAllVocabs);
router.post("/", addVocab);

module.exports = router;
