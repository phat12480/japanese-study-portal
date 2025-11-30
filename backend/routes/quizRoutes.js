const express = require("express");
const router = express.Router();

const {
  getRandomQuiz,
  addQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

router.get("/random", getRandomQuiz);
router.post("/", addQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;
