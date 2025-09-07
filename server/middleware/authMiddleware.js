// Inside server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an Authorization header and it starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get the token from the header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using our JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Find the user by the ID from the token's payload
            //    and attach the user object to the request (without the password)
            req.user = await User.findById(decoded.user.id).select('-password');

            // 4. Move on to the next step (our actual route logic)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };