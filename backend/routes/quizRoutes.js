const express = require("express");
const router = express.Router();
const { getAllQuiz, addQuiz } = require("../controllers/quizController");

router.get("/", getAllQuiz);
router.post("/", addQuiz);

module.exports = router;
