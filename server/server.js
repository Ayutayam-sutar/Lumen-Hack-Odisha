// Inside server/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

// --- Middleware (THE ONLY SECTION WE ARE CHANGING) ---

// This is the list of websites your server will trust.
const allowedOrigins = [
    'http://localhost:5173', // For local development
    'https://lumen-hackodisha-juggernaut.netlify.app' // Your live Netlify URL
];

// This is a simpler, more reliable way to configure CORS.
// It will correctly handle all requests from the websites in the list above.
app.use(cors({ origin: allowedOrigins }));

app.use(express.json()); // Allow the server to accept JSON in the body of requests


// --- API Routes (Your team's work is unchanged) ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/ai', require('./routes/aiRoutes.js'));
app.use('/api/wolfram', require('./routes/wolframRoutes.js'));
app.use('/api/decks', require('./routes/deckRoutes.js'));

// --- Database Connection (Your team's work is unchanged) ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection to MongoDB failed!', error.message);
    });

// --- Basic Test Route (Your team's work is unchanged) ---
app.get('/', (req, res) => {
    res.send('Welcome to the NexusLearn API!');
});

