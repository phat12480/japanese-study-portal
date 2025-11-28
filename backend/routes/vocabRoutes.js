const express = require("express");
const router = express.Router();

const {
  getAllVocabs,
  addVocab,
  updateVocab,
  deleteVocab,
} = require("../controllers/vocabController");

router.get("/", getAllVocabs);
router.post("/", addVocab);
router.put("/:id", updateVocab);
router.delete("/:id", deleteVocab);

module.exports = router;
