// Inside server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Every email must be unique
    },
    password: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    reputation: {
        type: Number,
        default: 0,
    },
    currentStreak: {
        type: Number,
        default: 0,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', UserSchema);

module.exports = User;