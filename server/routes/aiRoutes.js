// Inside server/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

// Initialize the AI client securely on the backend
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @route   POST /api/ai/generate-group-details
// @desc    Generate study group details using AI
// @access  Private
router.post('/generate-group-details', protect, async (req, res) => {
    const { subject } = req.body;

    if (!subject) {
        return res.status(400).json({ message: 'Subject is required' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Generate a creative name, a short, engaging description (around 20-30 words), and 3 relevant, single-word tags for a study group focused on '${subject}'. Your response must be a valid JSON object with the keys "name", "description", and "tags".`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean the response to ensure it's valid JSON
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const details = JSON.parse(cleanedJson);

        res.json(details);

    } catch (error) {
        console.error('AI generation error:', error);
        res.status(500).json({ message: 'Failed to generate details from AI service.' });
    }
});

module.exports = router;