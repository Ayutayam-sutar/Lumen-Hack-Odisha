// Inside the new server/routes/wolframRoutes.js file

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/authMiddleware');

// We are simplifying the route from '/topic-summary' to just '/summary'
router.post('/summary', protect, async (req, res) => {
    const { topic } = req.body;
    const appid = process.env.WOLFRAM_APP_ID;

    if (!topic) {
        return res.status(400).json({ message: 'Topic is required' });
    }

    const wolframURL = `https://api.wolframalpha.com/v1/short?appid=${appid}&i=${encodeURIComponent(topic)}`;

    try {
        const response = await axios.get(wolframURL);
        res.json({ summary: response.data });
    } catch (error) {
        res.status(404).json({ summary: `Could not find a summary for "${topic}". Please try another topic.` });
    }
});

module.exports = router;