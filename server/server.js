// Inside server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the body of requests

app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/groups', require('./routes/groupRoutes')); 
app.use('/api/ai', require('./routes/aiRoutes.js'));
app.use('/api/wolfram', require('./routes/wolframRoutes.js'));
app.use('/api/decks', require('./routes/deckRoutes.js'));

if (process.env.NODE_ENV === 'production') {
    // Set the static folder from the frontend build
    app.use(express.static(path.join(__dirname, '../dist')));

    // For any route that is not an API route, send the index.html file
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
    });
}

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
        // Once connected, start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed!', error.message);
    });

// --- Basic Test Route ---
app.get('/', (req, res) => {
    res.send('Welcome to the NexusLearn API!');
});