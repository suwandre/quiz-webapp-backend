const mongoose = require('mongoose');

const QuizDataSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: new mongoose.Types.ObjectId()
        },
        _created_at: Date,
        _updated_at: Date,
        _wperm: Array,
        _rperm: Array,
        _acl: Object,
        questionId: Number,
        question: String,
        answers: Array,
        correctAnswer: String,
        minimumPoints: Number,
        maximumPoints: Number,
        duration: Number
    },
    {
        versionKey: false
    }
)

module.exports = {
    QuizDataSchema
}