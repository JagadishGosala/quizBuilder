const express = require('express');

const {answerQuiz, getAllQuiz, getQuiz} = require('../controllers/quiz');
const router = express.Router();

router.post('/:quizId', answerQuiz);
router.get('/:quizId', getQuiz);
router.get('/', getAllQuiz);

module.exports = router;