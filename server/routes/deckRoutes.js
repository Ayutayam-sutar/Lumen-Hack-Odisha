// Inside server/routes/deckRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Deck = require('../models/Deck');

// @route   POST /api/decks
// @desc    Create a new flashcard deck
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        // Get deck data from the request body
        const { title, description, subject, cards } = req.body;

        const newDeck = new Deck({
            title,
            description,
            subject: subject || "General", // Use a default subject if not provided
            cards,
            createdBy: req.user.id, // Get user from protect middleware
        });

        const savedDeck = await newDeck.save();
        res.status(201).json(savedDeck);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/decks
// @desc    Get all flashcard decks for the logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        // Find all decks created by the current user
        const decks = await Deck.find({ createdBy: req.user.id })
            .populate('createdBy', 'name')
            .sort({ createdAt: -1 });

        res.json(decks);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET /api/decks/:id
// @desc    Get a single flashcard deck by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);

        if (!deck) {
            return res.status(404).json({ msg: 'Deck not found' });
        }

        // --- AUTHORIZATION CHECK ---
        // Ensure the user requesting the deck is the one who created it
        if (deck.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(deck);

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Deck not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/decks/:deckId/cards/:cardId/review
// @desc    Update a card's SRS data based on a review
// @access  Private
router.put('/:deckId/cards/:cardId/review', protect, async (req, res) => {
    const { confidence } = req.body; // 'again', 'hard', 'good', 'easy'

    try {
        const deck = await Deck.findById(req.params.deckId);
        if (!deck) return res.status(404).json({ msg: 'Deck not found' });
        if (deck.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

        const card = deck.cards.id(req.params.cardId);
        if (!card) return res.status(404).json({ msg: 'Card not found in this deck' });

        // --- Simple SRS Algorithm ---
        let newSrsLevel = card.srsLevel;
        const now = new Date();
        let nextReviewDate = new Date(now);

        switch (confidence) {
            case 'again':
                newSrsLevel = 0; // Reset progress
                nextReviewDate.setMinutes(now.getMinutes() + 5); // Review again in 5 mins
                break;
            case 'hard':
                newSrsLevel = Math.max(0, newSrsLevel - 1); // Go back one level
                nextReviewDate.setHours(now.getHours() + 12); // Review in 12 hours
                break;
            case 'good':
                newSrsLevel += 1; // Level up
                nextReviewDate.setDate(now.getDate() + (2 * newSrsLevel)); // Review in 2 days * level
                break;
            case 'easy':
                newSrsLevel += 2; // Level up by 2
                nextReviewDate.setDate(now.getDate() + (4 * newSrsLevel)); // Review in 4 days * level
                break;
            default:
                return res.status(400).json({ msg: 'Invalid confidence level' });
        }

        card.srsLevel = newSrsLevel;
        card.nextReviewDate = nextReviewDate;

        await deck.save();
        res.json(card);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;