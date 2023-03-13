const express = require('express');

const { createQuiz, editQuiz, getAllQuiz } = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/', isAuth, createQuiz);
router.get('/quiz', getAllQuiz);
router.patch('/:quizId', isAuth, editQuiz);
// router.post('/:quizId', isAuth, editQuiz);
// router.post('/:quizId', isAuth, answerQuiz);

module.exports = router;