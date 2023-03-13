const mongoose = require('mongoose');

const quiz = mongoose.Schema({
    quiz_id: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    questions_list: [{
        question: String,
        questionId: String,
        options: [],
        multiSelect: {
            type: Boolean,
            default: false
        }
    }],
    answers: {
        type: Object
    },
    isPublished: {
        type: Boolean,
        default: false
    }
    }, {timestamps: true}
)

module.exports = mongoose.model('Quiz', quiz);