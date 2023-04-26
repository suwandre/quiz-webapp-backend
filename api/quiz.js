require('dotenv').config();

const mongoose = require('mongoose');
const { QuizDataSchema } = require('../schema/QuizData');
const { generateObjectId } = require('../utils/cryptoUtils');
const { permissions } = require('../utils/dbPerms');
const { QuizUserSchema } = require('../schema/QuizUserData');
const mongoURI = process.env.MONGODB_URI;

const randomizeQuizQuestions = async () => {
    try {
        mongoose.connect(mongoURI);
        const QuizData = mongoose.model('QuizData', QuizDataSchema, 'RHQuizData');
        const quizData = await QuizData.find({});

        // get 5 questions randomly from `quizData`
        const randomQuizData = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * quizData.length);
            randomQuizData.push(quizData[randomIndex]);
        }

        return randomQuizData;
    } catch (err) {
        console.log(err);
    }
}

const uploadUserScore = async (address, score) => {
    try {
        mongoose.connect(mongoURI)
        const QuizUserData = mongoose.model('QuizUserData', QuizUserSchema, 'RHQuizUserData');

        // check if user exists
        const userQuery = await QuizUserData.findOne({ address });
        // if not found, we create a new user instance.
        if (!userQuery) {
            const { _wperm, _rperm, _acl } = permissions(false, false);
            const NewUser = new QuizUserData(
                {
                    _id: generateObjectId(),
                    _created_at: new Date().getTime(),
                    _updated_at: new Date().getTime(),
                    _wperm,
                    _rperm,
                    _acl,
                    address,
                    highestPoints: score,
                    lowestPoints: score,
                    quizzesDoneAmount: 1,
                    averagePoints: score,
                }
            )

            await NewUser.save();

            console.log('New user created!');
        // if the user exists, we update the user instance.
        } else {
            const { highestPoints, lowestPoints, quizzesDoneAmount, averagePoints } = userQuery;
            const newHighestPoints = score > highestPoints ? score : highestPoints;
            const newLowestPoints = score < lowestPoints ? score : lowestPoints;
            const newQuizzesDoneAmount = quizzesDoneAmount + 1;
            const newAveragePoints = Math.round((averagePoints + score) / newQuizzesDoneAmount);

            await QuizUserData.updateOne(
                { address },
                {
                    highestPoints: newHighestPoints,
                    lowestPoints: newLowestPoints,
                    quizzesDoneAmount: newQuizzesDoneAmount,
                    averagePoints: newAveragePoints,
                }
            );

            console.log('User updated!');
        }
    } catch (err) {
        console.log(err);
    }
}

const getUserStats = async (address) => {
    try {
        mongoose.connect(mongoURI)
        const QuizUserData = mongoose.model('QuizUserData', QuizUserSchema, 'RHQuizUserData');

        // check if user exists
        const userQuery = await QuizUserData.findOne({ address });

        if (!userQuery) {
            return { highestPoints: 0, lowestPoints: 0, quizzesDoneAmount: 0, averagePoints: 0 }
        } else {
            const { highestPoints, lowestPoints, quizzesDoneAmount, averagePoints } = userQuery;
            return { highestPoints, lowestPoints, quizzesDoneAmount, averagePoints };
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    randomizeQuizQuestions,
    uploadUserScore,
    getUserStats,
}