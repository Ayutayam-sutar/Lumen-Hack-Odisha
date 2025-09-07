// Inside server/models/User.js

const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    text: { type: String, required: true },
    xpGained: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
}, { _id: false });

const StudySessionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    duration: { type: Number, required: true }
}, { _id: false });

const AchievementProgressSchema = new mongoose.Schema({
    achievementId: { // e.g., 'first_group_joined'
        type: String,
        required: true,
    },
    unlockedDate: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    xp: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    studyHistory: [StudySessionSchema],
    activityFeed: [ActivitySchema],
        achievements: [AchievementProgressSchema],


    // --- NEW FIELDS FOR MENTORS ---
    isMentor: {
        type: Boolean,
        default: false,
    },
    expertise: { // e.g., "Quantum Physics", "React"
        type: String,
    },
    mentorRating: {
        type: Number,
        default: 5.0,
    },
    mentorRate: { // Price per hour
        type: Number,
    }
    // --- END OF NEW FIELDS ---

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;