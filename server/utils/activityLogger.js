// Inside server/utils/activityLogger.js
const User = require('../models/user');

const logActivity = async (userId, text, xpGained = 0) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            const activity = { text, xpGained };
            // Add the new activity to the beginning of the array
            user.activityFeed.unshift(activity);

            // Keep the feed from getting too long (e.g., max 50 items)
            if (user.activityFeed.length > 50) {
                user.activityFeed.pop();
            }

            await user.save();
        }
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

module.exports = { logActivity };