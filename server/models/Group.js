// Inside server/models/Group.js

const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a group name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
    },
    maxMembers: {
        type: Number,
        default: 10,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This creates a relationship to the User model
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // An array of users who are members
    }],
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;