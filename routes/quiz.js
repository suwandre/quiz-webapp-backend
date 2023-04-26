const express = require('express');
const { randomizeQuizQuestions, getUserStats, uploadUserScore } = require('../api/quiz');
const router = express.Router();

router.get('/getUserStats/:address', async (req, res) => {
    try {
        const address = req.params.address;
        const userStats = await getUserStats(address);

        res.status(200).json(userStats);
    } catch (err) {
        res.status(err.code).json({ error: err.message })
    }
})

router.get('/randomizeQuestions', async (req, res) => {
    try {
        const randomQuestions = await randomizeQuizQuestions();

        res.status(200).json(randomQuestions);
    } catch (err) {
        res.status(err.code).json({ error: err.message })
    }
})

router.post('/uploadUserScore', async (req, res) => {
    const { address, score } = req.body;

    try {
        await uploadUserScore(address, score);
        res.status(200).json({ message: 'User score uploaded!' });
    } catch (err) {
        res.status(err.code).json({ error: err.message })
    }
})

module.exports = router;