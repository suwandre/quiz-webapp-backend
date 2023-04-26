require('dotenv').config();

const mongoose = require('mongoose');
const { QuizDataSchema } = require('../schema/QuizData');
const { quizSample } = require('../utils/quizSample');
const { generateObjectId } = require('../utils/cryptoUtils');
const { permissions } = require('../utils/dbPerms');
const mongoURI = process.env.MONGODB_URI;

// const uploadQuiz = async () => {
//     try {
//         mongoose.connect(mongoURI);
//         const QuizData = mongoose.model('QuizData', QuizDataSchema, 'RHQuizData');

//         const getQuizSample = quizSample;
//         for (let i = 0; i < getQuizSample.length; i++) {
//             const sample = getQuizSample[i];

//             const { _wperm, _rperm, _acl } = permissions(false, false);
//             const NewQuizData = new QuizData(
//                 {
//                     _id: generateObjectId(),
//                     _created_at: new Date().getTime(),
//                     _updated_at: new Date().getTime(),
//                     _wperm,
//                     _rperm,
//                     _acl,
//                     questionId: sample.questionId,
//                     question: sample.question,
//                     answers: sample.answers,
//                     correctAnswer: sample.correctAnswer,
//                     minimumPoints: sample.minimumPoints,
//                     maximumPoints: sample.maximumPoints,
//                     duration: sample.duration
//                 }
//             )

//             await NewQuizData.save();
//             console.log(`QuizData ${i} saved!`);
//         }

        
//         console.log('done');
//     } catch (err) {
//         console.log(err);
//     }
// }

// uploadQuiz();