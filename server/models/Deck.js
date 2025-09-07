// Inside server/models/Deck.js

const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
    },
    // --- NEW FIELDS FOR SRS ---
    srsLevel: {
        type: Number,
        default: 0, // A new card starts at level 0
    },
    nextReviewDate: {
        type: Date,
        default: Date.now, // A new card is ready for review immediately
    },
});

const DeckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title for the deck'],
        trim: true,
    },
    description: {
        type: String,
    },
    subject: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cards: [CardSchema]
}, {
    timestamps: true,
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;