const CustomAPIError = require('../errors/custom-error');
const Quiz = require('../models/quiz');
const HashMap = require('hashmap');

//Getting all quizzes
const getAllQuiz = async(req, res) => {
    try{
        const quizzes = await Quiz.find({}, {"title": 1, "quiz_id": 1});
        if(!quizzes){
            throw new CustomAPIError(500, "Something went wrong while trying to fetch quizzes", 500);
        }
        console.log(quizzes);
        return res.status(200).send(quizzes);
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
//Get Single quiz details
const getQuiz = async(req, res) => {
    try{
        const quizId = req.params.quizId;
        const quiz = await Quiz.findOne({quiz_id: quizId}, {"answers": 0, "user_id" : 0});
        return res.status(200).send(quiz);
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
//Attempting a quiz
const answerQuiz = async(req, res) =>{
    try {
        const quizId = req.params.quizId;
        if(!quizContainsID(quizId)){
            throw new CustomAPIError("Quiz with this id doesn't even exist");
        }
        const orgQuiz = await Quiz.findOne({quiz_id: quizId});
        answers_list = req.body.answers;
        console.log(answers_list);
        let myHashMap = new HashMap();
        // console.log("type = " + typeof(orgQuiz.answers));
        orgQuiz.answers.forEach(element => {
            myHashMap.set(element.questionId, element.answer);
        }); 
        // console.log("hash value = " + myHashMap.get('102'));
        let cnt = 0;
        for(let idx in answers_list){
            console.log("idx = " + typeof(answers_list[idx].answer));
            if(typeof(answers_list[idx].answer) == "string" && typeof(myHashMap.get(answers_list[idx].questionId)) == "string"){
                if(answers_list[idx].answer == myHashMap.get(answers_list[idx].questionId)){
                    cnt++;
                }
            }
            else if(typeof(answers_list[idx].answer) == "object" && typeof(myHashMap.get(answers_list[idx].questionId)) == "object" && answers_list[idx].answer.length == myHashMap.get(answers_list[idx].questionId).length){
                console.log("Object length = " + answers_list[idx].answer.length);
                let temp = 0;
                 for(let i in answers_list[idx].answer){
                    const ans = answers_list[idx].answer[i];
                    for(let j in myHashMap.get(answers_list[idx].questionId)){
                        if(ans == myHashMap.get(answers_list[idx].questionId)[j]){
                            temp++;
                            break;
                        }
                    }
                 }
                 if(temp == myHashMap.get(answers_list[idx].questionId).length){
                    cnt++;
                 }
            }
            
        }
        // console.log("Report is" + cnt);
        return res.status(200).send({
            message: "Congratulations on finishing the test",
            score: cnt,
            total: orgQuiz.answers.length
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).send({
            internalCode: error.errorCode,
            message: error.message,
        })
    }
}
//Check if given quizID is already present or not!
const quizContainsID = async(quiz_id) =>{
    const quiz = await Quiz.findOne({quiz_id});
    // console.log("quiz = " + quiz);
    if(!!quiz){
        console.log("true");
        return quiz;
    }
    console.log("false");
    return false;
}

module.exports = {answerQuiz, getAllQuiz, getQuiz};