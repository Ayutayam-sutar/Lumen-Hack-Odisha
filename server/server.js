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

// --- Middleware ---
const allowedOrigins = [
    'http://localhost:5173', // For your local development
    // IMPORTANT: Make sure your real Netlify URL is here!
    'https://lumen-hackodisha-juggernaut.netlify.app/'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('This request is blocked by CORS policy.'));
        }
    }
};

app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing with specific options
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
        // Once connected, start the server
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
