const mongoose = require('mongoose');

const QuizUserSchema = new mongoose.Schema(
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
        address: String,
        highestPoints: Number,
        lowestPoints: Number,
        quizzesDoneAmount: Number,
        averagePoints: Number,
    },
    {
        versionKey: false
    }
)

module.exports = {
    QuizUserSchema
}