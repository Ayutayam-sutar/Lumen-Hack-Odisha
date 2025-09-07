// Inside server/routes/groupRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const Group = require('../models/Group');
const User = require('../models/user');

// @route   POST /api/groups
// @desc    Create a new study group
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { name, description, subject, maxMembers } = req.body;
        
        // Get the logged-in user's ID from the 'protect' middleware
        const createdBy = req.user.id;

        // Create the new group
        const group = new Group({
            name,
            description,
            subject,
            maxMembers,
            createdBy,
            members: [createdBy] // The creator is the first member
        });

        const newGroup = await group.save();

        res.status(201).json(newGroup);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/groups
// @desc    Get all study groups
// @access  Public (for now, anyone can see the list of groups)
router.get('/', async (req, res) => {
    try {
        // Find all groups in the database
        const groups = await Group.find()
            // The .populate() method is very powerful.
            // It looks at the 'createdBy' field, sees it references a 'User' ID,
            // and pulls in the specified fields from that user's document.
            .populate('createdBy', 'name')
            .sort({ createdAt: -1 }); // Sort by newest first

        res.json(groups);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router; // This should be at the end of the file