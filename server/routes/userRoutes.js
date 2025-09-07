// Inside server/routes/userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST /api/users/register
// @desc    THIS IS THE REGISTRATION LOGIC
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            // This is the ONLY 400 error this route should send
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. If user doesn't exist, create a new one
        user = new User({
            name,
            email,
            password,
        });

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/login
// @desc    THIS IS THE LOGIN LOGIC
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 3. Create and return a JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/users/me
// @desc    Get current logged-in user's data
// @access  Private
router.get('/me', protect, async (req, res) => {
    // Because the 'protect' middleware ran successfully,
    // we have the user's data attached to the request object in 'req.user'.
    res.status(200).json(req.user);
});


module.exports = router;