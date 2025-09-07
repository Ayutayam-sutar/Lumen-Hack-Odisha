// Inside server/routes/groupRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const Group = require('../models/Group');
const User = require('../models/user');
const { logActivity } = require('../utils/activityLogger'); 
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


// Inside server/routes/groupRoutes.js

// ... your existing GET '/' route is above this ...


// @route   PUT /api/groups/:id/join
// @desc    Join a study group
// @access  Private
router.put('/:id/join', protect, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }
        if (group.members.length >= group.maxMembers) {
            return res.status(400).json({ msg: 'Group is already full' });
        }
        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ msg: 'You are already a member of this group' });
        }

        group.members.push(req.user.id);
        await group.save();

        // --- THIS IS THE NEW BRICK ---
        // Find the user who created the group and give them reputation points.
        // We'll give them 5 reputation points each time someone joins.
        await User.findByIdAndUpdate(group.createdBy, { $inc: { reputation: 5 } });
        // --- END OF NEW BRICK ---
        await logActivity(req.user.id, `Joined the '${group.name}' study group`, 25);
        const updatedGroup = await Group.findById(group._id)
            .populate('createdBy', 'name')
            .populate('members', 'name');

        res.json(updatedGroup);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/groups/:id/leave
// @desc    Leave a study group
// @access  Private
router.put('/:id/leave', protect, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        // Check if the user is the creator. For now, we prevent the creator from leaving.
        // A better feature later would be to transfer ownership or delete the group.
        if (group.createdBy.toString() === req.user.id) {
            return res.status(400).json({ msg: 'Creator cannot leave the group.' });
        }
        
        // Remove the user's ID from the members array using $pull
        group.members.pull(req.user.id);
        
        await group.save();
        
        // Populate the response with updated member and creator names
        const updatedGroup = await Group.findById(group._id)
            .populate('createdBy', 'name')
            .populate('members', 'name');

        res.json(updatedGroup);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/groups/:id
// @desc    Get a single study group by its ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            // Populate the creator's info
            .populate('createdBy', 'name') 
            // Populate the members' info
            .populate('members', 'name'); 

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        res.json(group);

    } catch (error) {
        // This handles cases where the ID is not a valid format
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Group not found' });
        }
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT /api/groups/:id
// @desc    Update a group's details
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        let group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        // --- AUTHORIZATION CHECK ---
        // Ensure the user updating the group is the one who created it
        if (group.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        // Get the fields to update from the request body
        const { name, subject, description } = req.body;

        // Update the fields if they were provided
        if (name) group.name = name;
        if (subject) group.subject = subject;
        if (description) group.description = description;

        await group.save();
        
        // Populate the response with the full, updated details
        const updatedGroup = await Group.findById(group._id)
            .populate('createdBy', 'name')
            .populate('members', 'name');

        res.json(updatedGroup);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE /api/groups/:id
// @desc    Delete a group
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }

        // --- AUTHORIZATION CHECK ---
        // Check if the logged-in user is the one who created the group
        if (group.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Group.deleteOne({ _id: req.params.id });

        res.json({ msg: 'Group removed successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// Inside server/routes/groupRoutes.js

// @route   PUT /api/groups/:id/join
// @desc    Join a study group
// @access  Private
router.put('/:id/join', protect, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
        }
        if (group.members.length >= group.maxMembers) {
            return res.status(400).json({ msg: 'Group is already full' });
        }
        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ msg: 'You are already a member of this group' });
        }

        group.members.push(req.user.id);
        await group.save();

        // --- THIS IS THE NEW BRICK ---
        // Find the user who created the group and give them reputation points.
        // We'll give them 5 reputation points each time someone joins.
        await User.findByIdAndUpdate(group.createdBy, { $inc: { reputation: 5 } });
        // --- END OF NEW BRICK ---
        
        const updatedGroup = await Group.findById(group._id)
            .populate('createdBy', 'name')
            .populate('members', 'name');

        res.json(updatedGroup);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; // This should be at the end of the file

