const CustomAPIError = require('../errors/custom-error');
const Quiz = require('../models/quiz');

//Creating a new quiz
const createQuiz = async (req, res) => {
    try{
        const newQuizId = await randomString();
        const title = req.body.title;
        const user_id = req.user.user_id;
        console.log("title = " + title);
        console.log("user-id = " + user_id);
        const quiz = new Quiz({title: title,  quiz_id: newQuizId, user_id: user_id});
        const quizSave = await quiz.save();
        console.log(quiz);
        if(!!quizSave){
            res.status(201).send({
                message: "New Quiz Created",
                title: title,
                quizId: newQuizId
            });
        }
        else{
            throw new CustomAPIError(500, "Quiz creation unsuccessful", 500);
        }
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
//Get All Quizzes created by the user:
const getAllQuiz = async(req, res) => {
    try {
        const allquiz = await Quiz.find({user_id: req.user.user_id});
        return res.status(200).send(allquiz);
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}

//Editing the quiz
const editQuiz = async(req,res) =>{
    try {
        const quizId = req.params.quizId;
        if(!quizContainsID(quizId)){
            throw new CustomAPIError(404, "Quiz with this quiz id hasn't been created yet", 404);
        }
        const quiz = await Quiz.findOne({quiz_id: quizId});
        if(quiz.user_id != req.user.user_id){
            throw new CustomAPIError(300, "You are not the owner of this quiz", 401);
        }
        if(req.body.questions_list.length != req.body.answers.length){
            throw new CustomAPIError(402, "Input Error: You have not given answers to all the questions", 402);
        }
        if(quiz.isPublished){
            throw new CustomAPIError(402, "Quiz is already published. And hence you cannot edit", 402);
        }
        if(req.body.questions_list.length > 10){
            throw new CustomAPIError(401, "Only 10 questions are allowed per quiz. If you want more, please feel to create a different one!");
        }
        const isPublished = req.body.isPublished;
        const questions = req.body.questions_list;
        const answers = req.body.answers;
        const result = await Quiz.findOneAndUpdate({quiz_id: quizId}, {
            questions_list : questions,
            answers: answers,
            isPublished: isPublished
        }, {
            upsert: true,
        });
        if(result){
            return res.status(200).send({
                message: "Successfull edit",
                result
            });
        }
        else{
            throw new CustomAPIError(500, "Something went wrong while updating the quiz id", 500);
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
//Creating a random string of length 6
const randomString = async() => {
    completeStr = '1234567890abcdefghijklmnopqrstuvwxyz';
    ans = '';
    for(let i = 6; i > 0; i--){
        ans += completeStr[Math.floor(Math.random() * completeStr.length)];
    }
    if(! await quizContainsID(ans)){
        // console.log("random true");
        return ans;
    }
    else{
        // console.log("random true");
        return await randomString();
    }
}
//Check if given quizID is already present or not!
const quizContainsID = async(quiz_id) =>{
    const quiz = await Quiz.findOne({quiz_id});
    console.log("quiz = " + quiz);
    if(!!quiz){
        console.log("true");
        return true;
    }
    console.log("false");
    return false;
}

module.exports = {createQuiz, editQuiz, quizContainsID, getAllQuiz};